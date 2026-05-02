import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

// =======================
// TRANSPORTER
// =======================
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "[OK LOADED]" : undefined);

// verify mail server
transporter.verify((error) => {
  if (error) {
    console.log("MAIL ERROR:", error);
  } else {
    console.log("Mail server ready");
  }
});


// =======================
// BOOKING CONFIRMATION EMAIL
// =======================
export const sendBookingEmail = async (data) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: data.email,
      subject: "Booking Confirmation",
      html: `
        <h2>🎉 Appointment Confirmed</h2>
        <p><b>Name:</b> ${data.name}</p>
        <p><b>Service:</b> ${data.service}</p>
        <p><b>Doctor:</b> ${data.doctor}</p>
        <p><b>Date:</b> ${data.date}</p>
        <p><b>Time:</b> ${data.slot}</p>
      `,
    });

    console.log("Booking email sent");
  } catch (err) {
    console.log("Booking Email Error:", err);
  }
};


// =======================
// CANCEL BOOKING EMAIL
// =======================
export const sendCancelEmail = async (data) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: data.email,
      subject: "Appointment Cancelled",
      html: `
        <h2>❌ Appointment Cancelled</h2>
        <p>Hello ${data.name},</p>
        <p>Your appointment for <b>${data.service}</b> has been cancelled.</p>
      `,
    });

    console.log("Cancel email sent");
  } catch (err) {
    console.log("Cancel Email Error:", err);
  }
};


// =======================
// RESCHEDULE EMAIL
// =======================
export const sendRescheduleEmail = async (data) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: data.email,
      subject: "Appointment Rescheduled",
      html: `
        <h2>🔄 Appointment Rescheduled</h2>
        <p>Hello ${data.name},</p>
        <p>Your appointment has been updated.</p>
        <p><b>New Date:</b> ${data.date}</p>
        <p><b>New Time:</b> ${data.slot}</p>
      `,
    });

    console.log("Reschedule email sent");
  } catch (err) {
    console.log("Reschedule Email Error:", err);
  }
};


// =======================
// ADMIN NEW BOOKING ALERT
// =======================
export const sendAdminNotification = async (data) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `🚀 New Booking - ${data.name}`,
      html: `
        <h2>New Appointment Booked</h2>

        <p><b>Name:</b> ${data.name}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Phone:</b> ${data.phone}</p>

        <hr/>

        <p><b>Service:</b> ${data.service}</p>
        <p><b>Doctor:</b> ${data.doctor}</p>
        <p><b>Date:</b> ${data.date}</p>
        <p><b>Time:</b> ${data.slot}</p>
      `,
    });

    console.log("Admin email sent");
  } catch (err) {
    console.log("Admin Email Error:", err);
  }
};


export const sendContactMail = async (data) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL, // 👈 admin ko mail jayega
      subject: "New Contact Message",
      html: `
        <h2>📩 New Contact Form Message</h2>
        <p><b>Name:</b> ${data.name}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Phone:</b> ${data.phone}</p>
        <p><b>Message:</b> ${data.message}</p>
      `,
    });

    console.log("Contact mail sent");

  } catch (err) {
    console.log("Contact mail error:", err);
  }
};