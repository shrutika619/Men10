// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import LoginModal from "./auth/LoginModal";
"use client";

import React, { useState } from "react";
import Link from "next/link";
import LoginModal from "@/components/auth/LoginModal";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false); // 👈 state for modal

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  };

  // ✅ Mapping for SEO-friendly URLs but Windows-safe folders
  const conditionLinks = {
    "Sexual Dysfunction": "sexual-dysfunction",
    "Erectile Dysfunction": "erectile-dysfunction",
    "Premature Ejaculation": "premature-ejaculation", // URL
    "Delayed Ejaculation": "delayed-ejaculation",
    "Couple Sex Problems": "couple-sex-problems",
    "Low Sperm Count": "low-sperm-count",
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2"
            onClick={closeDropdown}
          >
            <img
              src="/Images/Logo.svg"
              alt="MEN10 Logo"
              className="h-[50px] w-[166px]"
            />
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
            <li>
              <Link
                href="/"
                className="hover:text-blue-600"
                onClick={closeDropdown}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-blue-600"
                onClick={closeDropdown}
              >
                About Us
              </Link>
            </li>

            {/* Conditions We Treat */}
            <li className="relative flex items-center">
              <button
                onClick={() => toggleDropdown("conditions")}
                className="hover:text-blue-600 flex items-center"
              >
                Conditions We Treat ▾
              </button>

              {openDropdown === "conditions" && (
                <ul className="absolute top-full left-0 mt-2 w-64 bg-[#F3F6FF] shadow-lg rounded-lg py-2 text-black z-50">
                  {Object.entries(conditionLinks).map(([label, path], index) => (
                    <li key={index}>
                      <Link
                        href={`/conditionswetreat/${path}`}
                        className="block px-4 py-2 hover:text-blue-600"
                        onClick={closeDropdown}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Clinics */}
            <li className="relative flex items-center">
              <button
                onClick={() => toggleDropdown("clinics")}
                className="hover:text-blue-600 flex items-center"
              >
                Clinics ▾
              </button>

              {openDropdown === "clinics" && (
                <ul className="absolute top-full left-0 mt-2 w-48 bg-[#F3F6FF] shadow-lg rounded-lg py-2 text-black z-50">
                  {["Nagpur", "Pune", "Kolhapur", "Nashik"].map(
                    (city, index) => (
                      <li key={index}>
                        <Link
                          href={`/clinics/${city.toLowerCase()}`}
                          className="block px-4 py-2 hover:text-blue-600"
                          onClick={closeDropdown}
                        >
                          {city}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              )}
            </li>
          </ul>

          {/* Right Section (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
              E
            </div>
            {/* 👇 Changed Login link to button that opens modal */}
            <button
              onClick={() => setLoginOpen(true)}
              className="text-gray-700 hover:text-blue-600"
            >
              Login
            </button>
            <Link
              href="/start"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              onClick={closeDropdown}
            >
              Start Now
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg px-6 py-4 space-y-4">
            <Link
              href="/"
              className="block hover:text-blue-600"
              onClick={closeDropdown}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block hover:text-blue-600"
              onClick={closeDropdown}
            >
              About Us
            </Link>

            {/* Mobile Dropdowns */}
            <div>
              <button
                className="w-full text-left hover:text-blue-600 flex justify-between items-center"
                onClick={() => toggleDropdown("conditions")}
              >
                Conditions We Treat ▾
              </button>
              {openDropdown === "conditions" && (
                <ul className="mt-2 space-y-2 pl-4 bg-[#F3F6FF] rounded-lg py-2 text-black">
                  {Object.entries(conditionLinks).map(([label, path], index) => (
                    <li key={index}>
                      <Link
                        href={`/conditionswetreat/${path}`}
                        className="block hover:text-blue-600"
                        onClick={closeDropdown}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <button
                className="w-full text-left hover:text-blue-600 flex justify-between items-center"
                onClick={() => toggleDropdown("clinics")}
              >
                Clinics ▾
              </button>
              {openDropdown === "clinics" && (
                <ul className="mt-2 space-y-2 pl-4 bg-[#F3F6FF] rounded-lg py-2 text-black">
                  {["Nagpur", "Pune", "Kolhapur", "Nashik"].map((city, index) => (
                    <li key={index}>
                      <Link
                        href={`/clinics/${city.toLowerCase()}`}
                        className="block hover:text-blue-600"
                        onClick={closeDropdown}
                      >
                        {city}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Mobile Right Section */}
            <div className="pt-4 border-t space-y-2">
              {/* 👇 Changed Login link to modal trigger */}
              <button
                onClick={() => {
                  closeDropdown();
                  setLoginOpen(true);
                }}
                className="block hover:text-blue-600"
              >
                Login
              </button>
              <Link
                href="/start"
                className="block px-4 py-2 rounded-lg bg-blue-600 text-white font-medium text-center hover:bg-blue-700 transition"
                onClick={closeDropdown}
              >
                Start Now
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* 👇 Render Login Modal */}
      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
    </>
  );
};

export default Navbar;
