"use client";

import Link from "next/link";
import { useState } from "react";

const items = [
  {
    q: "자문위원 가입 절차는?",
    a: "[회원가입] → [자문위원 신청] → [이력 제출] → [심사 및 승인(1~3일)] 순입니다.",
  },
  {
    q: "자문료는 어떻게 설정하나요?",
    a: "시장 평균 단가를 참고하여 경력에 부합하는 금액을 설정합니다. 제출하신 이력을 바탕으로 운영팀과 최종 자문료가 조율될 수 있습니다.",
  },
  {
    q: "정산은 언제 되나요?",
    a: "상담 완료 건에 대해 매월 지정된 정산일에 일괄 계좌 이체됩니다.",
  },
  {
    q: "일정 변경이 필요하면?",
    a: "클라이언트에게 직접 연락하여 양해를 구한 뒤 플랫폼 내 기능을 통해 재조정해야 합니다.",
  },
];

const tabs = [
  { label: "클라이언트용", href: "/faq/client" },
  { label: "자문위원용", href: "/faq/advisor" },
  { label: "공통 FAQ", href: "/faq/common" },
];

export default function FaqAdvisorPage() {
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
                  tab.href === "/faq/advisor"
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
