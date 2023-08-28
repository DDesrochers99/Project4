const mongoose = require("mongoose");
require("./category");

const productSchema = require("./ProductSchema");

module.exports = mongoose.model("Product", productSchema);
