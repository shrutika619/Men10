"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAllCities } from "@/app/services/clinic.service";

// Icons
import { User, LogOut } from "lucide-react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { selectUserRole, logoutSuccess } from "@/redux/slices/authSlice";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // User Role
  const role = useSelector(selectUserRole);

  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const conditionsDropdownRef = useRef(null);
  const clinicDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);

  const [clinicLinks, setClinicLinks] = useState({});

  const toggleDropdown = (menu) =>
    setOpenDropdown(openDropdown === menu ? null : menu);

  const closeDropdown = () => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  };

  // Click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !conditionsDropdownRef.current?.contains(event.target) &&
        !clinicDropdownRef.current?.contains(event.target) &&
        !profileDropdownRef.current?.contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const conditionLinks = {
    "Sexual Dysfunction": "sexual-dysfunction",
    "Erectile Dysfunction": "erectile-dysfunction",
    "Premature Ejaculation": "premature-ejaculation",
    "Delayed Ejaculation": "delayed-ejaculation",
    "Couple Sex Problems": "couple-sex-problems",
    "Low Sperm Count": "low-sperm-count",
  };

  // Fetch Cities
  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const response = await getAllCities();
        if (response?.success && Array.isArray(response?.data)) {
          const formattedLinks = response.data.reduce((acc, city) => {
            acc[city.name] = city.name.toLowerCase();
            console.log(city._id ,"and", city.name)
            return acc;
          }, {});
          setClinicLinks(formattedLinks);
        }
      } catch (error) {
        console.error("Failed to fetch cities", error);
      }
    };
    fetchCityData();
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      dispatch(logoutSuccess());
      closeDropdown();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" onClick={closeDropdown}>
          <img
            src="/Images/MEN10.svg"
            alt="MEN10 Logo"
            className="h-[50px] w-[122px]"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-medium text-gray-700">
          <li>
            <Link href="/" onClick={closeDropdown} className="hover:text-blue-600">
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/about"
              onClick={closeDropdown}
              className="hover:text-blue-600"
            >
              About Us
            </Link>
          </li>

          {/* Conditions */}
          <li ref={conditionsDropdownRef} className="relative">
            <button
              onClick={() => toggleDropdown("conditions")}
              className="hover:text-blue-600"
            >
              Conditions We Treat ▾
            </button>
            {openDropdown === "conditions" && (
              <ul className="absolute left-0 mt-2 w-64 bg-[#F3F6FF] rounded-lg shadow-lg py-2">
                {Object.entries(conditionLinks).map(([label, path]) => (
                  <li key={path}>
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

          {/* Clinic */}
          <li ref={clinicDropdownRef} className="relative">
            <button
              onClick={() => toggleDropdown("clinic")}
              className="hover:text-blue-600"
            >
              Clinic ▾
            </button>
            {openDropdown === "clinic" && (
              <ul className="absolute left-0 mt-2 w-64 bg-[#F3F6FF] rounded-lg shadow-lg py-2">
                {Object.entries(clinicLinks).map(([label, path]) => (
                  <li key={path}>
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
        <div className="hidden md:flex items-center gap-4">
          {/* Profile / Login */}
          {role ? (
            <div ref={profileDropdownRef} className="relative">
              <button
                onClick={() => toggleDropdown("profile")}
                className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-200"
              >
                <User size={20} className="text-blue-600" />
              </button>

              {openDropdown === "profile" && (
                <ul className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2">
                  <li>
                    <Link
                      href="/profile"
                      onClick={closeDropdown}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link href="/login" onClick={closeDropdown} className="hover:text-blue-600">
              Login
            </Link>
          )}

          <Link
            href="/free-consultation"
            onClick={closeDropdown}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Start Now
          </Link>
        </div>

        {/* Mobile Button */}
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
          <ul className="flex flex-col gap-3 px-6 py-4 font-medium">
            <Link href="/" onClick={closeDropdown}>Home</Link>
            <Link href="/about" onClick={closeDropdown}>About Us</Link>

            {role ? (
              <button onClick={handleLogout} className="text-red-600 text-left">
                Logout
              </button>
            ) : (
              <Link href="/login" onClick={closeDropdown}>Login</Link>
            )}

            <Link
              href="/free-consultation"
              onClick={closeDropdown}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center"
            >
              Start Now
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
