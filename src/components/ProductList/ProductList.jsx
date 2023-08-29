import React from "react";
import "./ProductList.css"

function ProductList({ products }) {
  return (
    <div className="ProductList">
      <div className="card-container">
        {products.map((product, index) => (
          <div key={index} className="card">
            <img
              src={product.imgUrl}
              alt={product.name}
              className="card-image"
            />
            <div className="card-content">
              <h3>{product.name}</h3>
              <p className="card-description">{product.description}</p>
              <p>Category: {product.category.name}</p>
              <p>Price: ${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
