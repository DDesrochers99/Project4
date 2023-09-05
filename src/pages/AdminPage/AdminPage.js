import React, { useState, useEffect, useRef } from "react";
import * as productsAPI from "../../utilities/product-api";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
import EditProductForm from "../../components/EditProductForm/EditProductForm";
import ProductForm from "../../components/ProductForm/ProductForm";

function AdminPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const categoriesRef = useRef([]);
  const [rerender, setRerender] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editProductData, setEditProductData] = useState({});
  const [showProductForm, setShowProductForm] = useState(true);

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

  const handleUpdateProduct = (productId, data) => {
    setIsEditing(true);
    setEditProductData({ productId, ...data });
    setShowProductForm(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditProductData({});
    setShowProductForm(true);
  };

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

      // Force a re-render by generating a random key
      setRerenderKey(Math.random());
    } catch (error) {
      console.error("Error creating product:", error);
    }
  }

  const [rerenderKey, setRerenderKey] = useState(0);

  return (
    <div key={rerenderKey}>
      <h1 className="text-center">Admin Dashboard</h1>
      {showProductForm ? (
        <ProductForm handleCreateProduct={handleCreateProduct} />
      ) : (
        <EditProductForm
          product={editProductData}
          onUpdate={handleUpdateProduct}
          onCancel={handleCancelEdit}
        />
      )}
      <AdminProduct
        products={filteredProducts}
        handleDeleteProduct={handleDeleteProduct}
        handleUpdateProduct={handleUpdateProduct}
      />
    </div>
  );
}

export default AdminPage;
