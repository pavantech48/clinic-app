"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

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

  useEffect(() => {
    fetchBookings();
  }, []);

  // Cancel booking
  const cancelBooking = async (id: string) => {
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

  return (
    <div className="min-h-screen bg-rose-50 pt-32 px-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-10">
          My Bookings
        </h1>

        {/* LOADING SKELETON */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse bg-white p-6 rounded-2xl h-24"
              />
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && bookings.length === 0 && (
          <div className="bg-white p-10 rounded-3xl text-center">
            <h2 className="text-2xl font-semibold mb-2">
              No bookings found
            </h2>
            <p className="text-gray-500">
              You haven’t booked any appointment yet.
            </p>
          </div>
        )}

        {/* BOOKING LIST */}
        {!loading && bookings.length > 0 && (
          <div className="space-y-6">

            {bookings.map((b) => (
              <div
                key={b._id}
                className="bg-white rounded-3xl p-6 shadow-sm flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-semibold">
                    {b.service}
                  </h3>
                  <p className="text-gray-500">
                    {b.doctor}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {b.date} • {b.slot}
                  </p>
                </div>

                <button
                  onClick={() => cancelBooking(b._id)}
                  className="px-5 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Cancel
                </button>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}