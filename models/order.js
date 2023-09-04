const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lineProductSchema = new Schema(
  {
    qty: { type: Number, default: 1 },
    product: { type: Schema.Types.ObjectId, ref: "Product" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);



const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lineProducts: [lineProductSchema],
    isPaid: { type: Boolean, default: false },
    total: { type: Number },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);


orderSchema.statics.getCart = function (userId) {
  return this.findOneAndUpdate(
    { user: userId, isPaid: false },
    { user: userId },
    { upsert: true, new: true }
  );
};

// models/order.js

orderSchema.methods.addProductToCart = async function (productId) {
  try {
    const cart = this;
    console.log("Adding product to cart:", productId);
    
    const lineProduct = cart.lineProducts.find((lp) =>
      lp.product._id.equals(productId)
    );

    if (lineProduct) {
      console.log("Found existing lineProduct:", lineProduct);
      lineProduct.qty += 1;
    } else {
      const Product = mongoose.model("Product");
      const product = await Product.findById(productId);
      console.log("Adding new product to cart:", product);
      cart.lineProducts.push({ product });
    }

    const savedCart = await cart.save();
    console.log("Cart after modification:", savedCart);
    return savedCart;
  } catch (error) {
    console.error("Error in addProductToCart:", error);
    throw error;
  }
}



orderSchema.methods.setProductQty = function (productId, newQty) {
  const cart = this;
  const lineProduct = cart.lineProducts.find((lp) =>
    lp.product._id.equals(productId)
  );
  if (lineProduct && newQty <= 0) {
    lineProduct.deleteOne();
  } else if (lineProduct) {
    lineProduct.qty = newQty;
  }
  return cart.save();
};

module.exports = mongoose.model("Order", orderSchema);
