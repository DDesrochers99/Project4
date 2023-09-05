import React, { useState, useEffect, useRef } from "react";
import * as productsAPI from "../../utilities/product-api";
import AddProductForm from "../../components/ProductForm/ProductForm";
import AdminProduct from "../../components/AdminProduct/AdminProduct";

function AdminPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const categoriesRef = useRef([]);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    async function getProducts() {
      const products = await productsAPI.getAll();
      categoriesRef.current = [
        ...new Set(products.map((product) => product.category.name)),
      ];
      setAllProducts(products);
      setFilteredProducts(products);
    }
    getProducts();
  }, [rerender]);

  async function handleDeleteProduct(productId) {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error deleting product");
      }

      const updatedProducts = allProducts.filter(
        (product) => product._id !== productId
      );

      setAllProducts(updatedProducts);
      setRerender(!rerender);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  async function handleUpdateProduct(productId, updatedData) {
    console.log("productId:", productId);
    console.log("updatedData:", updatedData);
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Error updating product");
      }

      const updatedProduct = await response.json();

      const updatedProducts = allProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      );

      setAllProducts(updatedProducts);
      setRerender(!rerender);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  }

  async function handleCreateProduct(newProductData) {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProductData),
      });

      if (!response.ok) {
        throw new Error("Error creating product");
      }

      const createdProduct = await response.json();

      setAllProducts([...allProducts, createdProduct]);
      setRerender(!rerender);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <AddProductForm handleCreateProduct={handleCreateProduct} />
      <AdminProduct
        products={filteredProducts}
        handleDeleteProduct={handleDeleteProduct}
        handleUpdateProduct={handleUpdateProduct}
      />
    </div>
  );
}

export default AdminPage;
