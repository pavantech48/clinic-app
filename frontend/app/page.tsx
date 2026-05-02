"use client";
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
import Footer from "@/components/Footer";




export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="pt-30 overflow-hidden">

      {/* HERO */}
      <section className="min-h-screen flex items-center bg-gradient-to-br from-white via-rose-50 to-purple-50">

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{opacity:0,y:50}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.8}}
          >

            <div className="inline-flex items-center gap-2 bg-white shadow px-4 py-2 rounded-full mb-6">
              <Sparkles size={18}/>
              <span>Advanced Skin Treatments</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Glow With <br />
              Expert Skin Care
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-xl">
              Book personalized treatments, expert consultations,
              and premium skincare services in just a few clicks.
            </p>

            <div className="flex gap-4 flex-wrap">
             <Link
  href="/booking"
  className="bg-black text-white px-8 py-4 rounded-full flex items-center gap-2 hover:scale-105 transition"
>
  Book Appointment
  <ArrowRight size={18}/>
</Link>

             <Link
 href="/services"
 className="border px-8 py-4 rounded-full hover:bg-white transition"
>
 Explore Services
</Link>
            </div>

          </motion.div>



          {/* RIGHT VISUAL */}
          <motion.div
            initial={{opacity:0,x:60}}
            animate={{opacity:1,x:0}}
            transition={{duration:1}}
            className="relative"
          >

          <div className="relative h-[600px] rounded-[40px] bg-white shadow-2xl p-6 overflow-hidden">

  <Image
    src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
    alt="clinic"
    fill
    className="rounded-3xl object-cover"
  />

</div>


            {/* floating card */}
        <Link href="/booking">
  <motion.div
    animate={{ y:[0,-10,0] }}
    transition={{
      repeat:Infinity,
      duration:3
    }}
    whileHover={{ scale:1.04 }}
    className="absolute -bottom-6 -left-6 bg-white p-5 rounded-3xl shadow-xl cursor-pointer"
  >
    <div className="flex gap-3 items-center">
      <Calendar />

      <div>
        <p className="font-semibold">
          Easy Appointment Booking
        </p>

        <p className="text-sm text-gray-500">
          Instant slot confirmation
        </p>
      </div>
    </div>
  </motion.div>
</Link>

          </motion.div>

        </div>

      </section>


      <section className="py-28 bg-white">

<div className="max-w-7xl mx-auto px-6">

  <motion.div
    initial={{opacity:0,y:40}}
    whileInView={{opacity:1,y:0}}
    viewport={{ once:true }}
    transition={{duration:.7}}
    className="text-center mb-16"
  >
    <p className="uppercase tracking-[4px] text-sm text-gray-500 mb-4">
      Treatments
    </p>

    <h2 className="text-5xl font-bold mb-6">
      Premium Skin Services
    </h2>

    <p className="text-gray-600 max-w-2xl mx-auto">
      Personalized aesthetic treatments designed
      to rejuvenate, restore and enhance.
    </p>
  </motion.div>



  <div className="grid md:grid-cols-3 gap-8">

    {[
      {
        icon: Sparkles,
        title:"Laser Hair Removal",
        desc:"Advanced technology for smooth lasting results."
      },
      {
        icon: ScanFace,
        title:"Skin Rejuvenation",
        desc:"Glow-enhancing treatments customized for you."
      },
      {
        icon: HeartPulse,
        title:"Medical Facials",
        desc:"Professional facials backed by skin science."
      },
    ].map((service,i)=>{

      const Icon = service.icon;

      return(
        <motion.div
          key={i}
          initial={{opacity:0,y:50}}
          whileInView={{opacity:1,y:0}}
          viewport={{once:true}}
          transition={{
            duration:.6,
            delay:i*.15
          }}
          whileHover={{
            y:-12
          }}
          className="group rounded-[30px] p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition bg-white"
        >

          <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center mb-6 group-hover:scale-110 transition">
            <Icon size={30}/>
          </div>

          <h3 className="text-2xl font-semibold mb-4">
            {service.title}
          </h3>

          <p className="text-gray-600 mb-8">
            {service.desc}
          </p>

          <Link
            href="/services"
            className="font-medium inline-flex gap-2 items-center hover:gap-4 transition-all"
          >
            Learn More →
          </Link>

        </motion.div>
      )

    })}

  </div>



  <div className="text-center mt-16">
    <Link
      href="/booking"
      className="bg-black text-white px-8 py-4 rounded-full inline-block hover:scale-105 transition"
    >
      Book Consultation
    </Link>
  </div>

