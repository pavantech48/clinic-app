import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

// ===== FIX: correct .env path =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

// START SERVER AFTER DB CONNECTS
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error(error);
  }
};

startServer();