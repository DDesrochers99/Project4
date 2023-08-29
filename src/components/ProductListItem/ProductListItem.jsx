
export default function ProductListItem({ Product, handleAddToOrder }) {
  return (
    <div className="MenuListItem">
      <div className=" flex-ctr-ctr">{Product.price}</div>
      <div className="name">{Product.name}</div>
      <div className="buy">
        <span>${Product.price.toFixed(2)}</span>
        <button
          className="btn-sm"
          onClick={() => handleAddToOrder(Product._id)}  >
          ADD
        </button>
      </div>
    </div>
  );
}
