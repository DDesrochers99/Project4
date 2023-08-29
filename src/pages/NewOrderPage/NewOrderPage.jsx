import React, { useState, useEffect, useRef } from "react";
import * as productsAPI from "../../utilities/product-api";
import CategoryList from "../../components/CategoryList/CategoryList";
import ProductList from "../../components/ProductList/ProductList";
import Cart from "../../components/Cart/Cart";
import Carousel from "react-bootstrap/Carousel";
import "./NewOrderPage.css";

function NewOrderPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCat, setActiveCat] = useState("");
  const [cart, setCart] = useState([]); // <-- New cart state
  const categoriesRef = useRef([]);

  useEffect(() => {
    async function getProducts() {
      const products = await productsAPI.getAll();
      categoriesRef.current = [
        ...new Set(products.map((product) => product.category.name)),
      ];
      setAllProducts(products);
      setActiveCat(categoriesRef.current[0]);
    }
    getProducts();
  }, []);

  useEffect(() => {
    if (activeCat) {
      const filteredProducts = allProducts.filter(
        (product) => product.category.name === activeCat
      );
      setFilteredProducts(filteredProducts);
    } else {
      setFilteredProducts(allProducts);
    }
  }, [activeCat, allProducts]);

  // Function to handle adding items to the cart
  const handleAddToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  return (
    <div>
      <Carousel interval={3000} prevLabel="" nextLabel="">
        {filteredProducts.map((product, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block mx-auto carousel-image"
              src={product.imgUrl}
              alt={product.name}
            />
            <Carousel.Caption className="carousel-caption">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      <CategoryList
        categories={categoriesRef.current}
        activeCat={activeCat}
        setActiveCat={setActiveCat}
      />
      <ProductList
        products={filteredProducts}
        handleAddToCart={handleAddToCart}
      />
      <Cart cart={cart} /> 
    </div>
  );
}

export default NewOrderPage;
