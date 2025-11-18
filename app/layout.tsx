import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WanderLens - Smart Travel Planning",
  description: "Intelligent flight, hotel, and itinerary planning platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
