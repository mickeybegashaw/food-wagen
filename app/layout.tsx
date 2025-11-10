import type { Metadata } from "next";
import { 
  Source_Sans_3, 
} from 'next/font/google'; 
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sourceSansPro = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans-pro',
  weight: ['300', '400', '600', '700'], 
  style: ['normal', 'italic' ], 
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Food Wagen",
  description: "A simple food items management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sourceSansPro.variable} font-sans antialiased`}
      >
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}