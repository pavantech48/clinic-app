import express from "express";
import Booking from "../models/Booking.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import { sendBookingEmail } from "../utils/sendMail.js";
import { sendAdminNotification } from "../utils/sendMail.js";

const router = express.Router();

// =======================
// CREATE BOOKING (USER)
// =======================
router.post("/", authMiddleware, async (req, res) => {
  try {
    console.log("Booking model:", Booking);

    const booking = await Booking.create({
      ...req.body,
      userId: req.user.id,
    });

    // 🔵 USER EMAIL
    try {
      await sendBookingEmail(booking);
    } catch (mailErr) {
      console.log("User mail failed:", mailErr.message);
    }

    // 🔴 ADMIN EMAIL (🔥 FIXED POSITION)
    try {
      await sendAdminNotification(booking);
    } catch (err) {
      console.log("Admin mail failed:", err.message);
    }

    res.status(201).json(booking);

  } catch (error) {
    console.log("CREATE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// =======================
// GET MY BOOKINGS (USER)
// =======================
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// =======================
// ADMIN - GET ALL BOOKINGS
// =======================
router.get("/admin/all", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// =======================
// UPDATE STATUS (ADMIN)
// =======================
router.put("/:id/status", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// =======================
// RESCHEDULE BOOKING (USER)
// =======================
router.put("/:id/reschedule", authMiddleware, async (req, res) => {
  try {
    const { date, slot } = req.body;

    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { date, slot },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// =======================
// CANCEL BOOKING (DELETE)
// =======================
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);

    res.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;