function Cart({ cartItems }) {
  return (
    <ul>
      {cartItems.map((item) => (
        <li key={item._id}>{item.name}</li>
      ))}
    </ul>
  );
}
