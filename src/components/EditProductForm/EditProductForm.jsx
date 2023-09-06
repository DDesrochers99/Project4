import React, { useState } from "react";
import InputMask from "react-input-mask"; 

const categories = [
  { name: "Home", sortOrder: 10 },
  { name: "Remote Control", sortOrder: 20 },
  { name: "DnD", sortOrder: 30 },
  { name: "Random", sortOrder: 40 },
];

function EditProductForm({ product, onUpdate, onCancel }) {
  const [updatedData, setUpdatedData] = useState({
    name: "",
    description: "",
    imgUrl: "", 
    category: "",
    price: "",
  });
const [newData, setNewData]= useState ({})
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });

    console.log("handlechang", updatedData); 
  };

  async function handleSubmit (e)  {
    e.preventDefault();
    setNewData(updatedData);
    // Log data to be sent
    console.log("newDaTA",newData);
    
    const url = `/api/products/${product.productId}`;
    console.log("beforeFetch")
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error updating product");
        }
        return response.json();
      })
      .then((updatedProduct) => {
        console.log("Updated product:", updatedProduct);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Product</h3>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={updatedData.name}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={updatedData.description}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Image URL</label>
        <input
          type="text"
          name="imgUrl"
          value={updatedData.imgUrl}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Category</label>
        <select
          name="category"
          value={updatedData.category}
          onChange={handleChange}
          className="form-control"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Price</label>
        <InputMask
          mask="99.99"
          maskChar=""
          name="price"
          value={updatedData.price}
          onChange={handleChange}
        >
          {(inputProps) => <input {...inputProps} className="form-control" />}
        </InputMask>
      </div>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
      <button type="button" onClick={onCancel} className="btn btn-secondary">
        Cancel
      </button>
    </form>
  );
}

export default EditProductForm;
