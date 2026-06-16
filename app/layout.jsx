import { Raleway } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header"

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${raleway.className}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}