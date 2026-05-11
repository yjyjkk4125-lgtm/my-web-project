"use client";

import Link from "next/link";
import { useState } from "react";

const items = [
  {
    q: "비아로컬(VIALOCAL)은 어떤 서비스인가요?",
    a: "K-뷰티 브랜드가 실무 경험을 보유한 전문가와 1:1로 연결되어 현재 문제를 점검하고 실행 방향을 논의할 수 있는 자문 플랫폼입니다.",
  },
  {
    q: "어떤 전문가와 연결되나요?",
    a: "브랜드 운영, 해외 진출, 유통, 제조, 마케팅 등 각 분야의 실무 경험을 보유한 전문가와 연결됩니다.",
  },
  {
    q: "전문가를 직접 선택할 수 있나요?",
    a: "현재 상황과 자문 주제에 따라 운영팀이 가장 적합한 전문가를 검토하여 매칭합니다.",
  },
  {
    q: "자문은 어떻게 진행되나요?",
    a: "현재 상황과 주제에 맞는 전문가와 1:1 전화 또는 화상 방식으로 실무 자문이 진행됩니다.",
  },
  {
    q: "자문 비용은 어떻게 되나요?",
    a: "자문 비용은 전문가 경력과 주제에 따라 달라질 수 있으며, 일반적으로 1회 기준 10만 원대~수십만 원 수준에서 진행됩니다.",
  },
  {
    q: "결제는 언제 진행되나요?",
    a: "자문 완료 후 안내된 방식에 따라 결제가 진행됩니다.",
  },
  {
    q: "준비가 덜 되어 있어도 신청할 수 있나요?",
    a: "가능합니다. 현재 상황을 정리하는 단계부터 자문을 진행할 수 있습니다.",
  },
  {
    q: "기밀 정보는 안전하게 보호되나요?",
    a: "VIALOCAL은 전문가와 브랜드 간의 신뢰를 중요하게 생각하며 기밀성과 정보 보호를 최우선으로 운영합니다.",
  },
];

const tabs = [
  { label: "클라이언트용", href: "/faq/client" },
  { label: "자문위원용", href: "/faq/advisor" },
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
