import localFont from "next/font/local";
import "./globals.css";
import { HeroUIProvider } from "@heroui/react";
import { ToastContainer } from "react-toastify";

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
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ToastContainer />
        <HeroUIProvider>
          {children}
        </HeroUIProvider>
      </body>
    </html>
  );
}