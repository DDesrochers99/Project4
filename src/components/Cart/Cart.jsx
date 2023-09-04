import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import LineProduct from "../LineProduct/LineProduct";
import "./Cart.css";

function Cart({ cart, handleQtyChange, handleRemoveItem, handleCheckout, total }) {


  return (
    <div className="Cart">
      <h2>Your Cart</h2>
      <ListGroup>
        {cart.map((product) => (
          <ListGroup.Item key={product._id}>
            <span>SKU: {product._id.substring(product._id.length - 6)} </span>{" "}
            <br />
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
      <div className="Total">
        <strong>Total: </strong>
        {total.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </div>
      <button className="btn-sm" onClick={handleCheckout}>
        CHECKOUT
      </button>
    </div>
  );
}


export default Cart;
