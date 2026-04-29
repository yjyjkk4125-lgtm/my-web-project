import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import InquiryModal from "@/components/InquiryModal";
import Footer from "@/components/Footer";
import { ModalProvider } from "@/context/ModalContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteDescription =
  "비아로컬은 K-뷰티 브랜드의 성공적인 글로벌 성장을 돕습니다. 국가별 인증 및 규제 대응부터 이커머스 입점, 인플루언서 시딩, 마케팅, 오프라인 팝업, 투자 유치까지 해외 진출 전 과정의 고민을 해결해 드립니다. 실전 경험이 풍부한 글로벌 전문가와 1:1 상담을 통해 브랜드 맞춤형 성장 전략을 수립하고 실패 없는 해외 사업을 시작하세요.";

export const metadata: Metadata = {
  title: "VIALOCAL | 전문가의 실무 자문으로 완성하는 K-뷰티 비즈니스",
  description: siteDescription,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "VIALOCAL | K-뷰티 브랜드 실무 자문 플랫폼",
    description: siteDescription,
    url: "https://vialocal.vercel.app",
    siteName: "VIALOCAL",
    locale: "ko_KR",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: "VIALOCAL",
  url: "https://vialocal.vercel.app",
  description: siteDescription,
  // logo: "https://vialocal.vercel.app/logo.png",  ← 로고 이미지 추가 시 주석 해제
  areaServed: "Global",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "K-beauty Export Consulting",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "K-beauty Export Consulting",
          description:
            "국가별 인증·규제 대응, 이커머스 입점, 인플루언서 시딩, 마케팅, 오프라인 팝업, 투자 유치 등 해외 진출 전 과정 자문",
        },
      },
    ],
  },
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50">
        <ModalProvider>
          <Navbar />
          {children}
          <Footer />
          <InquiryModal />
        </ModalProvider>
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-RY1QG9ZKYN"
        />
        <Script
          id="google-analytics-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-RY1QG9ZKYN');`,
          }}
        />
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "wglkaww5gw");`,
          }}
        />
      </body>
    </html>
  );
}
