import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TODO LIST",
  description: "Store your daily reminders and notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-primary`}>{children}</body>
    </html>
  );
}
