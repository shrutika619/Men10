



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
  
  // NO HEDER/FOOTER FOR THE FOLLOWING PAGES
  const noLayoutPages = ['/startingadmin','/admin','/teamrole','/addteam','/team','/clinics','/joinnow','/partnershipprogram','/reviewform','/hospitaldashboard','/add-doctor','/doctors','/timetable','/dashboard','/loginadmin','/super-admin', 
    '/admin/admindashboard',"/admin/inquirydirect","/admin/inclinicconsultation","/admin/teleconsultation","/admin/clinic","/admin/setup","/admin/auditlogs","/admin/team"];
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

