"use client";

import { useEffect, useRef, useState } from "react";
import { useModal } from "@/context/ModalContext";
import Link from "next/link";

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
        {/* 배경 이미지 */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=60')] bg-cover bg-center opacity-30" />
        {/* 다크 오버레이 */}
        <div className="pointer-events-none absolute inset-0 bg-black/50" />
        <div className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl flex-col items-start justify-center px-6 pt-24 pb-24 lg:pt-32 lg:pb-32">
          <FadeIn>
            <span className="inline-block rounded-full border border-blue-400/40 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-300">
              VIALOCAL 소개
            </span>
            <h1 className="mt-14 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              K-뷰티 브랜드의 중요한 의사결정을
              <br className="hidden sm:block" />
              실무 경험으로 연결합니다
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-300 md:text-lg">
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
                브랜드 운영 과정에서는 제품 기획, 제조, 유통, 마케팅, 해외 진출 등 다양한 의사결정이 필요합니다.
              </p>
              <p className="text-base leading-relaxed text-slate-600 md:text-lg">
                인터넷 검색만으로는 현재 상황에 맞는 답을 찾기 어려운 경우가 많습니다.
              </p>
              <p className="text-base leading-relaxed text-slate-600 md:text-lg">
                VIALOCAL은 브랜드의 고민과 자문 주제에 맞는 실무 전문가를 연결하여 현업 경험 기반의 현실적인 방향성을 제공합니다.
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { delay: 0,   number: "다양한 분야",  label: "자문 가능 영역" },
              { delay: 120, number: "1시간",        label: "기본 자문 시간" },
              { delay: 240, number: "실무 중심",    label: "현업 경험 기반" },
              { delay: 360, number: "신뢰 기반",    label: "기밀성 우선 운영" },
            ].map((item) => (
              <FadeIn key={item.label} delay={item.delay} className="h-full">
                <div className="flex h-full min-h-[220px] min-w-0 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm md:p-10">
                  <p className="whitespace-nowrap text-4xl font-bold leading-none tracking-tight text-white md:text-5xl">
                    {item.number}
                  </p>
                  <p className="mt-4 text-xs font-medium uppercase tracking-widest text-blue-300 md:text-sm">
                    {item.label}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          섹션 3 — 서비스 설명  |  연한 그레이
      ════════════════════════════════════════════ */}
      <section className="bg-slate-50 py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-14">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                실무 자문
              </p>
              <h2 className="mt-4 max-w-2xl text-2xl font-bold text-slate-900 md:text-3xl">
                현재 문제를 빠르게 정리하고
                <br className="hidden sm:block" />
                실행 방향을 점검합니다
              </h2>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
                자문은 현재 상황을 함께 분석하고 우선순위를 정리하는 과정입니다.
              </p>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
                제품 기획, 제조, 유통, 마케팅, 해외 진출 등 브랜드 성장 과정에서 발생하는 다양한 실무 이슈를 다룰 수 있습니다.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          섹션 4 — 핵심 가치  |  화이트
      ════════════════════════════════════════════ */}
      <section className="bg-white py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              핵심 가치
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
              VIALOCAL이 추구하는 가치
            </h2>
          </FadeIn>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                delay: 0,
                title: "실무 중심",
                desc: "이론보다 실제 경험 기반의 현실적인 인사이트",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                ),
              },
              {
                delay: 120,
                title: "정확한 매칭",
                desc: "자문 주제에 맞는 전문가를 직접 검토하여 연결",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
              {
                delay: 240,
                title: "신뢰와 기밀성",
                desc: "민감한 정보 보호를 최우선으로 운영",
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
          섹션 5 — 가이드 문서  |  연한 중립
      ════════════════════════════════════════════ */}
      <section className="bg-neutral-50 py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              자문 전에 확인하면 좋은 가이드
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">
              VIALOCAL의 자문 방식과 준비 방법, 정보 보호 원칙을 미리 확인할 수 있습니다.
            </p>
          </FadeIn>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                delay: 0,
                title: "자문 진행 프로세스",
                desc: "신청부터 전문가 매칭, 자문 진행까지 전체 과정을 확인할 수 있습니다.",
                href: "/guide/process",
              },
              {
                delay: 120,
                title: "자문 준비 가이드",
                desc: "현재 상황과 질문을 정리해 자문을 더 효과적으로 활용할 수 있습니다.",
                href: "/guide/preparation",
              },
              {
                delay: 240,
                title: "보안 및 기밀 유지 원칙",
                desc: "민감한 정보 보호와 신뢰 기반 운영 원칙을 확인할 수 있습니다.",
                href: "/guide/security",
              },
            ].map((card, idx) => (
              <FadeIn key={idx} delay={card.delay} className="h-full">
                <Link
                  href={card.href}
                  className="flex h-full cursor-pointer flex-col rounded-2xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg"
                >
                  <h3 className="text-lg font-semibold text-slate-900">
                    {card.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500">
                    {card.desc}
                  </p>
                  <div className="mt-6 flex items-center gap-1">
                    <span className="text-sm font-medium text-neutral-900">
                      자세히 보기
                    </span>
                    <svg className="h-4 w-4 text-neutral-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          섹션 6 — CTA  |  다크 네이비
      ════════════════════════════════════════════ */}
      <section className="relative bg-[#0a1628] py-32">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d2044] to-[#102060]" />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              지금 바로 실무 전문가와 연결하세요
            </h2>
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
