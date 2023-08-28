
export default function LineProduct({ lineProduct}) {
  return (
    <div className="LineProduct">
      <div className="flex-ctr-ctr">{lineProduct.Product.price}</div>
      <div className="flex-ctr-ctr flex-col">
        <span className="align-ctr">{lineProduct.Product.name}</span>
        <span>{lineProduct.Product.price.toFixed(2)}</span>
      </div>
      </div>
  );
}
