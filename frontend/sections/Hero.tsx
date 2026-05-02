"use client"

import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section className="h-screen flex flex-col justify-center items-center bg-black text-white">

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl font-bold"
      >
        Hi I'm Pavan 👋
      </motion.h1>

      <p className="text-gray-400 mt-4">
       
      </p>

    </section>
  )
}