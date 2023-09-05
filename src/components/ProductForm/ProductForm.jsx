import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function ProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imgUrl: "",
    category: "",
    price: 0,
  });

  const categories = ["Home", "Remote Control", "DnD", "Random"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle success
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
        <h4>Add Product</h4>
      <Form.Group controlId="productName">
        <Form.Label>Product Name:</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="productDescription">
        <Form.Label>Description:</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="productImgUrl">
        <Form.Label>Image URL:</Form.Label>
        <Form.Control
          type="text"
          name="imgUrl"
          value={formData.imgUrl}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="productCategory">
        <Form.Label>Category:</Form.Label>
        <Form.Control
          as="select"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="productPrice">
        <Form.Label>Price:</Form.Label>
        <Form.Control
          type="number"
          name="price"
          onChange={handleChange}
        />
      </Form.Group>
      <br></br>
      <Button variant="primary" type="submit">
        Create Product
      </Button>
    </Form>
  );
}

export default ProductForm;
