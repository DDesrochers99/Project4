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

lineProductSchema.virtual("extPrice").get(function () {
  return this.qty * this.product.price;
});

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lineProducts: [lineProductSchema],
    isPaid: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

orderSchema.virtual("orderTotal").get(function () {
  return this.lineProducts.reduce(
    (total, lineProduct) => total + lineProduct.extPrice,
    0
  );
});

orderSchema.virtual("orderQty").get(function () {
  return this.lineProducts.reduce(
    (total, lineProduct) => total + lineProduct.qty,
    0
  );
});

orderSchema.virtual("orderId").get(function () {
  return this.id.slice(-6).toUpperCase();
});

orderSchema.statics.getCart = function (userId) {
  return this.findOneAndUpdate(
    { user: userId, isPaid: false },
    { user: userId },
    { upsert: true, new: true }
  );
};

orderSchema.methods.addProductToCart = async function (productId) {
  const cart = this;
  const lineProduct = cart.lineProducts.find((lp) =>
    lp.product._id.equals(productId)
  );
  if (lineProduct) {
    lineProduct.qty += 1;
  } else {
    const Product = mongoose.model("Product");
    const product = await Product.findById(productId);
    cart.lineProducts.push({ product });
  }
  return cart.save();
};

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
