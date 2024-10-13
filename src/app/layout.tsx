import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./lib/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "300 700", // Adjusted weights for a cleaner look
});
const geistMono = localFont({
  src: "./lib/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "300 700", // Adjusted weights for consistency
});

export const metadata: Metadata = {
  title: "Minimalist Design App",
  description: "A clean and minimalist application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-gray-800 overflow-x-clip`} // Subtle background and text colors
      >
        <main className="max-w-4xl mx-auto p-4 sm:p-16 md:p-4"> {/* Centering the content with padding */}
          {children}
        </main>
      </body>
    </html>
  );
}
