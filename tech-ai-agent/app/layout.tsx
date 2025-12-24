import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tech AI Agent",
  description: "Your intelligent tech assistant for programming and software development",
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
