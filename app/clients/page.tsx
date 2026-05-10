"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useModal } from "@/context/ModalContext";

/* ── Fade-in 래퍼 ────────────────────────────────────── */
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   클라이언트 페이지
═══════════════════════════════════════════════════════ */
export default function ClientsPage() {
  const { openModal } = useModal();

  return (
    <main>

      {/* ════════════════════════════════════════════
          Section 1 — Hero
      ════════════════════════════════════════════ */}
      <section id="inquiry-form" className="relative min-h-[calc(100vh-64px)] flex items-center justify-start overflow-hidden">
        {/* 배경 이미지 */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=70"
            alt="글로벌 비즈니스 미팅"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative w-full px-6 py-24 text-left lg:px-16 lg:py-32">
          <FadeIn>
            <span className="inline-block rounded-full border border-blue-400/40 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-300">
              K-뷰티 브랜드 실무 자문 플랫폼
            </span>
            <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              브랜드 운영의 중요한 의사결정,<br />혼자 고민하지 마세요
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
              브랜드 운영, 제품 기획, 제조, 유통, 마케팅, 해외 진출까지.<br />실무 경험을 보유한 전문가가 현재 상황에 맞는 방향을 함께 점검합니다.
            </p>
            <button
              onClick={openModal}
              className="mt-10 rounded-lg bg-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-black/60"
            >
              자문 신청하기
            </button>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          Section 2 — Why VIALOCAL
      ════════════════════════════════════════════ */}
      <section className="bg-[#f0f4f8] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              왜 VIALOCAL인가
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
              브랜드 성장 전반의 문제를<br />실무 전문가와 함께 점검합니다
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-500">
              브랜드 운영 과정에서는 제품, 제조, 유통, 마케팅, 글로벌 진출 등 다양한 의사결정이 필요합니다.<br />VIALOCAL은 현재 상황과 자문 주제에 맞는 실무 전문가를 연결합니다.
            </p>
          </FadeIn>

          {/* 3열 카드 */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                delay: 0,
                label: "검증된 전문가",
                desc: "실무 경험과 전문성을 검토한 전문가와 연결됩니다.",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                delay: 120,
                label: "실무 중심",
                desc: "이론보다 실제 현업 경험 기반의 현실적인 조언을 제공합니다.",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
              {
                delay: 240,
                label: "합리적인 비용",
                desc: "필요한 주제에 대해 1:1 실무 자문으로 방향을 점검할 수 있습니다.",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                    {card.label}
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
          Section 3 — Process
      ════════════════════════════════════════════ */}
      <section className="bg-[#0F172A] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">
              자문 프로세스
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-bold text-white md:text-4xl">
              자문 신청부터 실행까지
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-slate-300">
              현재 상황과 자문 주제에 맞는 전문가를 검토하고 연결합니다.
            </p>
          </FadeIn>

          <div className="mt-16 space-y-20">
            {/* Step 1 */}
            <FadeIn>
              <div className="grid items-center gap-12 lg:grid-cols-2">
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-800">
                  <Image
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
                    alt="자문 신청"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">
                    Step 1
                  </p>
                  <h3 className="mt-3 text-2xl font-bold text-white md:text-3xl">
                    자문 신청
                  </h3>
                  <p className="mt-4 leading-relaxed text-slate-300">
                    현재 고민하고 있는 문제와 필요한 자문 내용을 작성합니다.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Step 2 */}
            <FadeIn>
              <div className="grid items-center gap-12 lg:grid-cols-2">
                <div className="order-2 lg:order-1">
                  <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">
                    Step 2
                  </p>
                  <h3 className="mt-3 text-2xl font-bold text-white md:text-3xl">
                    전문가 검토 및 매칭
                  </h3>
                  <p className="mt-4 leading-relaxed text-slate-300">
                    운영팀이 자문 주제와 브랜드 상황을 검토한 후 적합한 실무 전문가를 매칭합니다.
                  </p>
                </div>
                <div className="relative order-1 aspect-video overflow-hidden rounded-2xl bg-slate-800 lg:order-2">
                  <Image
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80"
                    alt="전문가 검토 및 매칭"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </FadeIn>

            {/* Step 3 */}
            <FadeIn>
              <div className="grid items-center gap-12 lg:grid-cols-2">
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-800">
                  <Image
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
                    alt="1:1 실무 자문"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">
                    Step 3
                  </p>
                  <h3 className="mt-3 text-2xl font-bold text-white md:text-3xl">
                    1:1 실무 자문
                  </h3>
                  <p className="mt-4 leading-relaxed text-slate-300">
                    현재 상황과 주제에 맞는 전문가와 1:1 전화 또는 화상 방식의 실무 자문이 진행됩니다.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn className="mt-16 flex justify-center">
            <a
              href="/guide/process"
              className="rounded-lg border border-blue-400/50 bg-blue-500/10 px-8 py-4 text-sm font-semibold text-blue-300 transition hover:bg-blue-500/20"
            >
              자문 진행 프로세스 보기
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          Section 4 — Expertise Areas
      ════════════════════════════════════════════ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              자문 분야
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
              브랜드 운영 전반의 문제를 다룹니다
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-500">
              특정 분야에 한정되지 않고 브랜드 성장 과정에서 발생하는 다양한 실무 이슈에 대해 자문을 받을 수 있습니다.
            </p>
          </FadeIn>

          {/* 2×2 그리드 */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {[
              {
                delay: 0,
                label: "브랜드 운영 및 전략",
                desc: "브랜드 방향성, 제품 전략, 성장 우선순위 점검",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                delay: 120,
                label: "제조 및 제품 개발",
                desc: "OEM / ODM, 제품 기획, 생산 커뮤니케이션",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                ),
              },
              {
                delay: 0,
                label: "유통 및 글로벌 진출",
                desc: "국내외 유통 구조, 바이어 대응, 시장 진출 전략",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                delay: 120,
                label: "마케팅 및 판매 전략",
                desc: "광고 효율, 콘텐츠, 판매 구조 개선",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
              },
            ].map((item, idx) => (
              <FadeIn key={idx} delay={item.delay}>
                <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    {item.icon}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">
                    {item.label}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          Section 5 — Partnership
      ════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=70"
            alt="글로벌 파트너십"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/65" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-300">
                파트너십
              </p>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
                자문을 넘어 실질적인 비즈니스 연결로
              </h2>
              <p className="mt-6 text-base leading-relaxed text-slate-300 md:text-lg">
                자문 과정에서 비즈니스 적합성이 확인될 경우,<br />유통, 제조, 마케팅 등 필요한 파트너와의 후속 연결이 이루어질 수 있습니다.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          Section 6 — Final CTA
      ════════════════════════════════════════════ */}
      <section className="bg-[#f0f4f8] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              지금 바로 실무 전문가와 연결하세요
            </h2>
            <div className="mt-10">
              <button
                onClick={openModal}
                className="rounded-lg bg-blue-700 px-8 py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
