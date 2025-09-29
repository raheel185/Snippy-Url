import express from "express";
import {
  createShortUrl,
  redirectUrl,
  urlStats,
} from "../controllers/urlController.js";

const router = express.Router();

// API route
router.post("/shorten", createShortUrl);

// Redirect route
router.get("/:code", redirectUrl);

// GET /stats/:shortId → get stats
router.get("/stats/:shortId", urlStats);

export default router;
