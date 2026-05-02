"use client";

import { useState } from "react";
import axios from "axios";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ContactPage() {

  // ======================
  // STATE
  // ======================
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // ======================
  // HANDLE INPUT
  // ======================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ======================
  // SUBMIT FORM
  // ======================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/contact", form);

      alert("Message sent successfully ✅");

      // reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

    } catch (err) {
      console.error(err);
      alert("Failed to send message ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white pt-32">

      {/* Hero */}
      <section className="py-24 text-center bg-gradient-to-b from-rose-50 to-white">
        <p className="uppercase tracking-[4px] text-sm text-gray-500 mb-4">
          Contact Us
        </p>

        <h1 className="text-6xl font-bold mb-8">
          Let’s Talk Skin Care
        </h1>

        <p className="max-w-2xl mx-auto text-gray-600">
          Questions, consultations or appointments —
          we’re here to help.
        </p>
      </section>

      {/* FORM + INFO */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">

          {/* Contact Form */}
          <div className="bg-white rounded-[40px] shadow-2xl p-12">

            <h2 className="text-4xl font-bold mb-10">
              Send a Message
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-5 border rounded-2xl"
                required
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-5 border rounded-2xl"
                required
              />

              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full p-5 border rounded-2xl"
                required
              />

              <textarea
                rows={5}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="How can we help?"
                className="w-full p-5 border rounded-2xl"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-black text-white px-10 py-5 rounded-full w-full"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

            </form>
          </div>

          {/* Info */}
          <div className="space-y-8">

            <div className="bg-rose-50 rounded-[32px] p-10">
              <h3 className="text-3xl font-bold mb-6">
                Visit Clinic
              </h3>

              <p className="leading-8 text-gray-600">
                123 Premium Avenue<br />
                Bhilwara, Rajasthan
              </p>
            </div>

            <div className="bg-white shadow-sm rounded-[32px] p-10">
              <h3 className="text-3xl font-bold mb-6">
                Contact Info
              </h3>

              <div className="space-y-4 text-gray-600">
                <p>+91 98765 43210</p>
                <p>hello@radiantclinic.com</p>
                <p>Mon-Sat 10AM–7PM</p>
              </div>
            </div>

            <div className="rounded-[32px] overflow-hidden shadow-xl">
              <div className="h-[350px] bg-gray-200 flex items-center justify-center text-2xl font-semibold">
                Google Map Here
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-black text-white text-center">
        <h2 className="text-5xl font-bold mb-8">
          Ready To Book?
        </h2>

        <Link
          href="/booking"
          className="bg-white text-black px-8 py-4 rounded-full inline-block"
        >
          Book Consultation
        </Link>
      </section>

      <Footer />
    </div>
  );
}