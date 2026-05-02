"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
 ArrowRight,
 Calendar,
 Sparkles,
 ScanFace,
 HeartPulse,
 Star,
 ChevronDown,
 ShieldCheck
} from "lucide-react";
 
import Footer from "@/components/Footer";

const services = [
{
title:"Laser Hair Removal",
icon:Sparkles,
desc:"Advanced laser technology for long-lasting smooth results.",
price:"From ₹2,999",
time:"45 mins"
},

{
title:"Skin Rejuvenation",
icon:ScanFace,
desc:"Restore glow, texture and youthful skin appearance.",
price:"From ₹4,999",
time:"60 mins"
},

{
title:"Medical Facials",
icon:HeartPulse,
desc:"Clinical facials personalized to skin concerns.",
price:"From ₹1,999",
time:"50 mins"
},

{
title:"Acne Treatment",
icon:ShieldCheck,
desc:"Targeted dermatology treatments for acne-prone skin.",
price:"From ₹3,499",
time:"40 mins"
}
];

export default function ServicesPage(){
const [openServiceFaq, setOpenServiceFaq] = useState<number | null>(null);

return (
<div className="bg-white">

{/* HERO */}
<section className="pt-40 pb-24 bg-gradient-to-b from-rose-50 to-white">
<div className="max-w-7xl mx-auto px-6 text-center">

<motion.h1
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:.7}}
className="text-6xl font-bold mb-8"
>
Advanced Skin Services
</motion.h1>

<motion.p
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{delay:.2}}
className="max-w-2xl mx-auto text-gray-600 text-lg leading-8"
>
Personalized aesthetic and dermatology treatments
designed for visible results.
</motion.p>

</div>
</section>



{/* SERVICES GRID */}
<section className="py-24">
<div className="max-w-7xl mx-auto px-6">

<div className="grid md:grid-cols-2 gap-10">

{services.map((service,i)=>{

const Icon=service.icon;

return(
<motion.div
key={i}
initial={{opacity:0,y:60}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}
transition={{
duration:.7,
delay:i*.15
}}
whileHover={{y:-10}}
className="rounded-[36px] p-10 border border-gray-100 shadow-sm hover:shadow-2xl transition"
>

<div className="w-20 h-20 rounded-3xl bg-rose-50 flex items-center justify-center mb-8">
<Icon size={34}/>
</div>

<h2 className="text-3xl font-bold mb-4">
{service.title}
</h2>

<p className="text-gray-600 leading-8 mb-8">
{service.desc}
</p>


<div className="flex gap-4 mb-8 flex-wrap">

<span className="px-5 py-3 rounded-full bg-gray-50">
{service.price}
</span>

<span className="px-5 py-3 rounded-full bg-gray-50">
{service.time}
</span>

</div>


<Link
href="/booking"
className="inline-flex items-center gap-3 font-semibold hover:gap-5 transition-all"
>
Book Treatment
<ArrowRight size={18}/>
</Link>

</motion.div>
)

})}

</div>

</div>
</section>



{/* WHY CHOOSE US */}
<section className="py-24 bg-rose-50">

<div className="max-w-7xl mx-auto px-6">

<div className="text-center mb-16">
<h2 className="text-5xl font-bold mb-6">
Why Choose Us
</h2>
</div>


<div className="grid md:grid-cols-3 gap-8">

{[
"Certified Specialists",
"Advanced Technology",
"Personalized Treatments"
].map((item,i)=>(

<div
key={i}
className="bg-white rounded-3xl p-10 shadow-sm text-center"
>
<h3 className="text-2xl font-semibold">
{item}
</h3>
</div>

))}

</div>

</div>
</section>



{/* CTA */}
<section className="py-24 text-center">

<h2 className="text-5xl font-bold mb-8">
Ready To Start Treatment?
</h2>

<Link
href="/booking"
className="bg-black text-white px-10 py-5 rounded-full inline-block hover:scale-105 transition"
>
Book Consultation
</Link>

</section>

{/* Treatment Packages Section */}
<section className="py-28 bg-white">

<div className="max-w-7xl mx-auto px-6">

<div className="text-center mb-20">
<p className="uppercase tracking-[4px] text-sm text-gray-500 mb-4">
Packages
</p>

