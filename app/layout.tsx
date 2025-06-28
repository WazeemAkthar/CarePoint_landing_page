import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CarePoint - Quick Healthcare Booking",
  description:
    " Quick Healthcare Booking across multiple hospitals with CarePoint. Book doctor appointments easily and skip the queues.",
  generator: "Next.js",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
