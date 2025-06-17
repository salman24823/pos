import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
<<<<<<< HEAD
=======
import { HeroUIProvider } from "@heroui/react";

>>>>>>> da83004dfafcea1534855f8e3e805d3c5bd1e00f
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "POSPro",
  description: "A modern POS solution for seamless business operations",
};

export default function RootLayout({ children }) {
  return (
<<<<<<< HEAD
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* < Header/> */}
        
        {children}
{/* <Footer/> */}
=======
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <HeroUIProvider>
          {children}
        </HeroUIProvider>
>>>>>>> da83004dfafcea1534855f8e3e805d3c5bd1e00f
      </body>
    </html>
  );
}