"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/app/lib/AuthContext";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Book", href: "/booking" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Login", href: "/login" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { user, setUser, logout } = useAuth();

  useEffect(() => {
    const syncUser = () => {
      const userData = localStorage.getItem("user");
      setUser(userData ? JSON.parse(userData) : null);
    };

    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
    };
  }, [setUser]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">

      <div className="backdrop-blur-xl bg-white/70 border-b">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            Radiant<span className="text-pink-500">.</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-8 items-center">
            {navLinks
              .filter((item) => item.name !== "Login")
              .map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm transition ${
                    pathname === item.href
                      ? "text-black font-semibold"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

            {/* AUTH SECTION */}
            {user ? (
              <div className="flex items-center gap-4 ml-6">
                   <Link
                href="/profile"
                className="text-sm text-gray-500 hover:text-black"
              > 👤 {user.name}</Link>
                

               <button
onClick={handleLogout}
className="text-sm text-red-500 cursor-pointer hover:text-red-600 transition"
>
Logout
</button>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-sm text-gray-500 hover:text-black"
              >
                Login
              </Link>
            )}
          </nav>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden"
          >
            <Menu />
          </button>

        </div>
      </div>





      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 right-0 w-full h-full bg-black text-white z-50 p-10"
          >

            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6"
            >
              <X size={28} />
            </button>

            {/* Links */}
            <div className="mt-20 flex flex-col gap-8 text-2xl">

              {navLinks
                .filter((item) => item.name !== "Login")
                .map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="hover:text-pink-400 transition"
                  >
                    {item.name}
                  </Link>
                ))}

              {/* AUTH SECTION MOBILE */}
         {user ? (
<div className="flex items-center gap-4 ml-6">

<Link
href="/profile"
className="px-4 py-2 rounded-full bg-black text-white hover:bg-pink-500 transition font-medium flex items-center gap-2"
>
👤 {user.name}
</Link>

<button
onClick={handleLogout}
className="text-sm text-red-500"
>
Logout
</button>

</div>
) : (
<Link
href="/login"
className="text-sm text-gray-500 hover:text-black"
>
Login
</Link>
)}
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}