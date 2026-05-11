"use client";

import Link from "next/link";
import { useState } from "react";

const items = [
  {
    q: "자문위원 등록은 어떻게 진행되나요?",
    a: "자문위원 등록하기 폼에 기본 정보와 경력을 입력해 주시면 운영팀이 검토 후 연락드립니다. 최종 자문료 설정 및 전문가 등록이 완료되면 자문 요청을 받을 수 있습니다.",
  },
  {
    q: "어떤 전문가가 참여할 수 있나요?",
    a: "브랜드 운영, 해외 진출, 유통, 제조, 마케팅 등 K-뷰티 산업 전반의 실무 경험을 보유한 전문가라면 참여할 수 있습니다.",
  },
  {
    q: "자문료는 어떻게 결정되나요?",
    a: "전문 분야, 경력, 주제의 특성을 바탕으로 운영팀과 협의하여 최종 자문료를 설정합니다.",
  },
  {
    q: "자문 요청은 어떻게 받게 되나요?",
    a: "전문 분야와 경력에 맞는 자문 요청이 들어오면 등록하신 연락처로 개별 안내드립니다.",
  },
  {
    q: "자문은 어떤 방식으로 진행되나요?",
    a: "클라이언트와 1:1 전화 또는 화상 방식으로 실무 자문이 진행됩니다.",
  },
  {
    q: "정산은 언제 이루어지나요?",
    a: "자문 완료 건에 대한 자문료는 매월 지정된 정산일에 계좌 이체 방식으로 지급됩니다.",
  },
  {
    q: "일정 변경이 필요하면 어떻게 하나요?",
    a: "일정 변경이 필요한 경우 운영팀에 연락해 주시면 조율을 도와드립니다.",
  },
  {
    q: "모든 자문 요청을 수락해야 하나요?",
    a: "아닙니다. 주제와 일정, 관심 분야를 검토한 후 원하는 자문만 선택하여 참여할 수 있습니다.",
  },
  {
    q: "기밀 정보는 어떻게 보호되나요?",
    a: "VIALOCAL은 전문가와 브랜드 간의 신뢰를 중요하게 생각하며 기밀성과 정보 보호를 최우선으로 운영합니다.",
  },
];

const tabs = [
  { label: "클라이언트용", href: "/faq/client" },
  { label: "자문위원용", href: "/faq/advisor" },
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
