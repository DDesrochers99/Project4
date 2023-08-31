import React from "react";

function LineProduct({ product }) {

  if (!product || !product.price) {
    return null;
  }

  return (
    <div className="LineProduct">
      <div className="flex-ctr-ctr">{product.price}</div>
      <div className="flex-ctr-ctr flex-col">
        <span className="align-ctr">{product.name}</span>
      </div>
    </div>
  );
}

export default LineProduct;
