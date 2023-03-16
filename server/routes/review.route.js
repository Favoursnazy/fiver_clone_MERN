import express from "express";
import {
  createReview,
  getReviews,
  deleteReviews,
} from "../controllers/review.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/create", verifyToken, createReview);
router.get("/:id", getReviews);
router.delete("/:id", verifyToken, deleteReviews);

export default router;
