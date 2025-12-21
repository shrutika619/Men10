"use client";
import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = (menu) =>
    setOpenDropdown(openDropdown === menu ? null : menu);
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

  const clinicLinks = {
    "Nagpur": "nagpur",
    "Pune": "pune",
    "Kolhapur": "kolhapur",
    "Nashik": "nashik",
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2" onClick={closeDropdown}>
          <img src="/Images/MEN10.svg" alt="MEN10 Logo" className="h-[50px] w-[122px]" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <li>
            <Link href="/" className="hover:text-blue-600" onClick={closeDropdown}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-blue-600" onClick={closeDropdown}>
              About Us
            </Link>
          </li>
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
          {/* Clinic Dropdown */}
          <li className="relative flex items-center">
            <button
              onClick={() => toggleDropdown("clinic")}
              className="hover:text-blue-600 flex items-center"
            >
              Clinic ▾
            </button>
            {openDropdown === "clinic" && (
              <ul className="absolute top-full left-0 mt-2 w-64 bg-[#F3F6FF] shadow-lg rounded-lg py-2 text-black z-50">
                {Object.entries(clinicLinks).map(([label, path], index) => (
                  <li key={index}>
                    <Link
                      href={`/clinic/${path}`}
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
        </ul>

        {/* Right Section Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login" className="text-gray-700 hover:text-blue-600" onClick={closeDropdown}>
            Login
          </Link>
          <Link
            href="/start"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            onClick={closeDropdown}
          >
            Start Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col space-y-2 px-6 py-4 text-gray-700 font-medium">
            <li>
              <Link href="/" onClick={closeDropdown}>Home</Link>
            </li>
            <li>
              <Link href="/about" onClick={closeDropdown}>About Us</Link>
            </li>
            <li>
              <button
                onClick={() => toggleDropdown("conditions")}
                className="w-full text-left"
              >
                Conditions We Treat ▾
              </button>
              {openDropdown === "conditions" && (
                <ul className="mt-2 pl-4 space-y-2">
                  {Object.entries(conditionLinks).map(([label, path], index) => (
                    <li key={index}>
                      <Link
                        href={`/conditionswetreat/${path}`}
                        onClick={closeDropdown}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            {/* Clinic Dropdown Mobile */}
            <li>
              <button
                onClick={() => toggleDropdown("clinic")}
                className="w-full text-left"
              >
                Clinic ▾
              </button>
              {openDropdown === "clinic" && (
                <ul className="mt-2 pl-4 space-y-2">
                  {Object.entries(clinicLinks).map(([label, path], index) => (
                    <li key={index}>
                      <Link
                        href={`/clinic/${path}`}
                        onClick={closeDropdown}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <Link href="/login" onClick={closeDropdown}>Login</Link>
            </li>
            <li>
              <Link
                href="/start"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                onClick={closeDropdown}
              >
                Start Now
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;