import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button"; // Import the Button component
import "./Cart.css";

function Cart({ cart, handleQtyChange, handleRemoveItem, handleCheckout }) {
  return (
    <div className="Cart">
      <h2>Your Cart</h2>
      <ListGroup>
        {cart.map((product) => (
          <ListGroup.Item key={product._id}>
            SKU: {product._id.substring(product._id.length - 6)} <br />
            {product.name} <br />
            <input
              type="number"
              value={product.qty}
              onChange={(e) => handleQtyChange(product._id, e.target.value)}
            />
            <button onClick={() => handleRemoveItem(product._id)}>X</button>{" "}
            <br />
            Price:{" "}
            {(product.price * product.qty).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Button variant="primary" onClick={handleCheckout}>
        Checkout
      </Button>
    </div>
  );
}

export default Cart;
