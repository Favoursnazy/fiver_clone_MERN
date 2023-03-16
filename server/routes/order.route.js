import express from "express";
import {
  getOrder,
  createPayment,
  updateOrder,
} from "../controllers/order.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

// router.post("/create/:id", verifyToken, createOrder);
router.get("/", verifyToken, getOrder);
router.post("/create-payement-intent/:id", verifyToken, createPayment);
router.put("/", updateOrder);

export default router;
