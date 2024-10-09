import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';

loadStripe()

const stripePromise = loadStripe("pk_live_51Q4DuTLAufqZUSmlPyiTbZvyjmhNXiTC0BbKABNV4So6HmF59arwYsnfVmHCXE3bZWyopZRv4Ya6MhmAko0Z1wYt00HLJ3BXed")


const Checkout = () => {
    
    const stripe = useStripe();
    const elements = useElements();
    
    const handleSubmit = async (e) => {
        e.preventDefaul();

    const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })
    }
    
    return <form onSubmit={handleSubmit}>
        <CardElement/>
        <button>
            buy
        </button>
        </form>
}

function App() {
    return (
        <Elements stripe={stripePromise}>
            <Checkout>

            </Checkout>
        </Elements>
    );
}

export default App;
