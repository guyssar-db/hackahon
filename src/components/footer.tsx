"use client";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-linear-to-r from-cyan-500 to-blue-600 p-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        <p className="text-sm text-white">
          © {new Date().getFullYear()} Website. All rights reserved.
        </p>

        <div className="flex gap-6">
          <Link
            href="/about"
            className="text-sm text-white hover:underline transition"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm text-white hover:underline transition"
          >
            Contact
          </Link>
          <Link
            href="/privacy"
            className="text-sm text-white hover:underline transition"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
      <div className="flex sm:hidden h-[85px]"></div>
    </footer>
  );
};

export default Footer;
