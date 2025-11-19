"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "/public/Images/Logo.svg";

export default function Page() {
  const router = useRouter();
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Signing in as ${role === "admin" ? "Admin" : "Super Admin"}`);
    console.log(`Email: ${email}`);

    // Redirect both roles to same page
    router.push("/admindashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-10">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image src={Logo} alt="Logo" width={100} height={100} priority />
        </div>

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">MENIO</h1>
        <h2 className="text-xl font-semibold text-center text-gray-800">Welcome Back</h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Sign in to access your admin dashboard
        </p>

        {/* Role Toggle */}
        <div className="relative bg-gray-100 rounded-xl p-1 flex mb-8">
          <div
            className={`absolute top-1 bottom-1 w-1/2 rounded-lg transition-all duration-300 ${
              role === "admin"
                ? "translate-x-0 bg-blue-600"
                : "translate-x-full bg-blue-600"
            }`}
          />
          <button
            type="button"
            className={`flex-1 z-10 py-2 font-semibold text-sm rounded-lg transition-all ${
              role === "admin" ? "text-white" : "text-gray-600"
            }`}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>
          <button
            type="button"
            className={`flex-1 z-10 py-2 font-semibold text-sm rounded-lg transition-all ${
              role === "superadmin" ? "text-white" : "text-gray-600"
            }`}
            onClick={() => setRole("superadmin")}
          >
            Super Admin
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1 text-sm">
              Email address
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">📧</span>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@menio.com"
                required
                className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              />
            </div>
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1 text-sm">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">🔒</span>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex justify-between items-center text-sm mb-6">
            <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-blue-600 cursor-pointer" />
              Remember me
            </label>
            <a href="#" className="text-blue-600 font-semibold hover:text-blue-800 transition-colors">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 font-semibold text-white rounded-lg transition-all transform hover:scale-[1.02] bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg"
          >
            <span>➡️</span> Sign in to Dashboard
          </button>

        </form>
      </div>
    </div>
  );
}
