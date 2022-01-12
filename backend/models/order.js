const mongoose = require("mongoose");
const orders = new mongoose.Schema(
  {
    customer: {
      firstname: { type: String },
      lastname: { type: String },
    },
    product_lists: [
      {
        product: {
          type: Object,
        },
        amount: { type: Number },
      },
    ],
    total_amount: { type: Number },
    total_price: { type: Number },
  },
  { timestamps: true }
);
module.exports = mongoose.model("orders", orders);
