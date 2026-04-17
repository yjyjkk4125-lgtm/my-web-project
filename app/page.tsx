"use client";

import { useModal } from "@/context/ModalContext";

export default function Home() {
  const { openModal } = useModal();

  return (
    <main>
      <section className="relative bg-[#0a1628]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d2044] to-[#102060]" />

        <div className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl flex-col items-start justify-center px-6 py-24 lg:py-32">
          {/* 배지 */}
          <span className="inline-block rounded-full border border-blue-400/40 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-300">
            K-뷰티 브랜드 실무 자문 플랫폼
          </span>

          {/* 타이틀 */}
          <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
            해외 진출, 전문가 인사이트로 더 빠른 결정
          </h1>

          {/* 설명 */}
          <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-300 md:text-lg">
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
    </main>
  );
}
