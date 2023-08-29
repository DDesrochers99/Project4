import React from "react";

function CartItem({ item, handleRemoveFromCart }) {
  return (
    <li className="CartItem">
      <div className="cart-item-container">
        <img
          src={item.product.imgUrl}
          alt={item.product.name}
          className="cart-item-image"
        />
        <div className="cart-item-content">
          <h4>{item.product.name}</h4>
          <p>Price: ${item.product.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => handleRemoveFromCart(item.product._id)}>
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
