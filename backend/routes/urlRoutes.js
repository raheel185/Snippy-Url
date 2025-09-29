import express from "express";
import { createShortUrl, redirectUrl } from "../controllers/urlController.js";

const router = express.Router();

// API route
router.post("/shorten", createShortUrl);

// Redirect route
router.get("/:code", redirectUrl);

export default router;
