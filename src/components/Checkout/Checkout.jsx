import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';
import './Checkout.css';

// Carga la clave pública de Stripe (reemplaza con tu clave)
const stripePromise = loadStripe('pk_test_51Q4DuTLAufqZUSmlBzD0lF8qFKYCWTzlTknQa1miYLEMJh6bL2I0ThJGwP3Tus8FXKFKt0dSgetbyyM8ewvw1aI200bstyhs7D');

// Componente del formulario de pago
const CheckoutForm = ({ selectedProducts, total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    try {
      // Crear el método de pago con la tarjeta
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setErrorMessage(error.message);
        setIsProcessing(false);
        return;
      }

      // Llamada al backend para crear el PaymentIntent
      const response = await fetch('http://localhost:3000/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          payment_method: paymentMethod.id,
          amount: total * 100, // Stripe utiliza centavos, así que multiplicamos por 100
        }),
      });

      const paymentIntentData = await response.json();

      const { error: confirmError } = await stripe.confirmCardPayment(paymentIntentData.clientSecret);

      if (confirmError) {
        setErrorMessage(confirmError.message);
        setIsProcessing(false);
        return;
      }

      setPaymentSuccess(true);
    } catch (error) {
      setErrorMessage('Ocurrió un error inesperado.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
<form onSubmit={handleSubmit} className="space-y-4"> 
  <h2 className="text-xl font-semibold mb-4 mt-6 text-gray-900">Métodos de pago: </h2>
  <div className="modal pt-8 mt-4">
    <div className="form">
      <div className="payment--options grid grid-cols-3 gap-4"> {/* Cambié a grid para una mejor alineación */}
        <button 
          name="paypal" 
          type="button" 
          className="p-4 w-full bg-gray-100 rounded-md flex items-center justify-center hover:border-black hover:border h-16"
        >
          {/* SVG code */}
          <svg xmlSpace="preserve" viewBox="0 0 124 33" height="33px" width="124px" y="0px" x="0px" id="Layer_1" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
            <path d="M46.211,6.749h-6.839c-0.468,0-0.866,0.34-0.939,0.802l-2.766,17.537c-0.055,0.346,0.213,0.658,0.564,0.658  h3.265c0.468,0,0.866-0.34,0.939-0.803l0.746-4.73c0.072-0.463,0.471-0.803,0.938-0.803h2.165c4.505,0,7.105-2.18,7.784-6.5  c0.306-1.89,0.013-3.375-0.872-4.415C50.224,7.353,48.5,6.749,46.211,6.749z M47,13.154c-0.374,2.454-2.249,2.454-4.062,2.454  h-1.032l0.724-4.583c0.043-0.277,0.283-0.481,0.563-0.481h0.473c1.235,0,2.4,0,3.002,0.704C47.027,11.668,47.137,12.292,47,13.154z" fill="#253B80"></path>
            <path d="M66.654,13.075h-3.275c-0.279,0-0.52,0.204-0.563,0.481l-0.145,0.916l-0.229-0.332  c-0.709-1.029-2.29-1.373-3.868-1.373c-3.619,0-6.71,2.741-7.312,6.586c-0.313,1.918,0.132,3.752,1.22,5.031  c0.998,1.176,2.426,1.666,4.125,1.666c2.916,0,4.533-1.875,4.533-1.875l-0.146,0.91c-0.055,0.348,0.213,0.66,0.562,0.66h2.95  c0.469,0,0.865-0.34,0.939-0.803l1.77-11.209C67.271,13.388,67.004,13.075,66.654,13.075z M62.089,19.449  c-0.316,1.871-1.801,3.127-3.695,3.127c-0.951,0-1.711-0.305-2.199-0.883c-0.484-0.574-0.668-1.391-0.514-2.301  c0.295-1.855,1.805-3.152,3.67-3.152c0.93,0,1.686,0.309,2.184,0.892C62.034,17.721,62.232,18.543,62.089,19.449z" fill="#253B80"></path>
            <path d="M84.096,13.075h-3.291c-0.314,0-0.609,0.156-0.787,0.417l-4.539,6.686l-1.924-6.425  c-0.121-0.402-0.492-0.678-0.912-0.678h-3.234c-0.393,0-0.666,0.384-0.541,0.754l3.625,10.638l-3.408,4.811  c-0.268,0.379,0.002,0.9,0.465,0.9h3.287c0.312,0,0.604-0.152,0.781-0.408L84.564,13.97C84.826,13.592,84.557,13.075,84.096,13.075z" fill="#253B80"></path>
            <path d="M94.992,6.749h-6.84c-0.467,0-0.865,0.34-0.938,0.802l-2.766,17.537c-0.055,0.346,0.213,0.658,0.562,0.658  h3.51c0.326,0,0.605-0.238,0.656-0.562l0.785-4.971c0.072-0.463,0.471-0.803,0.938-0.803h2.164c4.506,0,7.105-2.18,7.785-6.5  c0.307-1.89,0.012-3.375-0.873-4.415C99.004,7.353,97.281,6.749,94.992,6.749z M95.781,13.154c-0.373,2.454-2.248,2.454-4.062,2.454  h-1.031l0.725-4.583c0.043-0.277,0.281-0.481,0.562-0.481h0.473c1.234,0,2.4,0,3.002,0.704  C95.809,11.668,95.918,12.292,95.781,13.154z" fill="#179BD7"></path>
            <path d="M115.434,13.075h-3.273c-0.281,0-0.52,0.204-0.562,0.481l-0.145,0.916l-0.23-0.332  c-0.709-1.029-2.289-1.373-3.867-1.373c-3.619,0-6.709,2.741-7.311,6.586c-0.312,1.918,0.131,3.752,1.219,5.031  c1,1.176,2.426,1.666,4.125,1.666c2.916,0,4.533-1.875,4.533-1.875l-0.146,0.91c-0.055,0.348,0.213,0.66,0.564,0.66h2.949  c0.467,0,0.865-0.34,0.938-0.803l1.771-11.209C116.053,13.388,115.785,13.075,115.434,13.075z M110.869,19.449  c-0.314,1.871-1.801,3.127-3.695,3.127c-0.949,0-1.711-0.305-2.199-0.883c-0.484-0.574-0.666-1.391-0.514-2.301  c0.297-1.855,1.805-3.152,3.67-3.152c0.93,0,1.686,0.309,2.184,0.892C110.816,17.721,111.014,18.543,110.869,19.449z" fill="#179BD7"></path>
            <path d="M119.295,7.23l-2.807,17.858c-0.055,0.346,0.213,0.658,0.562,0.658h2.822c0.469,0,0.867-0.34,0.939-0.803  l2.768-17.536c0.055-0.346-0.213-0.659-0.562-0.659h-3.16C119.578,6.749,119.338,6.953,119.295,7.23z" fill="#179BD7"></path>
            <path d="M7.266,29.154l0.523-3.322l-1.165-0.027H1.061L4.927,1.292C4.939,1.218,4.978,1.149,5.035,1.1  c0.057-0.049,0.13-0.076,0.206-0.076h9.38c3.114,0,5.263,0.648,6.385,1.927c0.526,0.6,0.861,1.227,1.023,1.917  c0.17,0.724,0.173,1.589,0.007,2.644l-0.012,0.077v0.676l0.526,0.298c0.443,0.235,0.795,0.504,1.065,0.812  c0.45,0.513,0.741,1.165,0.864,1.938c0.127,0.795,0.085,1.741-0.123,2.812c-0.24,1.232-0.628,2.305-1.152,3.183  c-0.482,0.809-1.096,1.48-1.825,2c-0.696,0.494-1.523,0.869-2.458,1.109c-0.906,0.236-1.939,0.355-3.072,0.355h-0.73  c-0.522,0-1.029,0.188-1.427,0.525c-0.399,0.344-0.663,0.814-0.744,1.328l-0.055,0.299l-0.924,5.855l-0.042,0.215  c-0.011,0.068-0.03,0.102-0.058,0.125c-0.025,0.021-0.061,0.035-0.096,0.035H7.266z" fill="#253B80"></path>
            <path d="M23.048,7.667L23.048,7.667L23.048,7.667c-0.028,0.179-0.06,0.362-0.096,0.55  c-1.237,6.351-5.469,8.545-10.874,8.545H9.326c-0.661,0-1.218,0.48-1.321,1.132l0,0l0,0L6.596,26.83l-0.399,2.533  c-0.067,0.428,0.263,0.814,0.695,0.814h4.881c0.578,0,1.069-0.42,1.16-0.99l0.048-0.248l0.919-5.832l0.059-0.32  c0.09-0.572,0.582-0.992,1.16-0.992h0.73c4.729,0,8.431-1.92,9.513-7.476c0.452-2.321,0.218-4.259-0.978-5.622  C24.022,8.286,23.573,7.945,23.048,7.667z" fill="#179BD7"></path>
            <path d="M21.754,7.151c-0.189-0.055-0.384-0.105-0.584-0.15c-0.201-0.044-0.407-0.083-0.619-0.117  c-0.742-0.12-1.555-0.177-2.426-0.177h-7.352c-0.181,0-0.353,0.041-0.507,0.115C9.927,6.985,9.675,7.306,9.614,7.699L8.05,17.605  l-0.045,0.289c0.103-0.652,0.66-1.132,1.321-1.132h2.752c5.405,0,9.637-2.195,10.874-8.545c0.037-0.188,0.068-0.371,0.096-0.55  c-0.313-0.166-0.652-0.308-1.017-0.429C21.941,7.208,21.848,7.179,21.754,7.151z" fill="#222D65"></path>
            <path d="M9.614,7.699c0.061-0.393,0.313-0.714,0.652-0.876c0.155-0.074,0.326-0.115,0.507-0.115h7.352  c0.871,0,1.684,0.057,2.426,0.177c0.212,0.034,0.418,0.073,0.619,0.117c0.2,0.045,0.395,0.095,0.584,0.15  c0.094,0.028,0.187,0.057,0.278,0.086c0.365,0.121,0.704,0.264,1.017,0.429c0.368-2.347-0.003-3.945-1.272-5.392  C20.378,0.682,17.853,0,14.622,0h-9.38c-0.66,0-1.223,0.48-1.325,1.133L0.01,25.898c-0.077,0.49,0.301,0.932,0.795,0.932h5.791  l1.454-9.225L9.614,7.699z" fill="#253B80"></path>
          </svg>
        </button>
        
        <button 
          name="google-pay" 
          type="button" 
          className="p-4 w-full bg-gray-100 rounded-md flex items-center justify-center hover:border-black hover:border h-16"
        >
          {/* SVG or content for Credit Card */}
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
          viewBox="0 0 2387.3 948" xmlSpace="preserve">
          <style type="text/css">
            {`.st0{fill:#5F6368;}
              .st1{fill:#4285F4;}
              .st2{fill:#34A853;}
              .st3{fill:#FBBC04;}
              .st4{fill:#EA4335;}`}
          </style>
          <g>
            <path className="st0" d="M1129.1,463.2V741h-88.2V54.8h233.8c56.4-1.2,110.9,20.2,151.4,59.4c41,36.9,64.1,89.7,63.2,144.8 c1.2,55.5-21.9,108.7-63.2,145.7c-40.9,39-91.4,58.5-151.4,58.4L1129.1,463.2L1129.1,463.2z M1129.1,139.3v239.6h147.8 c32.8,1,64.4-11.9,87.2-35.5c46.3-45,47.4-119.1,2.3-165.4c-0.8-0.8-1.5-1.6-2.3-2.3c-22.5-24.1-54.3-37.3-87.2-36.4L1129.1,139.3 L1129.1,139.3z M1692.5,256.2c65.2,0,116.6,17.4,154.3,52.2c37.7,34.8,56.5,82.6,56.5,143.2V741H1819v-65.2h-3.8 c-36.5,53.7-85.1,80.5-145.7,80.5c-51.7,0-95-15.3-129.8-46c-33.8-28.5-53-70.7-52.2-115c0-48.6,18.4-87.2,55.1-115.9 c36.7-28.7,85.7-43.1,147.1-43.1c52.3,0,95.5,9.6,129.3,28.7v-20.2c0.2-30.2-13.2-58.8-36.4-78c-23.3-21-53.7-32.5-85.1-32.1 c-49.2,0-88.2,20.8-116.9,62.3l-77.6-48.9C1545.6,286.8,1608.8,256.2,1692.5,256.2L1692.5,256.2z M1578.4,597.3 c-0.1,22.8,10.8,44.2,29.2,57.5c19.5,15.3,43.7,23.5,68.5,23c37.2-0.1,72.9-14.9,99.2-41.2c29.2-27.5,43.8-59.7,43.8-96.8 c-27.5-21.9-65.8-32.9-115-32.9c-35.8,0-65.7,8.6-89.6,25.9C1590.4,550.4,1578.4,571.7,1578.4,597.3L1578.4,597.3z M2387.3,271.5 L2093,948h-91l109.2-236.7l-193.6-439.8h95.8l139.9,337.3h1.9l136.1-337.3L2387.3,271.5z"/>
          </g>
          <path className="st1" d="M772.8,403.2c0-26.9-2.2-53.7-6.8-80.2H394.2v151.8h212.9c-8.8,49-37.2,92.3-78.7,119.8v98.6h127.1 C729.9,624.7,772.8,523.2,772.8,403.2L772.8,403.2z"/>
          <path className="st2" d="M394.2,788.5c106.4,0,196-34.9,261.3-95.2l-127.1-98.6c-35.4,24-80.9,37.7-134.2,37.7 c-102.8,0-190.1-69.3-221.3-162.7H42v101.6C108.9,704.5,245.2,788.5,394.2,788.5z"/>
          <path className="st3" d="M172.9,469.7c-16.5-48.9-16.5-102,0-150.9V217.2H42c-56,111.4-56,242.7,0,354.1L172.9,469.7z"/>
          <path className="st4" d="M394.2,156.1c56.2-0.9,110.5,20.3,151.2,59.1L658,102.7C586.6,35.7,492.1-1.1,394.2,0 C245.2,0,108.9,84.1,42,217.2l130.9,101.6C204.1,225.4,291.4,156.1,394.2,156.1z"/>
        </svg>
        </button>
        
        <button 
          name="bankTransfer" 
          type="button" 
          className="p-4 w-full bg-gray-100 rounded-md flex items-center justify-center hover:border-black hover:border h-16"
        >
          {/* SVG or content for Bank Transfer */}

          <svg xmlSpace="preserve" viewBox="0 0 512 210.2" y="0px" x="0px" id="Layer_1" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
            <path d="M93.6,27.1C87.6,34.2,78,39.8,68.4,39c-1.2-9.6,3.5-19.8,9-26.1c6-7.3,16.5-12.5,25-12.9  C103.4,10,99.5,19.8,93.6,27.1 M102.3,40.9c-13.9-0.8-25.8,7.9-32.4,7.9c-6.7,0-16.8-7.5-27.8-7.3c-14.3,0.2-27.6,8.3-34.9,21.2  c-15,25.8-3.9,64,10.6,85c7.1,10.4,15.6,21.8,26.8,21.4c10.6-0.4,14.8-6.9,27.6-6.9c12.9,0,16.6,6.9,27.8,6.7  c11.6-0.2,18.9-10.4,26-20.8c8.1-11.8,11.4-23.3,11.6-23.9c-0.2-0.2-22.4-8.7-22.6-34.3c-0.2-21.4,17.5-31.6,18.3-32.2  C123.3,42.9,107.7,41.3,102.3,40.9 M182.6,11.9v155.9h24.2v-53.3h33.5c30.6,0,52.1-21,52.1-51.4c0-30.4-21.1-51.2-51.3-51.2H182.6z   M206.8,32.3h27.9c21,0,33,11.2,33,30.9c0,19.7-12,31-33.1,31h-27.8V32.3z M336.6,169c15.2,0,29.3-7.7,35.7-19.9h0.5v18.7h22.4V90.2  c0-22.5-18-37-45.7-37c-25.7,0-44.7,14.7-45.4,34.9h21.8c1.8-9.6,10.7-15.9,22.9-15.9c14.8,0,23.1,6.9,23.1,19.6v8.6l-30.2,1.8  c-28.1,1.7-43.3,13.2-43.3,33.2C298.4,155.6,314.1,169,336.6,169z M343.1,150.5c-12.9,0-21.1-6.2-21.1-15.7c0-9.8,7.9-15.5,23-16.4  l26.9-1.7v8.8C371.9,140.1,359.5,150.5,343.1,150.5z M425.1,210.2c23.6,0,34.7-9,44.4-36.3L512,54.7h-24.6l-28.5,92.1h-0.5  l-28.5-92.1h-25.3l41,113.5l-2.2,6.9c-3.7,11.7-9.7,16.2-20.4,16.2c-1.9,0-5.6-0.2-7.1-0.4v18.7C417.3,210,423.3,210.2,425.1,210.2z" id="XMLID_34_"></path>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            </svg>
        </button>
      </div>
    </div>

    <div className="separator">
          <hr className="line"/>
          <p>Pago usando tarjeta de crédito</p>
          <hr className="line"/>
    </div>
    
    <div className="mt-6">
    <div className="input_container pb-4">
            <label htmlFor="password_field" className="input_label">Nombre del titular</label>
            <input id="password_field" className="input_field text-gray-900" type="text" name="input-name" title="Input title" placeholder="Nombre Completo"/>
    </div>
    <div className="credit-card-info--form">
    </div>
      <CardElement className="bg-gray-100 p-4 rounded-md shadow-sm" />
      {errorMessage && <div className="text-red-600 mt-2">{errorMessage}</div>}
    </div>

    <div className="mt-4 flex justify-end">
      <button
        type="submit"
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all disabled:opacity-50"
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? 'Procesando...' : `Pagar $ ${total.toFixed(2)}`}
      </button>
    </div>

    {paymentSuccess && <p className="text-green-500 mt-4">¡Pago exitoso!</p>}
  </div>
</form>

  );
};

