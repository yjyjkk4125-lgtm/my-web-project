"use client";

import { useEffect, useRef, useState } from "react";
import { useModal } from "@/context/ModalContext";

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function About() {
  const { openModal } = useModal();

  return (
    <main>
      {/* ════════════════════════════════════════════
          섹션 1 — Hero  |  다크 네이비
      ════════════════════════════════════════════ */}
      <section className="relative bg-[#0a1628]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d2044] to-[#102060]" />
        <div className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl flex-col items-start justify-center px-6 py-24 lg:py-32">
          <FadeIn>
            <span className="inline-block rounded-full border border-blue-400/40 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-300">
              VIALOCAL 소개
            </span>
            <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              K-뷰티 브랜드의 해외 진출을 가장 빠르게
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-300 md:text-lg">
              이론이 아닌 현장의 언어로, 실무 전문가가 직접 답합니다
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          섹션 2 — 왜 만들었나  |  라이트
      ════════════════════════════════════════════ */}
      <section className="bg-[#f0f4f8] py-32">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <p className="text-base leading-relaxed text-slate-600 md:text-lg">
              K-뷰티 브랜드는 매일 수많은 해외 진출 결정을 내려야 합니다.
            </p>
          </FadeIn>
          <FadeIn delay={120}>
            <p className="mt-8 text-base leading-relaxed text-slate-600 md:text-lg">
              해외 유통, 인증, 마케팅, 이커머스, 투자까지 — 각 분야마다 전혀 다른 전문성이 필요합니다.
            </p>
          </FadeIn>
          <FadeIn delay={240}>
            <p className="mt-8 text-xl font-bold text-slate-900 md:text-2xl">
              그 해답은 당신의 경험에 있습니다.
            </p>
          </FadeIn>
          <FadeIn delay={360}>
            <p className="mt-8 text-base leading-relaxed text-slate-600 md:text-lg">
              VIALOCAL은 각 분야 실무 전문가와 고민을 가진 모든 분을 직접 연결합니다. 1시간의 전화 자문으로 수개월의 시행착오를 줄입니다.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          섹션 3 — 숫자 지표  |  다크 네이비
      ════════════════════════════════════════════ */}
      <section className="bg-[#0d1f3c] py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 sm:grid-cols-2">
            {[
              { delay: 0,   number: "15개국+", label: "자문 가능 국가" },
              { delay: 160, number: "1시간",   label: "기본 자문 시간" },
            ].map((item) => (
              <FadeIn key={item.label} delay={item.delay}>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-sm">
                  <p className="text-5xl font-bold tracking-tight text-white md:text-6xl">
                    {item.number}
                  </p>
                  <p className="mt-4 text-sm font-medium uppercase tracking-widest text-blue-300">
                    {item.label}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          섹션 4 — 3가지 가치  |  라이트
      ════════════════════════════════════════════ */}
      <section className="bg-white py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              핵심 가치
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
              VIALOCAL이 추구하는 것
            </h2>
          </FadeIn>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                delay: 0,
                title: "실무 중심",
                desc: "화려한 보고서가 아닌 내일 바로 실행할 수 있는 답",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                ),
              },
              {
                delay: 120,
                title: "연결",
                desc: "해외 진출 고민을 가장 적합한 전문가와 1:1로 연결합니다",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
              {
                delay: 240,
                title: "신뢰",
                desc: "NDA 기반의 안전하고 프라이빗한 정보 교환",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
              },
            ].map((card, idx) => (
              <FadeIn key={idx} delay={card.delay}>
                <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    {card.icon}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">
                    {card.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                    {card.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          섹션 5 — CTA  |  다크 네이비
      ════════════════════════════════════════════ */}
      <section className="bg-[#0a1628] py-32">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d2044] to-[#102060]" />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              지금 바로 전문가와 연결하세요
            </h2>
            <div className="mt-10">
              <button
                onClick={openModal}
                className="rounded-lg bg-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0a1628]"
              >
                문의하기
              </button>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
