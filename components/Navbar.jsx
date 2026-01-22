"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { getAllCities } from "@/app/services/clinic.service";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const conditionsDropdownRef = useRef(null);
  const clinicDropdownRef = useRef(null);
  const [clinicLinks, setClinicLinks] = useState({});

  const toggleDropdown = (menu) =>
    setOpenDropdown(openDropdown === menu ? null : menu);
  
  const closeDropdown = () => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  };

  // ✅ Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedInsideConditions = conditionsDropdownRef.current?.contains(event.target);
      const clickedInsideClinic = clinicDropdownRef.current?.contains(event.target);
      
      if (!clickedInsideConditions && !clickedInsideClinic) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const conditionLinks = {
    "Sexual Dysfunction": "sexual-dysfunction",
    "Erectile Dysfunction": "erectile-dysfunction",
    "Premature Ejaculation": "premature-ejaculation",
    "Delayed Ejaculation": "delayed-ejaculation",
    "Couple Sex Problems": "couple-sex-problems",
    "Low Sperm Count": "low-sperm-count",
  };

useEffect(() => {
    const fetchCityData = async () => {
      const response = await getAllCities();

      if (response?.success && Array.isArray(response?.data)) {
        
        const formattedLinks = response.data.reduce((acc, city) => {
          acc[city.name] = city.name.toLowerCase(); 
          return acc;
        }, {});

        setClinicLinks(formattedLinks);
      }
    };

    fetchCityData();
  }, []);
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2" onClick={closeDropdown}>
          <img
            src="/Images/MEN10.svg"
            alt="MEN10 Logo"
            className="h-[50px] w-[122px]"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <li>
            <Link href="/" onClick={closeDropdown} className="hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" onClick={closeDropdown} className="hover:text-blue-600">
              About Us
            </Link>
          </li>

          {/* Conditions Dropdown */}
          <li className="relative flex items-center" ref={conditionsDropdownRef}>
            <button
              onClick={() => toggleDropdown("conditions")}
              className="hover:text-blue-600 flex items-center"
            >
              Conditions We Treat ▾
            </button>
            {openDropdown === "conditions" && (
              <ul className="absolute top-full left-0 mt-2 w-64 bg-[#F3F6FF] shadow-lg rounded-lg py-2 z-50">
                {Object.entries(conditionLinks).map(([label, path], index) => (
                  <li key={index}>
                    <Link
                      href={`/conditionswetreat/${path}`}
                      onClick={closeDropdown}
                      className="block px-4 py-2 hover:text-blue-600"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Clinic Dropdown */}
          <li className="relative flex items-center" ref={clinicDropdownRef}>
            <button
              onClick={() => toggleDropdown("clinic")}
              className="hover:text-blue-600 flex items-center"
            >
              Clinic ▾
            </button>
            {openDropdown === "clinic" && (
              <ul className="absolute top-full left-0 mt-2 w-64 bg-[#F3F6FF] shadow-lg rounded-lg py-2 z-50">
                {Object.entries(clinicLinks).map(([label, path], index) => (
                  <li key={index}>
                    <Link
                      href={`/clinic/${path}`}
                      onClick={closeDropdown}
                      className="block px-4 py-2 hover:text-blue-600"
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
          <Link href="/login" onClick={closeDropdown} className="hover:text-blue-600">
            Login
          </Link>

          {/* ✅ START NOW → FREE CONSULTATION */}
          <Link
            href="/free-consultation"
            onClick={closeDropdown}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col space-y-2 px-6 py-4 font-medium">
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

            {/* ✅ MOBILE START NOW */}
            <li>
              <Link
                href="/free-consultation"
                onClick={closeDropdown}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 inline-block"
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