<h2 className="text-5xl font-bold mb-6">
Choose Your Treatment Plan
</h2>

<p className="max-w-2xl mx-auto text-gray-600">
Flexible packages designed for different skin goals.
</p>
</div>



<div className="grid md:grid-cols-3 gap-8">

{[
{
name:"Starter",
price:"₹4,999",
popular:false,
features:[
"Skin Consultation",
"1 Treatment Session",
"Progress Assessment",
"Support Guidance"
]
},

{
name:"Premium",
price:"₹9,999",
popular:true,
features:[
"Advanced Consultation",
"3 Treatment Sessions",
"Priority Scheduling",
"Doctor Follow-up"
]
},

{
name:"Elite",
price:"₹17,999",
popular:false,
features:[
"Full Skin Program",
"6 Treatment Sessions",
"Priority Support",
"Custom Treatment Plan"
]
}

].map((plan,i)=>(

<motion.div
key={i}
initial={{opacity:0,y:50}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}
transition={{
duration:.7,
delay:i*.15
}}
whileHover={{y:-10}}
className={`rounded-[34px] p-10 shadow-sm border transition hover:shadow-2xl
${plan.popular 
? "bg-black text-white scale-105" 
: "bg-white border-gray-100"}
`}
>

{plan.popular && (
<div className="mb-6 inline-block px-4 py-2 rounded-full bg-white text-black text-sm font-semibold">
Most Popular
</div>
)}

<h3 className="text-3xl font-bold mb-6">
{plan.name}
</h3>

<div className="text-5xl font-bold mb-8">
{plan.price}
</div>


<ul className="space-y-4 mb-10">

{plan.features.map((feature,index)=>(
<li
key={index}
className="flex items-center gap-3"
>
<span>✓</span>
<span>{feature}</span>
</li>
))}

</ul>


<Link
href="/booking"
className={`inline-block px-7 py-4 rounded-full font-medium
${plan.popular
? "bg-white text-black"
: "bg-black text-white"
}`}
>
Choose Plan
</Link>

</motion.div>

))}

</div>

</div>
</section>


{/* Treatment Process Section */}

<section className="py-28 bg-rose-50">

<div className="max-w-7xl mx-auto px-6">

<div className="text-center mb-20">
<p className="uppercase tracking-[4px] text-sm text-gray-500 mb-4">
Process
</p>

<h2 className="text-5xl font-bold mb-6">
How Your Treatment Works
</h2>

<p className="max-w-2xl mx-auto text-gray-600">
A guided process designed for safety,
comfort and visible results.
</p>
</div>



<div className="grid md:grid-cols-4 gap-8">

{[
{
step:"01",
title:"Consultation",
desc:"Discuss goals with our specialists."
},

{
step:"02",
title:"Skin Analysis",
desc:"Personalized diagnosis and planning."
},

{
step:"03",
title:"Treatment",
desc:"Advanced procedures performed safely."
},

{
step:"04",
title:"Results",
desc:"Track progress and long-term care."
}

].map((item,i)=>(

<motion.div
key={i}
initial={{opacity:0,y:50}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}
transition={{
duration:.7,
delay:i*.15
}}
whileHover={{y:-10}}
className="bg-white rounded-[34px] p-10 shadow-sm hover:shadow-xl transition text-center"
>

<div className="text-6xl font-bold text-gray-200 mb-8">
{item.step}
</div>

<h3 className="text-2xl font-semibold mb-4">
{item.title}
</h3>

<p className="text-gray-600 leading-8">
{item.desc}
</p>

</motion.div>

))}

</div>



<div className="mt-20 rounded-[40px] bg-black text-white p-16 text-center">

<h3 className="text-4xl font-bold mb-6">
Personalized Treatment Plans For Every Skin Type
</h3>

<p className="max-w-2xl mx-auto text-gray-300 mb-10 leading-8">
Every procedure is customized by specialists
based on your skin goals.
</p>

<Link
href="/booking"
className="bg-white text-black px-8 py-4 rounded-full inline-block hover:scale-105 transition"
>
Book Consultation
</Link>

</div>


</div>
</section>
{/* Results Section */}

<section className="py-28 bg-white">

