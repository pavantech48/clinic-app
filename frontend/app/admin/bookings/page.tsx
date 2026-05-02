"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../lib/AuthContext";
import { useRouter } from "next/navigation";

type Booking = {
  _id: string;
  name: string;
  service: string;
  doctor: string;
  slot: string;
  date: string;
  email: string;
  phone: string;
  status: string;
};

export default function AdminBookingsPage() {

  const router = useRouter();
  const { user, loading } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!loading) {
      const token = localStorage.getItem("token");
      if (!user || !token) {
        router.push("/login");
        return;
      }
      if (user.role === "admin") {
        fetchBookings();
      }
    }
  }, [loading, user, router]);

  const fetchBookings = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setErrorMessage("No authentication token found. Please login again.");
      return;
    }

    try {
      const res = await axios.get(
        "http://localhost:5000/api/bookings/admin/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings(res.data);
      setErrorMessage(null);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        setErrorMessage("Admin access denied. Please login with an admin account.");
      } else {
        setErrorMessage("Failed to load bookings. Please try again later.");
      }
      console.error(error);
    }
  };

  // 🔥 UPDATE STATUS
  const updateStatus = async (id: string, status: string) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:5000/api/bookings/${id}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setBookings((prev) =>
        prev.map((b) => (b._id === id ? res.data : b))
      );

    } catch (error) {
      console.error(error);
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <section className="min-h-screen bg-rose-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">Access denied</h1>
          <p className="text-lg text-gray-600">
            This page is available only to admin users. Please login with an admin account.
          </p>
        </div>
      </section>
    );
  }

  return (

    <section className="min-h-screen bg-rose-50 py-20 px-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold mb-12">
          Appointments Dashboard
        </h1>

        {errorMessage && (
          <div className="mb-8 rounded-3xl border border-red-200 bg-red-50 px-8 py-6 text-red-700">
            {errorMessage}
          </div>
        )}

        <div className="bg-white rounded-[30px] shadow-xl overflow-hidden">

          <table className="w-full">

            <thead className="bg-black text-white">
              <tr>
                <th className="p-5 text-left">Patient</th>
                <th className="p-5 text-left">Service</th>
                <th className="p-5 text-left">Doctor</th>
                <th className="p-5 text-left">Date</th>
                <th className="p-5 text-left">Slot</th>
                <th className="p-5 text-left">Status</th>
                <th className="p-5 text-left">Action</th>
              </tr>
            </thead>

            <tbody>

              {bookings.map((b) => {
                const isPast = new Date(b.date) < new Date();

                return (
                  <tr
                    key={b._id}
                    className="border-b hover:bg-rose-50"
                  >

                    <td className="p-5">{b.name}</td>
                    <td className="p-5">{b.service}</td>
                    <td className="p-5">{b.doctor}</td>
                    <td className="p-5">{b.date}</td>
                    <td className="p-5">{b.slot}</td>

                    {/* STATUS BADGE */}
                    <td className="p-5">
                      <span className={`
                        px-3 py-1 rounded-full text-sm
                        ${b.status === "pending" && "bg-yellow-100 text-yellow-600"}
                        ${b.status === "confirmed" && "bg-blue-100 text-blue-600"}
                        ${b.status === "completed" && "bg-green-100 text-green-600"}
                        ${b.status === "cancelled" && "bg-red-100 text-red-600"}
                      `}>
                        {b.status}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="p-5">
                      <div className="flex gap-2 flex-wrap">

                        {b.status === "pending" && (
                          <button
                            onClick={() => updateStatus(b._id, "confirmed")}
                            className="px-4 py-1 text-sm bg-blue-500 text-white rounded-full"
                          >
                            Confirm
                          </button>
                        )}

                        {/* 🔥 HYBRID LOGIC */}
                        {isPast && b.status !== "completed" && (
                          <button
                            onClick={() => updateStatus(b._id, "completed")}
                            className="px-4 py-1 text-sm bg-green-500 text-white rounded-full"
                          >
                            Complete
                          </button>
                        )}

                        {b.status !== "cancelled" && (
                          <button
                            onClick={() => updateStatus(b._id, "cancelled")}
                            className="px-4 py-1 text-sm bg-red-500 text-white rounded-full"
                          >
                            Cancel
                          </button>
                        )}

                      </div>
                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

      </div>

    </section>
  );
}