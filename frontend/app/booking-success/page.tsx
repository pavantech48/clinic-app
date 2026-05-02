export default function BookingSuccessPage() {
return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-50 to-white px-6">

<div className="bg-white shadow-2xl rounded-[40px] p-16 text-center max-w-2xl w-full">

<div className="w-24 h-24 mx-auto rounded-full bg-black text-white flex items-center justify-center text-3xl mb-10">
✓
</div>

<h1 className="text-5xl font-bold mb-6">
Booking Confirmed
</h1>

<p className="text-gray-600 mb-10">
Your appointment has been successfully scheduled.
</p>

<div className="bg-rose-50 rounded-3xl p-8 mb-10">
<p>Appointment ID: RND-2026-001</p>
<p>Status: Confirmed</p>
</div>

<a
href="/dashboard"
className="bg-black text-white px-8 py-4 rounded-full inline-block"
>
Go To Dashboard
</a>

</div>

</div>
);
}   