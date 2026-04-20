"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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

          {/* 자문 신청 버튼 */}
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-lg bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0a1628]"
          >
            자문 신청하기
          </Link>
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
              왜 VIALOCAL인가
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
              해외 진출의 모든 단계, 전문가가 함께합니다
            </h2>
            <p className="mt-4 max-w-2xl text-slate-500">
              시장 진입부터 운영까지, 단계별 실무 자문
            </p>
          </FadeIn>

          {/* 3열 카드 */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                delay: 0,
                title: "시장 진입",
                desc: "미국·유럽·동남아 등 유통 채널 선택, 바이어 발굴, 플랫폼 입점 전략",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                delay: 120,
                title: "브랜드·마케팅",
                desc: "현지 소비자 맞춤 브랜딩, 콘텐츠 마케팅, 이커머스 운영 최적화",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                ),
              },
              {
                delay: 240,
                title: "인증·물류",
                desc: "MoCRA·CPNP 등 국가별 인증 취득, 물류 경로 설계, SCM 구축",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
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
          섹션 B  |  [이미지|텍스트] 교차형  |  화이트
      ════════════════════════════════════════════ */}
      <section className="bg-white py-32">
        <div className="mx-auto max-w-7xl space-y-28 px-6">
          {/* 섹션 B 헤더 */}
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              자문 프로세스
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-bold text-slate-900 md:text-4xl">
              문의부터 자문까지, 단 2단계
            </h2>
          </FadeIn>

          {/* B-1: 이미지 왼쪽 / 텍스트 오른쪽 */}
          <FadeIn>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&fit=crop"
                  alt="비즈니스 고민 접수 및 전문가 매칭"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                  의뢰 및 매칭
                </p>
                <h3 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl">
                  비즈니스 고민 접수 및 최적 전문가 매칭
                </h3>
                <p className="mt-4 leading-relaxed text-slate-500">
                  현재 직면한 해외 진출 이슈를 상세히 남겨주세요. VIALOCAL팀이 24시간 이내에 전문가 풀에서 가장 적합한 전문가를 선별해 제안합니다.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* B-2: 텍스트 왼쪽 / 이미지 오른쪽 */}
          <FadeIn>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="order-2 lg:order-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                  자문 및 해결
                </p>
                <h3 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl">
                  검증된 전문가와의 1:1 자문 실행
                </h3>
                <p className="mt-4 leading-relaxed text-slate-500">
                  매칭된 전문가의 경력을 확인하고 일정을 확정하세요. 1시간의 유선/화상 자문을 통해 실무자의 진짜 해결책을 얻습니다.
                </p>
              </div>
              <div className="relative order-1 aspect-video overflow-hidden rounded-2xl bg-slate-100 lg:order-2">
                <Image
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80&fit=crop"
                  alt="검증된 전문가와의 1:1 화상 자문"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
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
              이런 분께 필요합니다
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-bold text-white md:text-4xl">
              K-뷰티 글로벌 진출,<br/> 
              의사결정을 돕는 상위 1% 전문가 그룹
            </h2>
          </FadeIn>

          {/* 그리드 (모바일 1열 → md 이상 2×2) */}
          <div className="mt-16 grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            {[
              { delay: 0,   label: "검증", title: "엄격한 경력 검증을 통과한 산업별 실무 전문가 그룹", desc: "학벌이 아닌 실적으로 검증된 현업 전문가만 참여합니다." },
              { delay: 120, label: "지식", title: "리포트에는 담기지 않는 현장 실무자들의 생생한 노하우", desc: "이론이 아닌 직접 겪은 경험에서 나오는 실질적인 답변을 제공합니다." },
              { delay: 0,   label: "보안", title: "철저한 비밀유지 의무(NDA) 기반의 안전하고 프라이빗한 정보 교환", desc: "모든 자문은 NDA를 통해 기밀이 보장됩니다." },
              { delay: 120, label: "효율", title: "시행착오를 줄이는 가장 빠른 방법, 실무자의 경험치를 사는 효율성", desc: "수년간의 시행착오를 단 1시간으로 압축해 드립니다." },
            ].map((item, idx) => (
              <FadeIn key={idx} delay={item.delay} className="h-full">
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:bg-white/10 lg:p-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">
                    {item.label}
                  </p>
                  <h3 className="mt-3 text-sm font-bold leading-snug text-white md:text-base lg:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400 md:text-sm lg:leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* CTA */}
          <FadeIn className="mt-16 text-center">
            <Link
              href="/contact"
              className="inline-block rounded-lg border border-white/30 bg-white/10 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              자문 신청하기
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
