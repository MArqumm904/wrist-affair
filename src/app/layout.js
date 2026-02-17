import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import SmoothScroll from "@/components/layout/SmoothScroll"
import CustomCursor from "@/components/layout/CustomCursor"
import ScrollToTop from "@/components/layout/ScrollToTop"

export const metadata = {
  title: "Wrist Affair – Timeless Luxury Watches",
  description:
    "Discover premium and elegant watches at Wrist Affair. Crafted for those who value timeless style and sophistication.",
  keywords: [
    "Wrist Affair",
    "Luxury Watches",
    "Premium Watches",
    "Men Watches",
    "Women Watches",
  ],
  authors: [{ name: "Wrist Affair" }],
  creator: "Wrist Affair",
  metadataBase: new URL("https://wristaffair.com"),
  openGraph: {
    title: "Wrist Affair",
    description: "Timeless elegance on your wrist. Discover premium watches.",
    url: "https://wristaffair.com",
    siteName: "Wrist Affair",
    type: "website",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#F3F1EA] text-[#1F1F1F] antialiased">
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          {children}
          <ScrollToTop />
        </SmoothScroll>
      </body>
    </html>
  )
}