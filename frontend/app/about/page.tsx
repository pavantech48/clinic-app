"use client";

import Footer from "@/components/Footer";
import Link from "next/link";

export default function AboutPage(){
return(

<div className="bg-white pt-32">


{/* Hero */}
<section className="py-24 bg-gradient-to-b from-rose-50 to-white text-center">

<p className="uppercase tracking-[4px] text-sm text-gray-500 mb-4">
About Us
</p>

<h1 className="text-6xl font-bold mb-8">
Advanced Skin Care,
Human Approach
</h1>

<p className="max-w-3xl mx-auto text-gray-600">
Combining dermatology expertise with
modern aesthetic technology.
</p>

</section>



{/* Story */}
<section className="py-28">
<div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

<div>

<h2 className="text-5xl font-bold mb-8">
Our Story
</h2>

<p className="text-gray-600 leading-8 mb-8">
We built Radiant to make advanced skin
treatments accessible, personalized and
results-driven.
</p>

<p className="text-gray-600 leading-8">
Trusted by thousands of clients for
laser, rejuvenation and medical skincare.
</p>

</div>



<div className="rounded-[40px] overflow-hidden shadow-2xl">

<div className="h-[550px] bg-gray-200 flex items-center justify-center text-3xl font-semibold">
Clinic Image
</div>

</div>

</div>
</section>



{/* Stats */}
<section className="py-24 bg-rose-50">

<div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8">

{[
{
number:"12K+",
label:"Happy Clients"
},
{
number:"15+",
label:"Years"
},
{
number:"40+",
label:"Treatments"
},
{
number:"96%",
label:"Success Rate"
}
].map((item,index)=>(

<div
key={index}
className="bg-white rounded-[32px] p-10 text-center shadow-sm"
>

<h3 className="text-5xl font-bold mb-4">
{item.number}
</h3>

<p className="text-gray-500">
{item.label}
</p>

</div>

))}

</div>

</section>



{/* Doctors */}
<section className="py-28">

<div className="max-w-7xl mx-auto px-6">

<div className="text-center mb-20">
<h2 className="text-5xl font-bold">
Meet Specialists
</h2>
</div>


<div className="grid md:grid-cols-3 gap-8">

{[
"Dr. Aisha",
"Dr. Rahul",
"Dr. Neha"
].map((doctor,index)=>(

<div
key={index}
className="bg-white rounded-[40px] shadow-xl p-10 text-center"
>

<div className="w-36 h-36 rounded-full bg-gray-100 mx-auto mb-8"/>

<h3 className="text-2xl font-bold mb-3">
{doctor}
</h3>

<p className="text-gray-500">
Dermatology Specialist
</p>

</div>

))}

</div>

</div>

</section>



{/* Technology */}
<section className="py-28 bg-black text-white">

<div className="max-w-6xl mx-auto px-6 text-center">

<h2 className="text-5xl font-bold mb-10">
Technology We Use
</h2>

<div className="grid md:grid-cols-3 gap-8 mt-16">

{[
"FDA Approved Lasers",
"Advanced Skin Imaging",
"Modern Treatment Devices"
].map((item,index)=>(

<div
key={index}
className="border border-white/20 rounded-[32px] p-10"
>
{item}
</div>

))}

</div>

</div>

</section>



{/* CTA */}
<section className="py-24 text-center">

<h2 className="text-5xl font-bold mb-8">
Experience Expert Care
</h2>

<Link
href="/booking"
className="bg-black text-white px-10 py-5 rounded-full inline-block"
>
Book Consultation
</Link>

</section>

<Footer />
</div>

)
}