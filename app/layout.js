// app/layout.js
'use client';
import { usePathname } from 'next/navigation';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  
  // Pages jahan header-footer NAHI chahiye
  const noLayoutPages = ['/startingadmin','/admin','/teamrole','/addteam','/team','/clinics'];
  const showLayout = !noLayoutPages.includes(pathname);

  return (
    <html lang="en">
      <head>
        <title>men10</title>
        <meta name="description" content="men10" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {showLayout && <Navbar />}
        {children}
        {showLayout && <Footer />}
      </body>
    </html>
  );
}