const DeliveryForm = () => {
  return (
    <> 
    <h2 className="text-xl font-semibold mt-6 mb-6 text-gray-900">Entrega</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-900 mb-1 " htmlFor="pais">País / Región</label>
          <select id="pais" className="text-gray-900 bg-gray-100 w-full border border-gray-300  rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>México</option>
          </select>
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-gray-700 mb-1" htmlFor="nombre">Nombre</label>
            <input id="nombre" type="text" className="text-gray-900 bg-gray-100 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 mb-1" htmlFor="apellidos">Apellidos</label>
            <input id="apellidos" type="text" className="text-gray-900 bg-gray-100 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-1" htmlFor="referencias">Entre calles o referencias</label>
          <input id="referencias" type="text" placeholder="(color de fachada, Edif #.. Dep...)" className="text-gray-900 bg-gray-100 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>

        <div>
          <label className="block text-gray-700 mb-1" htmlFor="direccion">Dirección</label>
          <input id="direccion" type="text" className="text-gray-900 bg-gray-100 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>

        <div>
          <label className="block text-gray-700 mb-1" htmlFor="colonia">Colonia</label>
          <input id="colonia" type="text" className="text-gray-900 bg-gray-100 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>

        <div className="flex space-x-4">
          <div className="w-1/3">
            <label className="block text-gray-700 mb-1" htmlFor="codigo-postal">Código postal</label>
            <input id="codigo-postal" type="text" className="text-gray-900 bg-gray-100 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div className="w-1/3">
            <label className="block text-gray-700 mb-1" htmlFor="ciudad">Ciudad</label>
            <input id="ciudad" type="text" className="text-gray-900 bg-gray-100 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div className="w-1/3">
            <label className="block text-gray-700 mb-1" htmlFor="estado">Estado</label>
            <select id="estado" className="text-gray-900 bg-gray-100 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Coahuila de Zaragoza</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-1" htmlFor="telefono">Teléfono</label>
          <input id="telefono" type="text" className="text-gray-900 bg-gray-100 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>

        <div className="space-y-2">
          <div>
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600"/>
              <span className="ml-2 text-gray-700">Guardar mi información y consultar más rápidamente la próxima vez</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600"/>
              <span className="ml-2 text-gray-700">Enviarme novedades y ofertas por SMS</span>
            </label>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mt-4 mb-2">Métodos de envío</h3>
          <div className="bg-gray-100 border border-gray-300 rounded-md p-4 text-gray-600">
            Ingresa tu dirección de envío para ver los métodos disponibles.
          </div>
        </div>
      </form>
    </>
  );
}

// Componente principal del checkout
const Checkout = () => {
  const location = useLocation();
  const { selectedProducts, total } = location.state || { selectedProducts: [], total: 0 };

  return (
    <Elements stripe={stripePromise}>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto pb-12 mb-12">
        <h1 className="text-xl font-semibold mb-4 text-gray-900">Checkout </h1>
        <div className="checkout-card">
          <h2 className="order-summary-title">Resumen del Pedido</h2>
          <ul className="product-list">
            {selectedProducts.map((producto) => (
              <li className="product-item" key={producto._id}>
                <div className="product-info">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="product-image"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="product-name">{producto.nombre}</h4>
                    <p className="product-price">${producto.precio.toFixed(2)} x {producto.quantity}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <h3 className="total-amount">Total: ${total.toFixed(2)}</h3>
        </div>

        <DeliveryForm/>

        <CheckoutForm selectedProducts={selectedProducts} total={total} />
      </div>
    </Elements>
  );
};

export default Checkout;