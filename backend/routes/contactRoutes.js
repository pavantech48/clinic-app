import express from "express";
import { sendContactMail } from "../utils/sendMail.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    await sendContactMail({ name, email, phone, message });

    res.status(200).json({ message: "Message sent" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;