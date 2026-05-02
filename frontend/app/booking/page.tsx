"use client";
import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";
import {
 ArrowRight,
 Calendar,
 Sparkles,
 ScanFace,
 HeartPulse,
 Star, ChevronDown 
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import router from "next/dist/shared/lib/router/router";

const services=[
"Laser Hair Removal",
"Skin Rejuvenation",
"Medical Facial",
"Acne Treatment"
];

const doctors=[
"Dr. Aisha Sharma",
"Dr. Rahul Mehta",
"Dr. Neha Kapoor"
];

const slots=[
"10:00 AM",
"11:30 AM",
"1:00 PM",
"3:00 PM",
"5:30 PM"
];

export default function BookingPage(){

const [step,setStep]=useState(1);

const [selectedService,setSelectedService]=useState("");
const [selectedDoctor,setSelectedDoctor]=useState("");
const [selectedSlot,setSelectedSlot]=useState("");

const [patientName,setPatientName]=useState("");
const [patientEmail,setPatientEmail]=useState("");
const [patientPhone,setPatientPhone]=useState("");
const [selectedDate, setSelectedDate] = useState("");
const router = useRouter();



const handleBooking = async () => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to book an appointment");
      router.push("/login");
      return;
    }

    const bookingData = {
      service: selectedService,
      doctor: selectedDoctor,
      slot: selectedSlot,
      date: selectedDate,
      name: patientName,
      email: patientEmail,
      phone: patientPhone
    };

    // Send request with Authorization header
    const res = await axios.post(
      "http://localhost:5000/api/bookings",
      bookingData,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("Booking created:", res.data);

    router.push("/booking-success");

  } catch(error: unknown){
    if (axios.isAxiosError(error)) {
      console.error("Booking Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Booking failed");
    } else {
      console.error("Booking Error:", error);
      alert("Booking failed");
    }
  }
};
return(
<div className="bg-white">


{/* HERO */}
<section className="pt-40 pb-24 bg-gradient-to-b from-rose-50 to-white text-center">

<h1 className="text-6xl font-bold mb-8">
Book Appointment
</h1>

<p className="max-w-2xl mx-auto text-gray-600">
Schedule your consultation in a few simple steps.
</p>

</section>



<section className="py-24">

<div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">


{/* LEFT FORM */}
<div className="md:col-span-2 bg-white rounded-[40px] shadow-xl p-10">

<h2 className="text-4xl font-bold mb-10">
Appointment Details
</h2>


{/* Name */}
<input
type="text"
value={patientName}
onChange={(e)=>setPatientName(e.target.value)}
placeholder="Full Name"
className="w-full mb-6 p-5 rounded-2xl border"
/>


<input
type="email"
value={patientEmail}
onChange={(e)=>setPatientEmail(e.target.value)}
placeholder="Email Address"
className="w-full mb-8 p-5 rounded-2xl border"
/>

<input
type="text"
value={patientPhone}
onChange={(e)=>setPatientPhone(e.target.value)}
placeholder="Phone Number"
className="w-full mb-8 p-5 rounded-2xl border"
/>



{/* Services */}
<h3 className="text-2xl font-semibold mb-6">
Choose Service
</h3>

<div className="grid md:grid-cols-2 gap-4 mb-10">

{services.map((service,index)=>(
<button
key={index}
onClick={()=>setSelectedService(service)}
className={`p-8 border rounded-3xl transition hover:shadow-lg
${
selectedService===service
? "bg-black text-white border-black"
: "hover:bg-black hover:text-white"
}`}
>
{service}
</button>

))}

</div>



{/* Doctors */}
<h3 className="text-2xl font-semibold mb-6">
Select Specialist
</h3>

<div className="grid md:grid-cols-2 gap-4 mb-10">

{doctors.map((doctor,index)=>(

<button
key={index}
onClick={()=>setSelectedDoctor(doctor)}
className={`p-8 border rounded-3xl transition hover:shadow-lg
${
selectedDoctor===doctor
? "bg-black text-white border-black"
: "hover:bg-black hover:text-white"
}`}
>
{doctor}
</button>

))}

</div>



{/* Date */}
<h3 className="text-2xl font-semibold mb-6">
Select Date
</h3>

<input
  type="date"
  value={selectedDate}
  onChange={(e) => setSelectedDate(e.target.value)}
  className="w-full p-5 rounded-2xl border mb-10"
/>



{/* Slots */}
<h3 className="text-2xl font-semibold mb-6">
Available Time Slots
</h3>

<div className="grid md:grid-cols-3 gap-4">

{[
"10 AM",
"11:30 AM",
"1 PM",
"3 PM",
"5 PM"
].map((slot,index)=>(

<button
key={index}
onClick={()=>setSelectedSlot(slot)}
className={`p-5 border rounded-2xl transition
${
selectedSlot===slot
? "bg-black text-white border-black"
: "hover:bg-black hover:text-white"
}`}
>
{slot}
</button>

))}

</div>


<div className="mt-10">
<button
disabled={
!patientName ||
!patientEmail ||
!patientPhone ||
!selectedService ||
!selectedDoctor ||
!selectedSlot
}
onClick={handleBooking}
className="bg-black text-white px-10 py-5 rounded-full disabled:opacity-40"
>
Confirm Booking
</button>
</div>


</div>



{/* SUMMARY */}
<div className="bg-rose-50 rounded-[40px] p-10 h-fit sticky top-32">

<h3 className="text-3xl font-bold mb-8">
Booking Summary
</h3>

<div className="space-y-6 text-lg">

<div>
<p className="text-gray-500">
Treatment
</p>
<p>{selectedService || "Not selected"}</p>
</div>


<div>
<p className="text-gray-500">
Doctor
</p>
<p>{selectedDoctor || "Not selected"}</p>
</div>


<div>
<p className="text-gray-500">
Time
</p>
<p>{selectedSlot || "Not selected"}</p>
</div>

</div>


<div className="mt-10 p-6 rounded-3xl bg-white">
Free Consultation Included
</div>

</div>



</div>

</section>

{/* Progress Steps (top of booking page, below hero) */}\
<section className="py-12 bg-white">
<div className="max-w-6xl mx-auto px-6">

<div className="grid md:grid-cols-4 gap-6">

{[
"Choose Service",
"Select Doctor",
"Pick Time",
"Confirm Booking"
].map((step,i)=>(

<div
key={i}
className="rounded-3xl bg-rose-50 p-8 text-center shadow-sm"
>
<div className="text-5xl font-bold text-gray-200 mb-4">
0{i+1}
</div>

<h3 className="text-xl font-semibold">
{step}
</h3>

</div>

))}

</div>

</div>
</section>
<section className="py-24 bg-rose-50">

<div className="max-w-7xl mx-auto px-6">

<div className="text-center mb-16">
<h2 className="text-5xl font-bold">
Choose Your Specialist
</h2>
</div>


<div className="grid md:grid-cols-3 gap-8">

{[
{
name:"Dr. Aisha",
specialty:"Dermatologist"
},
{
name:"Dr. Rahul",
specialty:"Laser Expert"
},
{
name:"Dr. Neha",
specialty:"Skin Specialist"
}

].map((doctor,i)=>(

<div
key={i}
className="bg-white rounded-[32px] p-10 shadow-sm hover:shadow-xl transition"
>

<div className="w-24 h-24 rounded-full bg-gray-100 mb-6"></div>

<h3 className="text-2xl font-bold mb-3">
{doctor.name}
</h3>

<p className="text-gray-500 mb-6">
{doctor.specialty}
</p>

<button className="px-6 py-3 rounded-full bg-black text-white">
Select Doctor
</button>

</div>

))}

</div>

</div>
</section>
<div className="mt-10 bg-white rounded-3xl p-8 shadow-sm">

<h4 className="text-2xl font-semibold mb-6">
Payment Summary
</h4>

<div className="space-y-4 mb-8">

<div className="flex justify-between">
<span>Consultation</span>
<span>₹500</span>
</div>

<div className="flex justify-between">
<span>Treatment Deposit</span>
<span>₹1000</span>
</div>

<hr />

<div className="flex justify-between font-bold text-xl">
<span>Total</span>
<span>₹1500</span>
</div>

</div>

<button className="w-full bg-black text-white py-4 rounded-full">
Proceed To Payment
</button>

</div>

<section className="py-20 bg-black text-white">

<div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">

<div>
<h3 className="text-4xl font-bold mb-4">
12K+
</h3>
<p>Appointments Booked</p>
</div>

<div>
<h3 className="text-4xl font-bold mb-4">
96%
</h3>
<p>Client Satisfaction</p>
</div>

<div>
<h3 className="text-4xl font-bold mb-4">
15+
</h3>
<p>Years Experience</p>
</div>

</div>
</section>



<Footer />

</div>
)
}