const express = require("express");

const {
  placeOrder,
  getUserOrders,
  getSingleOrder,
  updateOrderStatus,
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, placeOrder);

router.get("/my-orders", authMiddleware, getUserOrders);

router.get("/:id", authMiddleware, getSingleOrder);

router.put("/:id", authMiddleware, updateOrderStatus);

module.exports = router;