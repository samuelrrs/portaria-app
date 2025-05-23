import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DefaultLayout from "@/components/DefaultLayout/DefaultLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sistema de Portaria",
  description: "Controle de entrada e saída",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DefaultLayout>{children}</DefaultLayout>
      </body>
    </html>
  );
}
