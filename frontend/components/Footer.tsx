import Link from "next/link";

export default function Footer() {
return (
<footer className="bg-black text-white pt-24 pb-10">

{/* footer code here */}
<footer className="bg-black text-white pt-24 pb-10">

<div className="max-w-7xl mx-auto px-6">

<div className="grid md:grid-cols-4 gap-12 pb-16 border-b border-white/10">

{/* Brand */}
<div>
<h2 className="text-3xl font-bold mb-6">
Radiant<span className="text-pink-400">.</span>
</h2>

<p className="text-gray-400 leading-8 mb-6">
Advanced skin treatments and luxury
clinic care designed around results.
</p>

<Link
href="/booking"
className="inline-block bg-white text-black px-6 py-3 rounded-full"
>
Book Appointment
</Link>

</div>



{/* Quick Links */}
<div>
<h4 className="text-xl font-semibold mb-6">
Quick Links
</h4>

<ul className="space-y-4 text-gray-400">
<li>
<Link href="/">Home</Link>
</li>

<li>
<Link href="/services">Services</Link>
</li>

<li>
<Link href="/booking">Book Now</Link>
</li>

<li>
<Link href="/contact">Contact</Link>
</li>
</ul>

</div>



{/* Services */}
<div>
<h4 className="text-xl font-semibold mb-6">
Treatments
</h4>

<ul className="space-y-4 text-gray-400">
<li>Laser Hair Removal</li>
<li>Skin Rejuvenation</li>
<li>Medical Facials</li>
<li>Anti-Aging Care</li>
</ul>

</div>



{/* Contact */}
<div>
<h4 className="text-xl font-semibold mb-6">
Contact
</h4>

<ul className="space-y-4 text-gray-400">
<li>+91 98765 43210</li>
<li>hello@radiantclinic.com</li>
<li>Kota, Rajasthan</li>
<li>Mon - Sat : 10AM - 7PM</li>
</ul>

</div>


</div>



{/* Bottom Bar */}
<div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">

<p className="text-gray-500 text-sm">
© 2026 Radiant Skin Clinic. All rights reserved.
</p>

<div className="flex gap-6 text-gray-400">
<a href="#">Instagram</a>
<a href="#">Facebook</a>
<a href="#">LinkedIn</a>
</div>

</div>

</div>
</footer>

</footer>
)
}