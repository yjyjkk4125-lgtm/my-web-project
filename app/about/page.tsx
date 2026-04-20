"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
  return (
    <main>
      {/* ════════════════════════════════════════════
          섹션 1 — Hero  |  다크 네이비
      ════════════════════════════════════════════ */}
      <section className="relative bg-[#0a1628]">
        {/* 배경 이미지 */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=60')] bg-cover bg-center opacity-30" />
        {/* 다크 오버레이 — 흰 글씨 가독성 확보 */}
        <div className="pointer-events-none absolute inset-0 bg-black/50" />
        <div className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl flex-col items-start justify-center px-6 pt-24 pb-24 lg:pt-32 lg:pb-32">
          <FadeIn>
            <span className="inline-block rounded-full border border-blue-400/40 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-300">
              VIALOCAL 소개
            </span>
            <h1 className="mt-14 text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              K-뷰티 브랜드의 해외 진출을 가장 빠르게
            </h1>
            <p className="mt-14 max-w-lg text-base leading-relaxed text-slate-300 md:text-lg">
              이론이 아닌 현장의 언어로, 실무 전문가가 직접 답합니다.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          섹션 2 — 존재 이유  |  라이트
      ════════════════════════════════════════════ */}
      <section className="bg-[#f0f4f8] py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="max-w-3xl space-y-8">
              <p className="text-base leading-relaxed text-slate-600 md:text-lg">
                까다로운 글로벌 유통망 확보부터 국가별 복잡한 인증, 그리고 아마존이나 틱톡샵 같은 글로벌 이커머스 최적화까지 — 브랜드가 진출하고자 하는 모든 시장에는 각기 다른 실무 장벽이 존재합니다.
              </p>
              <p className="text-base leading-relaxed text-slate-600 md:text-lg">
                비아로컬은 파편화된 정보를 나열하는 대신, 브랜드의 고민에 가장 정확한 답을 줄 수 있는 실무 전문가를 큐레이션합니다. 전 세계 주요 거점부터 신흥 시장까지, 15개국 이상의 네트워크를 바탕으로 현장의 '리얼리티'를 전달합니다.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          섹션 2.5 — 숫자 지표  |  다크 네이비
      ════════════════════════════════════════════ */}
      <section className="bg-[#0d1f3c] py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { delay: 0,   number: "15개국+", label: "자문 가능 국가" },
              { delay: 160, number: "1시간",   label: "기본 자문 시간" },
              { delay: 320, number: "100%",    label: "현업 실무자 비율" },
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
          섹션 3 — 비즈니스 가교  |  연한 그레이
      ════════════════════════════════════════════ */}
      <section className="bg-slate-50 py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="rounded-2xl border border-slate-200 bg-white p-10 shadow-sm md:p-14">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                비즈니스 가교
              </p>
              <h2 className="mt-4 max-w-2xl text-2xl font-bold text-slate-900 md:text-3xl">
                1시간의 자문, 그 이상의 비즈니스 확장
              </h2>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
                단순한 지식 전달에서 끝나지 않습니다. 자문 결과에 따라 현지 유통망 확보, 총판 계약, 파트너십 체결 등 실질적인 비즈니스 협업으로 이어질 수 있도록 VIALOCAL이 가교 역할을 수행합니다.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          섹션 4 — 3가지 핵심 가치  |  화이트
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
                title: "연결과 확장",
                desc: "단순 매칭을 넘어 실질적인 비즈니스 협업으로 가는 브릿지",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
              {
                delay: 240,
                title: "철저한 신뢰",
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
      <section className="relative bg-[#0a1628] py-32">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d2044] to-[#102060]" />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              지금 바로 전문가와 연결하세요
            </h2>
            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-block rounded-lg bg-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0a1628]"
              >
                자문 신청하기
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
