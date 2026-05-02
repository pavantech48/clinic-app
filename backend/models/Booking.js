import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    service: String,
    doctor: String,
    slot: String,
    date: String,
    name: String,
    email: String,
    phone: String,
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);