<div className="max-w-7xl mx-auto px-6">

<div className="text-center mb-20">

<p className="uppercase tracking-[4px] text-sm text-gray-500 mb-4">
Results
</p>

<h2 className="text-5xl font-bold mb-6">
Trusted By Thousands
</h2>

<p className="max-w-2xl mx-auto text-gray-600">
Real outcomes powered by expertise,
technology and personalized care.
</p>

</div>



<div className="grid md:grid-cols-4 gap-8 mb-24">

{[
{
number:"12K+",
label:"Happy Clients"
},

{
number:"96%",
label:"Success Rate"
},

{
number:"15+",
label:"Years Experience"
},

{
number:"40+",
label:"Treatments"
}

].map((stat,i)=>(

<motion.div
key={i}
initial={{opacity:0,y:50}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}
transition={{
duration:.7,
delay:i*.15
}}
whileHover={{y:-8}}
className="rounded-[32px] bg-rose-50 p-10 text-center shadow-sm"
>

<h3 className="text-6xl font-bold mb-4">
{stat.number}
</h3>

<p className="text-gray-600">
{stat.label}
</p>

</motion.div>

))}

</div>



<div className="grid md:grid-cols-2 gap-12 items-center">

<motion.div
initial={{opacity:0,x:-50}}
whileInView={{opacity:1,x:0}}
viewport={{once:true}}
transition={{duration:.7}}
>

<h2 className="text-5xl font-bold mb-8">
Visible Results,
Backed By Science
</h2>

<p className="text-gray-600 leading-8 mb-8">
Our treatments combine medical expertise
with modern technology to deliver
consistent measurable improvements.
</p>


<ul className="space-y-5 text-lg">
<li>✓ FDA-approved technologies</li>
<li>✓ Personalized treatment plans</li>
<li>✓ Clinically guided procedures</li>
</ul>

</motion.div>



<motion.div
initial={{opacity:0,x:50}}
whileInView={{opacity:1,x:0}}
viewport={{once:true}}
transition={{duration:.7}}
className="rounded-[40px] overflow-hidden shadow-2xl"
>

<img
src="https://images.unsplash.com/photo-1515377905703-c4788e51af15"
alt="results"
className="w-full h-[520px] object-cover"
/>

</motion.div>


</div>


</div>
</section>

{/* FAQ */}
<section className="py-28 bg-rose-50">

<div className="max-w-5xl mx-auto px-6">

<div className="text-center mb-20">
<p className="uppercase tracking-[4px] text-sm text-gray-500 mb-4">
Treatment FAQ
</p>

<h2 className="text-5xl font-bold mb-6">
Questions About Treatments
</h2>

<p className="max-w-2xl mx-auto text-gray-600">
Everything you may want to know before starting.
</p>
</div>



<div className="space-y-6">

{[
{
question:"Are treatments safe?",
answer:"Yes, procedures are performed using clinically approved technologies."
},

{
question:"How many sessions will I need?",
answer:"It depends on treatment type and your personalized plan."
},

{
question:"Is there any downtime?",
answer:"Many treatments have little to no downtime."
},

{
question:"Do you offer consultations first?",
answer:"Yes, all treatments begin with specialist consultation."
}

].map((faq,index)=>(

<div
key={index}
className="bg-white rounded-[30px] shadow-sm overflow-hidden"
>

<button
onClick={() =>
setOpenServiceFaq(
 openServiceFaq===index ? null : index
)
}
className="w-full p-8 flex justify-between items-center text-left"
>

<h3 className="text-xl font-semibold">
{faq.question}
</h3>

<ChevronDown
className={`transition-transform duration-300 ${
openServiceFaq===index
? "rotate-180"
: ""
}`}
/>

</button>


{openServiceFaq===index && (
<div className="px-8 pb-8 text-gray-600 leading-8">
{faq.answer}
</div>
)}

</div>

))}

</div>



<div className="text-center mt-20">

<h3 className="text-4xl font-bold mb-6">
Still Have Questions?
</h3>

<Link
href="/booking"
className="bg-black text-white px-8 py-4 rounded-full inline-block hover:scale-105 transition"
>
Book Free Consultation
</Link>

</div>


</div>
</section>

<Footer />
</div>
)
}