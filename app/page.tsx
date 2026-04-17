"use client";

import { useEffect, useRef, useState } from "react";
import { useModal } from "@/context/ModalContext";

/* ── 스크롤 Fade-in 래퍼 ─────────────────────────────────────────── */
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

/* ── 메인 페이지 ─────────────────────────────────────────────────── */
export default function Home() {
  const { openModal } = useModal();

  return (
    <main>
      {/* ════════════════════════════════════════════
          Hero  |  다크 네이비
      ════════════════════════════════════════════ */}
      <section className="relative bg-[#0a1628]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d2044] to-[#102060]" />

        <div className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl flex-col items-start justify-center px-6 py-24 lg:py-32">
          {/* 배지 */}
          <span className="inline-block rounded-full border border-blue-400/40 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-300">
            K-뷰티 브랜드 실무 자문 플랫폼
          </span>

          {/* 타이틀 */}
          <h1 className="mt-14 text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
            해외 진출, 전문가 인사이트로 더 빠른 결정
          </h1>

          {/* 설명 */}
          <p className="mt-14 max-w-lg text-base leading-relaxed text-slate-300 md:text-lg">
            K-뷰티 브랜드 전문가의 실전 경험, 1시간 1:1 직접 자문
          </p>

          {/* 문의하기 버튼 */}
          <button
            onClick={openModal}
            className="mt-8 rounded-lg bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0a1628]"
          >
            문의하기
          </button>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          섹션 A  |  3열 카드형  |  연한 그레이-블루
      ════════════════════════════════════════════ */}
      <section className="bg-[#f0f4f8] py-32">
        <div className="mx-auto max-w-7xl px-6">
          {/* 섹션 헤더 */}
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              섹션 A 레이블
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-bold text-slate-900 md:text-4xl">
              섹션 A 제목을 여기에 입력하세요
            </h2>
            <p className="mt-4 max-w-2xl text-slate-500">
              섹션 A 설명 문구를 여기에 입력하세요.
            </p>
          </FadeIn>

          {/* 3열 카드 */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { delay: 0 },
              { delay: 120 },
              { delay: 240 },
            ].map((card, idx) => (
              <FadeIn key={idx} delay={card.delay}>
                <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md">
                  {/* 아이콘 자리 */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">
                    카드 {idx + 1} 제목
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                    카드 {idx + 1} 설명 내용을 여기에 입력하세요.
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          섹션 B  |  [이미지|텍스트] 교차형  |  화이트
      ════════════════════════════════════════════ */}
      <section className="bg-white py-32">
        <div className="mx-auto max-w-7xl space-y-28 px-6">
          {/* 섹션 B 헤더 */}
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              섹션 B 레이블
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-bold text-slate-900 md:text-4xl">
              섹션 B 제목을 여기에 입력하세요
            </h2>
          </FadeIn>

          {/* B-1: 이미지 왼쪽 / 텍스트 오른쪽 */}
          <FadeIn>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="aspect-video overflow-hidden rounded-2xl bg-slate-100">
                {/* 이미지 또는 영상 자리 */}
                <div className="flex h-full items-center justify-center text-sm text-slate-400">
                  이미지 / 영상 자리 (B-1)
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                  B-1 레이블
                </p>
                <h3 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl">
                  B-1 제목을 여기에 입력하세요
                </h3>
                <p className="mt-4 leading-relaxed text-slate-500">
                  B-1 설명 내용을 여기에 입력하세요.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* B-2: 텍스트 왼쪽 / 이미지 오른쪽 */}
          <FadeIn>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="order-2 lg:order-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                  B-2 레이블
                </p>
                <h3 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl">
                  B-2 제목을 여기에 입력하세요
                </h3>
                <p className="mt-4 leading-relaxed text-slate-500">
                  B-2 설명 내용을 여기에 입력하세요.
                </p>
              </div>
              <div className="order-1 aspect-video overflow-hidden rounded-2xl bg-slate-100 lg:order-2">
                <div className="flex h-full items-center justify-center text-sm text-slate-400">
                  이미지 / 영상 자리 (B-2)
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          섹션 C  |  그리드형  |  다크 네이비
      ════════════════════════════════════════════ */}
      <section className="bg-[#0d1f3c] py-32">
        <div className="mx-auto max-w-7xl px-6">
          {/* 섹션 C 헤더 */}
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">
              섹션 C 레이블
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-bold text-white md:text-4xl">
              섹션 C 제목을 여기에 입력하세요
            </h2>
            <p className="mt-4 max-w-2xl text-slate-400">
              섹션 C 설명 문구를 여기에 입력하세요.
            </p>
          </FadeIn>

          {/* 그리드 (2×2) */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {[
              { delay: 0 },
              { delay: 120 },
              { delay: 0 },
              { delay: 120 },
            ].map((item, idx) => (
              <FadeIn key={idx} delay={item.delay}>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition hover:bg-white/10">
                  <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">
                    항목 {idx + 1}
                  </p>
                  <h3 className="mt-3 text-xl font-bold text-white">
                    그리드 항목 {idx + 1} 제목
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    그리드 항목 {idx + 1} 설명 내용을 여기에 입력하세요.
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* CTA */}
          <FadeIn className="mt-16 text-center">
            <button
              onClick={openModal}
              className="rounded-lg border border-white/30 bg-white/10 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              문의하기
            </button>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
