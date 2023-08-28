const Schema = require("mongoose").Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { Type: String, required: true },
    imageUrl: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = productSchema;
