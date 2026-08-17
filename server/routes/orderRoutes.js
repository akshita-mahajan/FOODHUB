const express = require("express");

const {
  placeOrder,
  getUserOrders,
  getSingleOrder,
  updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/", placeOrder);

router.get("/user/:userId", getUserOrders);

router.get("/:id", getSingleOrder);

router.put("/:id", updateOrderStatus);

module.exports = router;