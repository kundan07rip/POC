import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "POC — Peace Over Coffee | Best Café in Shastri Nagar, Bhilwara",
  description: "POC (Peace Over Coffee) — Premium café in Bhilwara. Hot coffee, cold brews, pizzas, burgers, momos and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-coffee-900 text-white font-sans">
        {children}
      </body>
    </html>
  );
}
