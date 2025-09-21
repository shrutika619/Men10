"use client";
import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = (menu) => setOpenDropdown(openDropdown === menu ? null : menu);
  const closeDropdown = () => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  };

  const conditionLinks = {
    "Sexual Dysfunction": "sexual-dysfunction",
    "Erectile Dysfunction": "erectile-dysfunction",
    "Premature Ejaculation": "premature-ejaculation",
    "Delayed Ejaculation": "delayed-ejaculation",
    "Couple Sex Problems": "couple-sex-problems",
    "Low Sperm Count": "low-sperm-count",
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center space-x-2" onClick={closeDropdown}>
          <img src="/Images/Logo.svg" alt="MEN10 Logo" className="h-[50px] w-[166px]" />
        </Link>

        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <li>
            <Link href="/" className="hover:text-blue-600" onClick={closeDropdown}>Home</Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-blue-600" onClick={closeDropdown}>About Us</Link>
          </li>
          <li className="relative flex items-center">
            <button onClick={() => toggleDropdown("conditions")} className="hover:text-blue-600 flex items-center">
              Conditions We Treat ▾
            </button>
            {openDropdown === "conditions" && (
              <ul className="absolute top-full left-0 mt-2 w-64 bg-[#F3F6FF] shadow-lg rounded-lg py-2 text-black z-50">
                {Object.entries(conditionLinks).map(([label, path], index) => (
                  <li key={index}>
                    <Link href={`/conditionswetreat/${path}`} className="block px-4 py-2 hover:text-blue-600" onClick={closeDropdown}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>

        {/* Right Section Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login" className="text-gray-700 hover:text-blue-600" onClick={closeDropdown}>Login</Link>
          <Link href="/start" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition" onClick={closeDropdown}>
            Start Now
          </Link>
        </div>

        <button className="md:hidden text-2xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>☰</button>
      </div>
    </nav>
  );
};

export default Navbar;
