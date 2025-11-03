import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Location Tracker",
  description: "Track your location in real-time with detailed statistics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
