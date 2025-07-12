import "./globals.css";
import { HeroUIProvider } from "@heroui/react";
import { ToastContainer } from "react-toastify";
export const metadata = {
  title: "POSPro",
  description: "A modern POS solution for seamless business operations",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <ToastContainer position="top-center" />
          <HeroUIProvider>
            {children}
          </HeroUIProvider>
      </body>
    </html>
  );
}


