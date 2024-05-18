import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/app/context/NextAuthProvider";
import Nav from "@/components/nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Exploitation",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`h-screen ${inter.className} bg-background bg-light-gray bg-back-pattern bg-cover bg-fixed bg-center bg-no-repeat font-light`}
      >
        <NextAuthProvider>
          <Nav />
          <main>{children}</main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
