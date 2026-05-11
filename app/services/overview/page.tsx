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
          observer.disconnect();
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
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function ServicesOverview() {
  const { openModal } = useModal();

  return (
    <main className="w-full overflow-x-hidden">

      {/* ══════════════════════════════════════════════
          Section 1 — Hero
      ══════════════════════════════════════════════ */}
      <section className="relative flex min-h-[60vh] items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=70')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent" />
        <div className="relative w-full px-6 py-24 text-left lg:px-16 lg:py-32">
          <FadeIn>
            <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
              Services Overview
            </span>
            <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              브랜드 성장 전반의 문제를
              <br className="hidden sm:block" />
              실무 경험으로 해결합니다
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
              제품 기획, 제조, 유통, 마케팅, 해외 진출까지 현재 상황에 맞는 전문가와 연결됩니다.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          Section 2 — Why VIALOCAL
      ══════════════════════════════════════════════ */}
      <section className="bg-slate-50 px-6 py-20 text-left lg:px-16 lg:py-28">
        <FadeIn>
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-600">
              Why VIALOCAL
            </span>
            <h2 className="mt-6 text-2xl font-bold leading-snug text-slate-900 md:text-3xl">
              검색으로 찾기 어려운 답을 실무 경험으로 확인합니다
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-600 md:text-lg">
              브랜드 운영 과정에서는 정답이 하나로 정해지지 않는 문제가 많습니다.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              VIALOCAL은 현재 상황과 자문 주제에 맞는 전문가를 연결하여 실행 방향을 점검할 수 있도록 지원합니다.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ══════════════════════════════════════════════
          Section 3 — VIALOCAL이 제공하는 가치
      ══════════════════════════════════════════════ */}
      <section className="bg-white px-6 py-20 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              VIALOCAL이 제공하는 가치
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">
              중요한 의사결정에서 시행착오를 줄이고 더 빠르게 방향을 정리할 수 있습니다.
            </p>
          </FadeIn>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                delay: 0,
                title: "의사결정 시간 단축",
                desc: "현재 문제를 빠르게 정리하고 우선순위를 명확히 할 수 있습니다.",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
              {
                delay: 120,
                title: "시행착오 최소화",
                desc: "실무 경험을 기반으로 반복적인 오류 가능성을 줄일 수 있습니다.",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                delay: 240,
                title: "실행 방향 점검",
                desc: "현재 전략의 리스크와 개선 방향을 구체적으로 확인할 수 있습니다.",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
              },
            ].map((card, idx) => (
              <FadeIn key={idx} delay={card.delay}>
                <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    {card.icon}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">{card.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{card.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          Section 4 — 서비스 카테고리 4개
      ══════════════════════════════════════════════ */}
      <section className="bg-slate-50 px-6 py-20 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                delay: 0,
                label: "Build-up & Scale-up",
                title: "브랜드 운영 및 성장",
                desc: "브랜드 기획, 제품 개발, 포지셔닝, 사업 전략 등 성장 전반의 의사결정을 다룹니다.",
              },
              {
                delay: 120,
                label: "Distribution & Expansion",
                title: "유통 및 해외 진출",
                desc: "국내외 유통 전략, 시장 진입, 바이어 대응, 채널 확장 관련 이슈를 다룹니다.",
              },
              {
                delay: 0,
                label: "Marketing & Commerce",
                title: "마케팅 및 이커머스",
                desc: "광고 효율, 콘텐츠 전략, 브랜딩, 온라인 판매 구조 개선을 다룹니다.",
              },
              {
                delay: 120,
                label: "Manufacturing & Operations",
                title: "제조 및 운영",
                desc: "OEM·ODM, 원가 구조, 생산 일정, 운영 프로세스 관련 문제를 다룹니다.",
              },
            ].map((card, idx) => (
              <FadeIn key={idx} delay={card.delay}>
                <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                  <span className="inline-block w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-600">
                    {card.label}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-slate-900">{card.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500">{card.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          Section 5 — CTA
      ══════════════════════════════════════════════ */}
      <section className="relative bg-[#0a1628] py-32">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d2044] to-[#102060]" />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              지금 바로 실무 전문가와 연결하세요
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-lg">
              현재 상황에 맞는 전문가와 1:1 실무 자문을 진행할 수 있습니다.
            </p>
            <div className="mt-10">
              <button
                onClick={openModal}
                className="rounded-lg bg-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0a1628]"
              >
                자문 신청하기
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

    </main>
  );
}
