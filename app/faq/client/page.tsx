"use client";

import Link from "next/link";
import { useState } from "react";

const items = [
  {
    q: "VIALOCAL은 어떤 서비스인가요?",
    a: "글로벌 진출 브랜드가 현업 실무 전문가와 1:1로 연결되어 실전 자문을 받는 플랫폼입니다. 1시간의 상담으로 수개월의 시행착오를 단축할 수 있습니다.",
  },
  {
    q: "자문 매칭 및 결제는 어떻게 진행되나요?",
    a: "고객님의 니즈에 적합한 전문가가 확인되면, 등록하신 연락처로 전문가 프로필을 전달해 드립니다. 자문 진행이 확정되면 안내해 드리는 비아로컬 지정 계좌로 입금해 주시면 매칭 절차가 최종 완료됩니다.",
  },
  {
    q: "상담은 어떤 방식으로 이뤄지나요?",
    a: "1) 음성 상담: 예약 확정 시 서로의 개인 번호가 공개되며 직접 통화로 진행됩니다. 2) 화상 상담: 제공되는 Zoom 또는 Teams 전용 링크로 진행됩니다.",
  },
  {
    q: "상담 가격은 어떻게 결정되나요?",
    a: "전문가의 경력, 연차, 분야의 희소성을 종합 검토합니다. 시장 평균 단가를 기준으로 전문가와 협의하여 합리적으로 설정되며, 조율될 수 있습니다.",
  },
  {
    q: "환불 및 취소 규정은?",
    a: "24시간 전 취소 시 전액 환불되며, 그 이후는 정책에 따라 일부 공제되거나 환불이 불가할 수 있습니다.",
  },
  {
    q: "결제 방식은 무엇이 있나요?",
    a: "현재 무통장 입금(계좌이체) 방식을 지원하고 있습니다. 입금 확인 시 고객님의 요청에 따라 기업 고객을 위한 세금계산서 또는 개인 고객용 현금영수증을 즉시 발행해 드립니다.",
  },
];

const tabs = [
  { label: "클라이언트용", href: "/faq/client" },
  { label: "자문위원용", href: "/faq/advisor" },
  { label: "공통 FAQ", href: "/faq/common" },
];

export default function FaqClientPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <main className="min-h-screen bg-white">
      {/* 헤더 */}
      <section className="border-b border-slate-200 bg-[#f0f4f8] pt-24 pb-14">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">FAQ</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">자주 묻는 질문</h1>
          <p className="mt-3 text-slate-500">궁금한 점을 빠르게 확인하세요.</p>

          {/* 탭 */}
          <div className="mt-8 flex gap-2 flex-wrap">
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  tab.href === "/faq/client"
                    ? "bg-blue-600 text-white"
                    : "border border-slate-300 bg-white text-slate-600 hover:border-blue-400 hover:text-blue-600"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 아코디언 */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <dl>
            {items.map((item, idx) => (
              <div key={idx} className="border-t border-slate-200 last:border-b">
                <button
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  onClick={() => toggle(idx)}
                  aria-expanded={openIndex === idx}
                >
                  <span className="text-base font-medium text-slate-900">{item.q}</span>
                  <svg
                    className={`h-5 w-5 flex-shrink-0 text-slate-400 transition-transform duration-300 ${
                      openIndex === idx ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    openIndex === idx ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <dd className="pb-5 text-sm leading-relaxed text-slate-500">{item.a}</dd>
                  </div>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