</div>
</section>

<section className="py-28 bg-rose-50">

<div className="max-w-7xl mx-auto px-6">

  <motion.div
    initial={{opacity:0,y:40}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    transition={{duration:.7}}
    className="text-center mb-20"
  >
    <p className="uppercase tracking-[4px] text-sm text-gray-500 mb-4">
      Testimonials
    </p>

    <h2 className="text-5xl font-bold mb-6">
      Loved By Our Clients
    </h2>

    <p className="max-w-2xl mx-auto text-gray-600">
      Real experiences from clients who trust us
      for advanced skin treatments.
    </p>
  </motion.div>


  <div className="grid md:grid-cols-3 gap-8">

    {[
      {
        name:"Aarav Sharma",
        image:"https://i.pravatar.cc/150?img=12",
        review:"Amazing experience. The staff was professional and my laser results were incredible."
      },
      {
        name:"Priya Mehta",
        image:"https://i.pravatar.cc/150?img=32",
        review:"Luxury feel, expert doctors and smooth booking process. Highly recommended."
      },
      {
        name:"Neha Kapoor",
        image:"https://i.pravatar.cc/150?img=47",
        review:"Skin rejuvenation treatment transformed my skin. Beautiful clinic too."
      }

    ].map((item,i)=>(

      <motion.div
        key={i}
        initial={{opacity:0,y:60}}
        whileInView={{opacity:1,y:0}}
        viewport={{once:true}}
        transition={{
          duration:.6,
          delay:i*.15
        }}
        whileHover={{
          y:-12
        }}
        className="bg-white rounded-[30px] p-8 shadow-sm hover:shadow-2xl transition"
      >

        <div className="flex gap-1 mb-6">
          {[...Array(5)].map((_,index)=>(
            <Star
              key={index}
              size={18}
              fill="currentColor"
            />
          ))}
        </div>

        <p className="text-gray-600 leading-8 mb-8">
          “{item.review}”
        </p>

        <div className="flex items-center gap-4">

          <img
            src={item.image}
            alt={item.name}
            className="w-14 h-14 rounded-full object-cover"
          />

          <div>
            <h4 className="font-semibold">
              {item.name}
            </h4>

            <p className="text-sm text-gray-500">
              Verified Client
            </p>
          </div>

        </div>

      </motion.div>

    ))}

  </div>

</div>
</section>


{/* Booking Process Timeline */}

<section className="py-28 bg-white">

<div className="max-w-7xl mx-auto px-6">

  <motion.div
    initial={{opacity:0,y:40}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    transition={{duration:.7}}
    className="text-center mb-20"
  >
    <p className="uppercase tracking-[4px] text-sm text-gray-500 mb-4">
      How It Works
    </p>

    <h2 className="text-5xl font-bold mb-6">
      Book In 3 Easy Steps
    </h2>

    <p className="text-gray-600 max-w-2xl mx-auto">
      A smooth appointment experience designed
      around convenience.
    </p>
  </motion.div>


  <div className="grid md:grid-cols-3 gap-10 relative">

    {[
      {
        no:"01",
        title:"Choose Treatment",
        desc:"Browse services and select the treatment you need."
      },

      {
        no:"02",
        title:"Pick Date & Time",
        desc:"Select your preferred consultation slot."
      },

      {
        no:"03",
        title:"Confirm Booking",
        desc:"Receive instant appointment confirmation."
      }

    ].map((step,i)=>(

      <motion.div
        key={i}
        initial={{opacity:0,y:60}}
        whileInView={{opacity:1,y:0}}
        viewport={{once:true}}
        transition={{
          duration:.7,
          delay:i*.2
        }}
        whileHover={{y:-10}}
        className="relative text-center rounded-[32px] p-10 bg-rose-50 hover:shadow-xl transition"
      >

        <div className="text-6xl font-bold text-gray-200 mb-6">
          {step.no}
        </div>

        <h3 className="text-2xl font-semibold mb-4">
          {step.title}
        </h3>

        <p className="text-gray-600 leading-8">
          {step.desc}
        </p>

      </motion.div>

    ))}

  </div>


  <div className="text-center mt-16">
    <Link
      href="/booking"
      className="bg-black text-white px-8 py-4 rounded-full inline-block hover:scale-105 transition"
    >
      Start Booking
    </Link>
  </div>

</div>
</section>


{/* Doctors Section */}


<section className="py-28 bg-gradient-to-b from-white to-rose-50">

<div className="max-w-7xl mx-auto px-6">

  {/* Heading */}
  <motion.div
    initial={{opacity:0,y:40}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    transition={{duration:.7}}
    className="text-center mb-20"
  >
    <p className="uppercase tracking-[4px] text-sm text-gray-500 mb-4">
      Our Specialists
    </p>

    <h2 className="text-5xl font-bold mb-6">
      Meet Our Experts
    </h2>

    <p className="text-gray-600 max-w-2xl mx-auto">
      Experienced skin specialists delivering
      personalized advanced treatments.
    </p>
  </motion.div>



  <div className="grid md:grid-cols-3 gap-10">

   {[
     {
      name:"Dr. Aisha Sharma",
      role:"Dermatologist",
      exp:"12+ Years",
      image:"https://images.unsplash.com/photo-1559839734-2b71ea197ec2"
     },

     {
      name:"Dr. Rahul Mehta",
      role:"Laser Specialist",
      exp:"10+ Years",
      image:"https://images.unsplash.com/photo-1612349317150-e413f6a5b16d"
     },

     {
      name:"Dr. Neha Kapoor",
      role:"Skin Expert",
      exp:"8+ Years",
      image:"https://images.unsplash.com/photo-1594824476967-48c8b964273f"
     }

   ].map((doctor,i)=>(

    <motion.div
      key={i}
      initial={{opacity:0,y:60}}
      whileInView={{opacity:1,y:0}}
      viewport={{once:true}}
      transition={{
        duration:.7,
        delay:i*.2
      }}
      whileHover={{
        y:-12
      }}
      className="group bg-white rounded-[34px] overflow-hidden shadow-sm hover:shadow-2xl transition"
    >

      {/* Image */}
      <div className="overflow-hidden relative">
        <motion.img
          whileHover={{scale:1.08}}
          transition={{duration:.5}}
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-[430px] object-cover"
        />

        {/* Floating badge */}
        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-medium shadow">
          {doctor.exp}
        </div>
      </div>


      {/* Content */}
      <div className="p-8">

        <h3 className="text-2xl font-semibold mb-2">
          {doctor.name}
        </h3>

        <p className="text-gray-500 mb-6">
          {doctor.role}
        </p>


        <div className="flex gap-2 flex-wrap mb-8">

          <span className="px-4 py-2 rounded-full bg-rose-50 text-sm">
            Aesthetic Care
          </span>

          <span className="px-4 py-2 rounded-full bg-rose-50 text-sm">
            Consultation
          </span>

        </div>


        <Link
          href="/booking"
          className="inline-block bg-black text-white px-6 py-3 rounded-full hover:scale-105 transition"
        >
          Book With Doctor
        </Link>

      </div>

    </motion.div>

   ))}

  </div>


  <div className="text-center mt-16">
    <Link
      href="/doctors"
      className="border px-8 py-4 rounded-full hover:bg-white transition"
    >
      View All Specialists
    </Link>
  </div>


</div>
</section>


{/* Before / After Section */}



<section className="py-28 bg-white">

<div className="max-w-7xl mx-auto px-6">

  {/* Heading */}
  <motion.div
    initial={{opacity:0,y:40}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    transition={{duration:.7}}
    className="text-center mb-20"
  >
    <p className="uppercase tracking-[4px] text-sm text-gray-500 mb-4">
      Transformations
    </p>

    <h2 className="text-5xl font-bold mb-6">
      Real Before & After Results
    </h2>

    <p className="max-w-2xl mx-auto text-gray-600">
      Visible improvements from personalized
      advanced treatments.
    </p>
  </motion.div>



<div className="grid md:grid-cols-2 gap-12">

{[
 {
   treatment:"Acne Treatment",
   before:"https://images.unsplash.com/photo-1494790108377-be9c29b29330",
   after:"https://images.unsplash.com/photo-1488426862026-3ee34a7d66df"
 },

 {
   treatment:"Skin Rejuvenation",
   before:"https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
   after:"https://images.unsplash.com/photo-1544005313-94ddf0286df2"
 }

].map((item,i)=>(

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
 className="bg-rose-50 rounded-[36px] p-8 shadow-sm hover:shadow-2xl transition"
>

<h3 className="text-3xl font-semibold mb-8">
 {item.treatment}
</h3>


<div className="grid grid-cols-2 gap-6">

{/* BEFORE */}
<div>
<p className="mb-4 font-medium">
Before
</p>

<div className="overflow-hidden rounded-3xl">
<motion.img
 whileHover={{scale:1.06}}
 transition={{duration:.5}}
 src={item.before}
 alt="before"
 className="h-[340px] w-full object-cover"
/>
</div>

</div>


{/* AFTER */}
<div>
<p className="mb-4 font-medium">
After
</p>

<div className="overflow-hidden rounded-3xl">
<motion.img
 whileHover={{scale:1.06}}
 transition={{duration:.5}}
 src={item.after}
 alt="after"
 className="h-[340px] w-full object-cover"
/>
</div>

</div>

</div>


<div className="flex gap-6 mt-8 flex-wrap">

<div className="bg-white px-5 py-3 rounded-full shadow-sm">
95% Improvement
</div>

<div className="bg-white px-5 py-3 rounded-full shadow-sm">
8 Sessions
</div>

</div>

</motion.div>

))}

</div>


{/* Bottom CTA */}
<motion.div
 initial={{opacity:0,y:40}}
 whileInView={{opacity:1,y:0}}
 viewport={{once:true}}
 transition={{duration:.7}}
 className="mt-20 text-center"
>

<h3 className="text-4xl font-bold mb-6">
Start Your Transformation Today
</h3>

<Link
 href="/booking"
 className="bg-black text-white px-8 py-4 rounded-full inline-block hover:scale-105 transition"
>
Book Consultation
</Link>

</motion.div>


</div>
</section>

{/* FAQ Section */}

<section className="py-24 bg-rose-50">
  <div className="max-w-4xl mx-auto px-6">

    <div className="text-center mb-16">
      <p className="uppercase tracking-[4px] text-sm text-gray-500 mb-4">
        FAQ
      </p>

      <h2 className="text-5xl font-bold mb-6">
        Frequently Asked Questions
      </h2>

      <p className="text-gray-600">
        Everything you may want to know before booking.
      </p>
    </div>


    <div className="space-y-5">

      {[
        {
          question:"How do I book an appointment?",
          answer:"Choose a treatment, select a slot and confirm online."
        },

        {
          question:"Do you offer consultation first?",
          answer:"Yes, every client receives a consultation before treatment."
        },

        {
          question:"How many laser sessions are needed?",
          answer:"Usually multiple sessions depending on treatment area."
        },

        {
          question:"Are treatments safe for sensitive skin?",
          answer:"Yes, treatments are customized for your skin type."
        }

      ].map((faq,index)=>(

        <div
          key={index}
          className="bg-white rounded-3xl shadow-sm"
        >

          <button
            onClick={() =>
              setOpenFaq(
                openFaq === index ? null : index
              )
            }
            className="w-full p-8 flex justify-between items-center text-left"
          >

            <h3 className="text-xl font-semibold">
              {faq.question}
            </h3>

            <ChevronDown
              className={`transition-transform duration-300 ${
                openFaq === index ? "rotate-180" : ""
              }`}
            />

          </button>


          {openFaq === index && (
            <div className="px-8 pb-8 text-gray-600 leading-8">
              {faq.answer}
            </div>
          )}

        </div>

      ))}

    </div>



    <div className="text-center mt-14">
      <Link
        href="/booking"
        className="bg-black text-white px-8 py-4 rounded-full inline-block"
      >
        Book Consultation
      </Link>
    </div>


  </div>
</section>



<Footer />
    </main>
  );
}