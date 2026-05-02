"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../lib/AuthContext";
import { useRouter } from "next/navigation";
type Booking = {
  _id: string;
  name: string;
  service: string;
  doctor: string;
  slot: string;
  date: string;
  status: string;
};

export default function AdminDashboard() {
const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // =========================
  // FETCH BOOKINGS
  // =========================
  const fetchBookings = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No authentication token found. Please login again.");
      setLoading(false);
      return;
    }

    try {
      console.log("Fetching bookings from API...");
      const res = await axios.get(
        "http://localhost:5000/api/bookings/admin/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", res.data);
      console.log("Response type:", typeof res.data);
      console.log("Is array?", Array.isArray(res.data));

      if (Array.isArray(res.data)) {
        setBookings(res.data);
        setError(null);
      } else {
        setError("API returned invalid data format");
        console.error("Expected array, got:", res.data);
      }
    } catch (err) {
      console.error("API Error:", err);
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 403) {
          setError("Admin access denied. Please login with an admin account.");
        } else if (err.response?.status === 401) {
          setError("Authentication failed. Please login again.");
        } else {
          setError(`API error: ${err.response?.status} ${err.response?.statusText}`);
        }
      } else {
        setError("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      const token = localStorage.getItem("token");
      if (!user || !token) {
        router.push("/login");
        return;
      }
      if (user.role !== "admin") {
        // Stay on page, will show access denied in render
        setLoading(false);
        return;
      }
      // User is admin, fetch bookings
      fetchBookings();
    }
  }, [authLoading, user, router]);


  // =========================
  // UPDATE STATUS
  // =========================
  const updateStatus = async (id: string, status: string) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:5000/api/bookings/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings((prev) =>
        prev.map((b) => (b._id === id ? res.data : b))
      );

    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // DELETE BOOKING
  // =========================
  const deleteBooking = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/bookings/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings((prev) => prev.filter((b) => b._id !== id));

    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // FILTER TODAY BOOKINGS
  // =========================
  const today = new Date().toISOString().split("T")[0];

  const todayBookings = bookings.filter((b) => {
    const matches = b.date?.startsWith(today);
    console.log(`Booking ${b._id}: date="${b.date}", today="${today}", matches=${matches}`);
    return matches;
  });

  const pending = bookings.filter((b) => b.status === "pending");

  console.log("Bookings stats:", {
    total: bookings.length,
    today: todayBookings.length,
    pending: pending.length,
    todayString: today,
    sampleDates: bookings.slice(0, 3).map(b => b.date)
  });

  // =========================
  // LOADING / AUTH CHECKS
  // =========================
  if (authLoading || loading) {
    return <div className="p-20 text-center">Loading admin dashboard...</div>;
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600">This page requires admin privileges.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 mt-10 flex">

      {/* Sidebar */}
      <aside className="w-72 bg-black text-white p-10  hidden lg:block">
        <h2 className="text-3xl font-bold mb-16">Radiant Admin</h2>

        <nav className="space-y-6">
          <button>Dashboard</button>
          <button>Appointments</button>
          <button>Patients</button>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-10 md:p-14">

        {/* TOP */}
        <div className="flex justify-between items-center mb-16">
          <div>
            <p className="text-gray-500 mb-2">Admin Overview</p>
            <h1 className="text-5xl font-bold">Dashboard</h1>
          </div>

          <button className="bg-black text-white px-8 py-4 rounded-full">
            + Add Doctor
          </button>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-8 rounded-3xl border border-red-200 bg-red-50 px-8 py-6 text-red-700">
            {error}
          </div>
        )}

        {/* STATS (LIVE) */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">

          <div className="bg-white p-10 rounded-3xl">
            <h2 className="text-5xl font-bold">{bookings.length}</h2>
            <p>Total Appointments</p>
          </div>

          <div className="bg-white p-10 rounded-3xl">
            <h2 className="text-5xl font-bold">{todayBookings.length}</h2>
            <p>Today</p>
          </div>

          <div className="bg-white p-10 rounded-3xl">
            <h2 className="text-5xl font-bold">{pending.length}</h2>
            <p>Pending</p>
          </div>

          <div className="bg-white p-10 rounded-3xl">
            <h2 className="text-5xl font-bold">
              ₹{bookings.length * 500}
            </h2>
            <p>Revenue</p>
          </div>

        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-16">

          <div className="bg-white p-10 rounded-3xl">
            <h2 className="text-5xl font-bold">{bookings.length}</h2>
            <p>Total Appointments</p>
          </div>

          <div className="bg-white p-10 rounded-3xl">
            <h2 className="text-5xl font-bold">{todayBookings.length}</h2>
            <p>Today</p>
          </div>

          <div className="bg-white p-10 rounded-3xl">
            <h2 className="text-5xl font-bold">{pending.length}</h2>
            <p>Pending</p>
          </div>

          <div className="bg-white p-10 rounded-3xl">
            <h2 className="text-5xl font-bold">
              ₹{bookings.length * 500}
            </h2>
            <p>Revenue</p>
          </div>

        </div>

        {/* BOOKINGS LIST */}
        <div className="bg-white rounded-3xl p-10 shadow-sm">

          <h2 className="text-3xl font-bold mb-8">
            All Appointments
          </h2>

          <div className="space-y-5">

            {bookings.map((b) => (

              <div
                key={b._id}
                className="border rounded-3xl p-6 flex justify-between items-center"
              >

                <div>
                  <h3 className="font-semibold">
                    {b.name} — {b.service}
                  </h3>

                  <p className="text-gray-500">
                    {b.date} • {b.slot}
                  </p>

                  <p className="text-sm">
                    Status:
                    <span className="ml-2 font-semibold">
                      {b.status}
                    </span>
                  </p>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-2 flex-wrap">

                  <button
                    onClick={() => updateStatus(b._id, "confirmed")}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Confirm
                  </button>

                  <button
                    onClick={() => updateStatus(b._id, "completed")}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Complete
                  </button>

                  <button
                    onClick={() => deleteBooking(b._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </main>

    </div>
  );
}