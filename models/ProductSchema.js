const Schema = require("mongoose").Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    imgUrl: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = productSchema;
