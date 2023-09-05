import React, { useState, useEffect, useRef } from "react";
import * as productsAPI from "../../utilities/product-api";
import * as ordersAPI from "../../utilities/order-api";
import CategoryList from "../../components/CategoryList/CategoryList";
import ProductList from "../../components/ProductList/ProductList";
import UserLogOut from "../../components/UserLogOut/UserLogOut";
import Cart from "../../components/Cart/Cart";
import Carousel from "react-bootstrap/Carousel";
import "./NewOrderPage.css";

function NewOrderPage({ user, setUser }) {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCat, setActiveCat] = useState("");
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
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

  // Function to calculate the total price
  const calculateTotal = () => {
    let totalPrice = 0;
    for (const product of cart) {
      totalPrice += product.price * product.qty;
    }
    return totalPrice;
  };

  // Update the total whenever the cart changes
  useEffect(() => {
    setTotal(calculateTotal());
  }, [cart]);

  async function handleCheckout() {
    try {
      const formattedLineProducts = cart.map((product) => ({
        productId: product._id,
        newQty: product.qty,
        price: product.price,
      }));
      await ordersAPI.checkout(formattedLineProducts);
      setCart([]);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  }

  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item._id === product._id);
    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item._id === product._id ? { ...item, qty: item.qty + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const handleQtyChange = (productId, newQty) => {
    const parsedQty = parseInt(newQty, 10);
    const validQty = isNaN(parsedQty) ? 1 : Math.max(parsedQty, 1);
    const updatedCart = cart.map((product) =>
      product._id === productId ? { ...product, qty: validQty } : product
    );
    setCart(updatedCart);
  };

  const handleRemoveItem = (productId) => {
    const updatedCart = cart.filter((product) => product._id !== productId);
    setCart(updatedCart);
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
      <Cart
        cart={cart}
        handleQtyChange={handleQtyChange}
        handleRemoveItem={handleRemoveItem}
        handleCheckout={handleCheckout}
        total={total}
      />
    </div>
  );
}

export default NewOrderPage;
