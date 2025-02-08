"use client";
import "@styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <body className="antialiased">
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
