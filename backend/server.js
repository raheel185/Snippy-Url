import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import urlRoutes from "./routes/urlRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// Routes
app.use("/api", urlRoutes);
app.use("/", urlRoutes); // for redirect

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
