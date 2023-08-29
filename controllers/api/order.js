const Order = require("../../models/order");

module.exports = {
  cart,
  addToCart,
  setProductQtyInCart,
  checkout,
};

async function cart(req, res) {
  const cart = await Order.getCart(req.user._id);
  res.json(cart);
}

async function addToCart(req, res) {
  const cart = await Order.getCart(req.user._id);
  await cart.addProductToCart(req.params.id);
  res.json(cart);
}

async function setProductQtyInCart(req, res) {
  const cart = await Order.getCart(req.user._id);
  await cart.setProductQty(req.body.productId, req.body.newQty);
  res.json(cart);
}

async function checkout(req, res) {
  const cart = await Order.getCart(req.user._id);
  cart.isPaid = true;
  await cart.save();
  res.json(cart);
}
