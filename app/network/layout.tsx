import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VIALOCAL | 검증된 K-뷰티 실무 전문가 네트워크",
  description:
    "브랜드 운영, 제품 개발, 유통, 마케팅, 해외 진출까지. 30+ 검증된 실무 전문가 네트워크를 통해 현재 상황에 맞는 전문가와 연결됩니다.",
};

export default function NetworkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
