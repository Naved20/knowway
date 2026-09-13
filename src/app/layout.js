import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://knowvy.tech"),
  title: {
    default: "Knowvy — Where Students Build What's Next",
    template: "%s | Knowvy",
  },
  description:
    "Knowvy connects students, developers, creators and founders through technology, events, communities and real-world opportunities.",
  keywords: [
    "Knowvy",
    "Student Developer Community",
    "Bhopal Tech Community",
    "Hack-Knowvy",
    "Student Hackathons",
    "Azure Tech Group Bhopal",
    "MLSA",
    "Open Source India",
  ],
  authors: [{ name: "Mohneesh Gupta" }, { name: "Naved Mansoori" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://knowvy.tech",
    siteName: "Knowvy",
    title: "Knowvy — Where Students Build What's Next",
    description:
      "Central India's leading student technology ecosystem connecting developers, founders, and creators.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#07090D] text-white font-body antialiased flex flex-col selection:bg-[#4D8DFF]/30 selection:text-white">
        <SmoothScrollProvider>
          <CustomCursor />
          <Navbar />
          <div className="flex-1 w-full">{children}</div>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
