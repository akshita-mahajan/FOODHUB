const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        foodId: {
  type: Number,
},
        name: {
          type: String,
          required: true,
        },

        image: String,

        price: {
          type: Number,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],

    deliveryAddress: {
      fullName: String,
      phone: String,
      street: String,
      city: String,
      pincode: String,
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "UPI", "Card"],
      default: "COD",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    orderStatus: {
      type: String,
      enum: [
        "Placed",
        "Accepted",
        "Preparing",
        "Out For Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Placed",
    },

    subtotal: Number,

    deliveryFee: Number,

    tax: Number,

    totalAmount: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);