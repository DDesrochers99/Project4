import React, { useState, useEffect, useRef } from "react";
import * as productsAPI from "../../utilities/product-api";
import AddProductForm from "../../components/ProductForm/ProductForm";
import AdminProduct from "../../components/AdminProduct/AdminProduct";

function AdminPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const categoriesRef = useRef([]);

  useEffect(() => {
    async function getProducts() {
      const products = await productsAPI.getAll();
      categoriesRef.current = [
        ...new Set(products.map((product) => product.category.name)),
      ];
      setAllProducts(products);
      // Set filteredProducts to allProducts initially
      setFilteredProducts(products);
    }
    getProducts();
  }, []);

 async function handleDeleteProduct(productId) {
    try {
      // Make a DELETE request using AJAX
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error deleting product");
      }

      // If the request is successful, you can update your local state as needed
      const updatedProducts = allProducts.filter(
        (product) => product._id !== productId
      );
      setAllProducts(updatedProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  async function handleUpdateProduct(productId, updatedData) {
    try {
      // Make a PUT or PATCH request using AJAX
      const response = await fetch(`/api/products/${productId}`, {
        method: "PUT", // Use "PUT" or "PATCH" as needed
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Error updating product");
      }

      // If the request is successful, you can update your local state as needed
      const updatedProduct = await response.json();
      const updatedProducts = allProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      );
      setAllProducts(updatedProducts);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <AddProductForm />
      <AdminProduct
        products={filteredProducts}
        handleDeleteProduct={handleDeleteProduct}
        handleUpdateProduct={handleUpdateProduct}
      />
    </div>
  );
}

export default AdminPage;
