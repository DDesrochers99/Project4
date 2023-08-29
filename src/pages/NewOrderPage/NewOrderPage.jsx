import React, { useState, useEffect, useRef } from "react";
import * as productsAPI from "../../utilities/product-api";
import CategoryList from "../../components/CategoryList/CategoryList";

function NewOrderPage() {
  const [categories, setCategories] = useState([]);
  const [activeCat, setActiveCat] = useState("");
  const categoriesRef = useRef([]);

  useEffect(function () {
    async function getProducts() {
      const products = await productsAPI.getAll();
      categoriesRef.current = [
        ...new Set(products.map((product) => product.category.name)),
      ];
      setActiveCat(categoriesRef.current[0]);
    }
    getProducts();
  }, []);

  return (
    <div>
      <CategoryList
        categories={categoriesRef.current}
        activeCat={activeCat}
        setActiveCat={setActiveCat}
      />
    </div>
  );
}

export default NewOrderPage;
