import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import InquiryModal from "@/components/InquiryModal";
import Footer from "@/components/Footer";
import { ModalProvider } from "@/context/ModalContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VIALOCAL | K-뷰티 브랜드 실무 자문 플랫폼",
  description:
    "K-뷰티 브랜드사의 해외 진출과 브랜드 전략을 전문가와 1시간 1:1 전화 자문으로 해결합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50">
        <ModalProvider>
          <Navbar />
          {children}
          <Footer />
          <InquiryModal />
        </ModalProvider>
      </body>
    </html>
  );
}
