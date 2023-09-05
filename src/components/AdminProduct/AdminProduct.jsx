import React, { useState } from "react";
import "./AdminProduct.css";

function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
}

function AdminProduct({ products, handleDeleteProduct, handleUpdateProduct }) {
  const [updatedData, setUpdatedData] = useState({});

  const handleUpdateDataChange = (key, value) => {
    setUpdatedData({ ...updatedData, [key]: value });
  };

  return (
    <div className="AdminProduct">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{truncateText(product.description, 100)}</td>
              <td>{product.category.name}</td>
              <td>${product.price}</td>
              <td>
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      handleUpdateProduct(product._id, updatedData);
                      setUpdatedData({});
                    }}
                  >
                    Update
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProduct;
