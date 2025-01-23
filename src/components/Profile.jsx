import React, { useEffect, useState } from "react";

const Profile = () => {
  const [orders, setOrders] = useState([]);

  // Lógica para obtener las órdenes al cargar el componente
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3000/ordenes"); // Ruta para obtener las órdenes
        if (!response.ok) throw new Error("Error al obtener las órdenes");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#fffff",
      }}
    >
      <div
        style={{
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
          textAlign: "center",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        {orders.length > 0 ? (
          <>
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
                color: "#333",
              }}
            >
              Tus Pedidos
            </h1>
            <ul style={{ listStyle: "none", padding: "0" }}>
              {orders.map((order, index) => (
                <li
                  key={index}
                  style={{
                    fontSize: "1rem",
                    color: "#555",
                    margin: "0.5rem 0",
                  }}
                >
                  <strong>Pedido ID:</strong> {order.id} <br />
                  <strong>Total:</strong> ${order.total}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
                color: "#333",
              }}
            >
              Aún no tienes ningún pedido
            </h1>
            <p style={{ fontSize: "1rem", color: "#666" }}>
              Ve a la tienda para realizar un pedido.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
