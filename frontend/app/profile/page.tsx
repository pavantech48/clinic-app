"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type UserType = {
  name: string;
  email: string;
  phone?: string;
};

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<any[]>([]);

  // 🔵 MODAL STATES
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newSlot, setNewSlot] = useState("");

  // 🔵 OPEN MODAL
  const openReschedule = (id: string) => {
    setSelectedId(id);
    setOpenModal(true);
  };

  // 🔵 FETCH USER + BOOKINGS
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      router.push("/login");
      return;
    }

    setUser(JSON.parse(userData));

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

  // 🔵 RESCHEDULE SAVE
  const handleReschedule = async () => {
    try {
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
    } catch (err) {
      console.log(err);
    }
  };

  // 🔴 CANCEL BOOKING
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

  // ⏳ LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">

      <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-10">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Profile Page
        </h1>

        {/* USER INFO */}
        {user && (
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <p className="text-gray-500 text-sm">Name</p>
              <p className="font-semibold">{user.name}</p>
            </div>

            <div className="p-4 border rounded-lg">
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-semibold">{user.email}</p>
            </div>

            {user.phone && (
              <div className="p-4 border rounded-lg">
                <p className="text-gray-500 text-sm">Phone</p>
                <p className="font-semibold">{user.phone}</p>
              </div>
            )}
          </div>
        )}

        {/* BOOKING HISTORY */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">
            Booking History
          </h2>

          {bookings.length === 0 ? (
            <p className="text-gray-500">No bookings found</p>
          ) : (
            <div className="space-y-3">

              {bookings.map((b) => (
                <div
                  key={b._id}
                  className="p-4 border rounded-lg bg-gray-50"
                >

                  <p className="font-semibold">{b.service}</p>
                  <p className="text-sm text-gray-600">{b.doctor}</p>
                  <p className="text-sm text-gray-500">
                    {b.date} • {b.slot}
                  </p>

                  {/* STATUS COLOR */}
                  <p className={
                    b.status === "pending"
                      ? "text-yellow-500"
                      : b.status === "confirmed"
                      ? "text-blue-500"
                      : b.status === "completed"
                      ? "text-green-500"
                      : "text-red-500"
                  }>
                    {b.status}
                  </p>

                  {/* ACTIONS */}
                  <div className="flex gap-2 mt-2">

                    <button
                      onClick={() => openReschedule(b._id)}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
                    >
                      Reschedule
                    </button>

                    <button
                      onClick={() => cancelBooking(b._id)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded"
                    >
                      Cancel
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}
        </div>

        {/* LOGOUT */}
        <button
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            router.push("/login");
          }}
          className="w-full bg-red-500 text-white py-3 rounded-lg mt-6 hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>

      {/* 🔵 MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-[300px]">

            <h2 className="font-bold mb-4">Reschedule</h2>

            <input
              type="date"
              className="border w-full p-2 mb-3"
              onChange={(e) => setNewDate(e.target.value)}
            />

            <input
              type="text"
              placeholder="Slot"
              className="border w-full p-2 mb-3"
              onChange={(e) => setNewSlot(e.target.value)}
            />

            <div className="flex gap-2">

              <button
                onClick={handleReschedule}
                className="bg-blue-500 text-white px-3 py-1"
              >
                Save
              </button>

              <button
                onClick={() => setOpenModal(false)}
                className="bg-gray-300 px-3 py-1"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}