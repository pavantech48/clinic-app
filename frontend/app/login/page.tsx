"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/lib/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Login successful ✅");

        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        setUser(data.user);

        // 🔥 ADMIN + USER REDIRECT LOGIC
       if (data.user.role === "admin") {
  router.push("/admin");
} else {
  router.push("/");
}

      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white flex items-center justify-center px-6 py-20">
      <div className="grid lg:grid-cols-2 max-w-6xl w-full rounded-[40px] overflow-hidden shadow-2xl bg-white">
        
        {/* LEFT */}
        <div className="bg-black text-white p-16 flex flex-col justify-center">
          <p className="uppercase tracking-[4px] text-sm mb-6">Welcome Back</p>
          <h1 className="text-6xl font-bold leading-tight mb-8">
            Login To Your Account
          </h1>
          <p className="text-gray-300 leading-8 mb-10">
            Access appointments, consultations and treatment history in one place.
          </p>

          <div className="space-y-6">
            <div className="border border-white/20 rounded-3xl p-6">
              Manage Appointments
            </div>
            <div className="border border-white/20 rounded-3xl p-6">
              View Treatments
            </div>
            <div className="border border-white/20 rounded-3xl p-6">
              Track Progress
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="p-16">
          <div className="mb-12">
            <h2 className="text-5xl font-bold mb-4">Login</h2>
            <p className="text-gray-500">
              Sign in to your patient account
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-5 border rounded-2xl"
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-5 border rounded-2xl"
              onChange={handleChange}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-5 rounded-full text-lg"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center mt-10 text-gray-500">
            Don't have an account?{" "}
            <Link href="/register" className="font-semibold text-black">
              Sign Up
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}