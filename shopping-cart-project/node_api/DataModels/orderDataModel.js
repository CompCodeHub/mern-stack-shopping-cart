const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    shippingAddress: {
      type: String,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    shipping: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    paidAt: {
      type: Date,
    },
    status: {
      type: String,
      required: true,
      default: "IN TRANSIT",
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Order", orderSchema);
