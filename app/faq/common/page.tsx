"use client";

import Link from "next/link";
import { useState } from "react";

const items = [
  {
    q: "상담은 어떤 방식으로 이뤄지나요?",
    a: "1) 음성 상담: 예약 확정 시 서로의 개인 번호가 공개되며 직접 통화로 진행됩니다. 2) 화상 상담: 제공되는 Zoom 또는 Teams 전용 링크로 진행됩니다.",
  },
  {
    q: "비즈니스 협업 가교 역할은?",
    a: "단순 자문을 넘어 총판 계약이나 파트너십이 필요한 경우 VIALOCAL이 양측을 조율하여 실제 비즈니스가 성사되도록 돕습니다.",
  },
  {
    q: "고객센터 문의는?",
    a: "사이트 우측 상단 '문의하기'를 이용하셔서 문의해주세요.",
  },
];

const tabs = [
  { label: "클라이언트용", href: "/faq/client" },
  { label: "자문위원용", href: "/faq/advisor" },
  { label: "공통 FAQ", href: "/faq/common" },
];

export default function FaqCommonPage() {
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
                  tab.href === "/faq/common"
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
