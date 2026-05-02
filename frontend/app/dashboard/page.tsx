"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newSlot, setNewSlot] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/bookings/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBookings(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [router]);

  const cancelBooking = async (id: string) => {
    const token = localStorage.getItem("token");

    await axios.delete(`http://localhost:5000/api/bookings/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setBookings((prev) => prev.filter((b) => b._id !== id));
  };

  const openReschedule = (id: string) => {
    setSelectedId(id);
    setOpenModal(true);
  };

  const handleReschedule = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.put(
      `http://localhost:5000/api/bookings/${selectedId}/reschedule`,
      { date: newDate, slot: newSlot },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setBookings((prev) =>
      prev.map((b) => (b._id === selectedId ? res.data : b))
    );

    setOpenModal(false);
  };

  const upcoming = bookings.filter((b) => b.status !== "completed");
  const completed = bookings.filter((b) => b.status === "completed");

  if (loading) {
    return (
      <div className="pt-40 text-center text-gray-500">
        Loading your dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <div>
            <p className="text-gray-500 mb-2">Welcome back</p>
            <h1 className="text-5xl font-bold">Your Dashboard</h1>
          </div>

          <button
            onClick={() => router.push("/booking")}
            className="mt-6 md:mt-0 bg-black text-white px-8 py-4 rounded-full hover:bg-pink-500 transition"
          >
            + Book New Session
          </button>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[ 
            { label: "Upcoming", value: upcoming.length },
            { label: "Completed", value: completed.length },
            { label: "Total", value: bookings.length },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-sm hover:shadow-lg transition"
            >
              <h2 className="text-5xl font-bold mb-2">
                {item.value}
              </h2>
              <p className="text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>

        {/* UPCOMING */}
        <div className="bg-white rounded-[32px] p-10 shadow-sm mb-12">
          <h2 className="text-3xl font-bold mb-8">
            Upcoming Appointments
          </h2>

          {upcoming.length === 0 ? (
            <p className="text-gray-400">No upcoming bookings</p>
          ) : (
            <div className="space-y-5">
              {upcoming.map((b) => (
                <div
                  key={b._id}
                  className="border rounded-2xl p-6 flex justify-between items-center hover:shadow-md transition"
                >
                  <div>
                    <p className="font-semibold text-lg">
                      {b.service}
                    </p>
                    <p className="text-gray-500">
                      {b.date} • {b.slot}
                    </p>
                  </div>

                  <div className="flex gap-3">

                    <button
                      onClick={() => openReschedule(b._id)}
                      className="px-5 py-2 rounded-full border hover:bg-black hover:text-white transition"
                    >
                      Reschedule
                    </button>

                    <button
                      onClick={() => cancelBooking(b._id)}
                      className="px-5 py-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition"
                    >
                      Cancel
                    </button>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* COMPLETED */}
        <div className="bg-white rounded-[32px] p-10 shadow-sm">
          <h2 className="text-3xl font-bold mb-8">
            Completed Sessions
          </h2>

          {completed.length === 0 ? (
            <p className="text-gray-400">No completed sessions</p>
          ) : (
            <div className="space-y-5">
              {completed.map((b) => (
                <div
                  key={b._id}
                  className="border rounded-2xl p-6 bg-gray-50"
                >
                  <p className="font-semibold">
                    {b.service}
                  </p>
                  <p className="text-gray-500">
                    {b.date} • {b.slot}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MODAL */}
        {openModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-8 rounded-3xl w-96 shadow-xl">

              <h3 className="text-2xl font-bold mb-6">
                Reschedule Booking
              </h3>

              <input
                type="date"
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full border p-3 rounded-xl mb-4"
              />

              <input
                type="text"
                placeholder="Enter new time slot"
                onChange={(e) => setNewSlot(e.target.value)}
                className="w-full border p-3 rounded-xl mb-6"
              />

              <button
                onClick={handleReschedule}
                className="w-full bg-black text-white py-3 rounded-full hover:bg-pink-500 transition"
              >
                Confirm Changes
              </button>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}