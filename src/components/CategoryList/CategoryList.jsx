import React from "react";
import "./CategoryList.css";

export default function CategoryList({ categories, activeCat, setActiveCat }) {
  const cats = categories.map((cat) => (
    <li
      key={cat}
      className={`category-item ${cat === activeCat ? "active" : ""}`}
      onClick={() => setActiveCat(cat)}
    >
      {cat}
    </li>
  ));

  return <ul className="CategoryList">{cats}</ul>;
}
