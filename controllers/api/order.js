const Order = require("../../models/order");


// controllers/api/order.js

async function addToCart(req, res) {
  try {
    const cart = await Order.getCart(req.user._id);
    await cart.addProductToCart(req.params.id);
    res.json(cart);
  } catch (error) {
    console.error("Error in addToCart:", error);
    res.status(500).json({ error: "An error occurred while adding the product to the cart." });
  }
}



async function setProductQtyInCart(req, res) {
  const cart = await Order.getCart(req.user._id);
  await cart.setProductQty(req.body.productId, req.body.newQty); 
  res.json(cart);
}



async function checkout(req, res) {
  try {
    
    const cart = await Order.getCart(req.user._id);
    cart.isPaid = true;

    const total = req.body.lineProducts.reduce((accumulator, lineProduct) => {
      return accumulator + lineProduct.price * lineProduct.newQty;
    }, 0);

    cart.total = total;

    if (req.body.lineProducts) {
      cart.lineProducts = req.body.lineProducts;
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ error: "An error occurred during checkout." });
  }
}


async function getOrderById(req, res) {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    res.json(order);
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    res.status(500).json({ error: "An error occurred while fetching order." });
  }
}

async function getAll(req, res) {
  try {
    const orders = await Order.find();
    res.json(orders) 
  }
  catch (error) {
    console.error("Error fetching order in getAll", error);
    res.status(500).json({ error: "An error occurred while fetching order." });
  }
}

module.exports = {
  addToCart,
  setProductQtyInCart,
  checkout,
  getOrderById,
  getAll,
};