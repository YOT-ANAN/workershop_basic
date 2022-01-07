const mongoose = require("mongoose");
const products = new mongoose.Schema(
  {
    product_code: { type: String },
    product_name: { type: String },
    product_detail: { type: Object },
    price: { type: Number },
    amount: { type: Number },
  },
  { timestamps: true }
);
module.exports = mongoose.model("products", products);
