import React, { useEffect, useState } from "react";

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      {!orders ? (
        <div>Loading. . .</div>
      ) : (
        <div>
          <h1>Order History</h1>
          <ul>
            {orders.map((order) => (
              <li key={order._id}>
                <div>Order ID: {order._id}</div>
                <div>Total: {order.total}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default OrderHistoryPage;
