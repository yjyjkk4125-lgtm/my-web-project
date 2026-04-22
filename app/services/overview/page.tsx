"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function FadeIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}>
      {children}
    </div>
  );
}

function Em({ children }: { children: React.ReactNode }) {
  return <strong className="font-bold text-black">{children}</strong>;
}

export default function ServicesOverview() {
  return (
    <main className="w-full overflow-x-hidden">

      {/* ══════════════════════════════════════════════
          Section 1 — Hero
      ══════════════════════════════════════════════ */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=70"
            alt="서비스 개요 Hero"
            fill
            className="object-cover opacity-30"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent" />
        </div>
        <div className="relative w-full px-6 py-24 text-left lg:px-16 lg:py-32">
          <FadeIn>
            <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
              Services Overview
            </span>
            <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              <strong className="font-bold text-white">수천만 원의 시행착오 비용</strong>,<br />
              단 1시간의 전문가 자문으로 줄이세요.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white md:text-lg">
              K-Beauty 브랜드의 탄생부터 글로벌 스케일업까지,<br />
              막연한 추측이 아닌 <strong className="font-bold text-white">&lsquo;검증된 실무 통찰&rsquo;</strong>이 성공의 경로를 결정합니다.
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
            <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-700">
              Why VIALOCAL
            </span>
            <p className="mt-6 text-xl font-bold leading-snug text-slate-900 md:text-2xl">
              <Em>보고서만 남는 비싼 컨설팅, 현장과는 동떨어진 이론들.</Em><br />
              K-Beauty 브랜드들이 겪는 이 비효율을 끝내기 위해 시작했습니다.
            </p>
            <p className="mt-8 text-base leading-relaxed text-slate-600 md:text-lg">
              수많은 브랜드가 정보 부족으로 수천만 원을 날리고 진출에 실패하는 것을 보았습니다.<br />
              VIALOCAL은 그 <Em>&lsquo;실패 비용&rsquo;을 0원</Em>으로 만드는 가장 현실적인 해결책을 제시하기 위해 탄생했습니다.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ══════════════════════════════════════════════
          Section 3 — Message (문장 간 150px+ 여백)
      ══════════════════════════════════════════════ */}
      <section className="bg-white px-6 py-20 text-left lg:px-16 lg:py-28">
        <FadeIn>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              자문 비용이 아깝다고 생각하시나요?
            </h2>

            <p className="mt-8 text-base leading-relaxed text-slate-700 md:mt-10 md:text-lg">
              지금 아끼려는 그 비용보다, 자문 없이 진행했을 때 터질 <Em>&lsquo;실패 비용&rsquo;</Em>이
              수백 배는 더 큽니다.
            </p>

            <p className="mt-8 text-base leading-relaxed text-slate-700 md:mt-10 md:text-lg">
              준비되지 않은 시장 진입과 전략은 잘못된 타겟팅, 부적합한 파트너 선정으로 이어져
              결국 <Em>수천만 원의 매몰 비용</Em>과 <Em>1년 이상의 시간 낭비</Em>를 초래합니다.
            </p>

            <p className="mt-8 text-base leading-relaxed text-slate-700 md:mt-10 md:text-lg">
              VIALOCAL은 당신이 현장에서 겪을 시행착오를 사전에 차단하고, 불필요한 금전적 손실을 막아주는
              가장 확실한 <Em>&lsquo;비즈니스 안전장치&rsquo;</Em>입니다.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ══════════════════════════════════════════════
          Section 4 — 브랜드 빌드업 & 스케일업
          Desktop: 텍스트(좌) + 이미지(우)
          Mobile: 텍스트 → 이미지 순 수직 정렬
      ══════════════════════════════════════════════ */}
      <section className="bg-slate-50 px-6 py-20 text-left lg:px-16 lg:py-28">
        <FadeIn>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
            {/* 텍스트 블록 */}
            <div className="w-full text-left lg:w-1/2">
              <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-700">
                Build-up &amp; Scale-up
              </span>
              <h2 className="mt-4 text-2xl font-bold text-slate-900 md:text-3xl">
                브랜드 빌드업 &amp; 스케일업
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg">
                초기 컨셉 설정부터 제품 고도화, 그리고 브랜드가 한 단계 점프하기 위해 필요한
                모든 전략적 의사결정을 지원합니다.
                (<Em>BM 설계, OEM/ODM 최적화, 제품 라인업 확장 등</Em>)
              </p>
            </div>
            {/* 이미지 블록 — 가로형 16:9 */}
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=960&q=80"
                  alt="브랜드 빌드업 & 스케일업"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ══════════════════════════════════════════════
          Section 5 — 전략적 시장 침투
          Desktop: 이미지(좌) + 텍스트(우)
          Mobile: 텍스트 → 이미지 순 수직 정렬
      ══════════════════════════════════════════════ */}
      <section className="bg-white px-6 py-20 text-left lg:px-16 lg:py-28">
        <FadeIn>
          <div className="flex flex-col gap-10 lg:flex-row-reverse lg:items-center lg:gap-16">
            {/* 텍스트 블록 */}
            <div className="w-full text-left lg:w-1/2">
              <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-700">
                Market Penetration
              </span>
              <h2 className="mt-4 text-2xl font-bold text-slate-900 md:text-3xl">
                전략적 시장 침투
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg">
                온·오프라인 채널의 생태계를 정확히 이해하고, 단순 입점을 넘어
                &lsquo;팔리는 구조&rsquo;를 만듭니다.
                (<Em>국내외 유통 전략, 인허가 리스크 관리, 채널별 최적화 등</Em>)
              </p>
            </div>
            {/* 이미지 블록 — 가로형 16:9 */}
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=960&q=80"
                  alt="전략적 시장 침투"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ══════════════════════════════════════════════
          Section 6 — 통합 마케팅 커뮤니케이션
          Desktop: 텍스트(좌) + 이미지(우)
          Mobile: 텍스트 → 이미지 순 수직 정렬
      ══════════════════════════════════════════════ */}
      <section className="bg-slate-50 px-6 py-20 text-left lg:px-16 lg:py-28">
        <FadeIn>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
            {/* 텍스트 블록 */}
            <div className="w-full text-left lg:w-1/2">
              <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-700">
                Total Marketing
              </span>
              <h2 className="mt-4 text-2xl font-bold text-slate-900 md:text-3xl">
                통합 마케팅 커뮤니케이션
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg">
                브랜드 가치를 각인시키고 실질적인 매출 전환을 이끌어내는 모든 활동을 포함합니다.
                (<Em>퍼포먼스 마케팅, 브랜드 브랜딩, 국가별 맞춤형 콘텐츠 전략 등</Em>)
              </p>
            </div>
            {/* 이미지 블록 — 가로형 16:9 */}
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=960&q=80"
                  alt="통합 마케팅 커뮤니케이션"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ══════════════════════════════════════════════
          Section 7 — 운영 최적화 및 파트너십
          Desktop: 이미지(좌) + 텍스트(우)
          Mobile: 텍스트 → 이미지 순 수직 정렬
      ══════════════════════════════════════════════ */}
      <section className="bg-white px-6 py-20 text-left lg:px-16 lg:py-28">
        <FadeIn>
          <div className="flex flex-col gap-10 lg:flex-row-reverse lg:items-center lg:gap-16">
            {/* 텍스트 블록 */}
            <div className="w-full text-left lg:w-1/2">
              <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-700">
                Ops &amp; Partnership
              </span>
              <h2 className="mt-4 text-2xl font-bold text-slate-900 md:text-3xl">
                운영 최적화 및 파트너십
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg">
                비즈니스 지속 가능성을 위한 물류, 운영 프로세스 효율화 및 성장을 가속화할 수 있는
                핵심 파트너사 연결까지 지원합니다.
              </p>
            </div>
            {/* 이미지 블록 — 가로형 16:9 */}
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=960&q=80"
                  alt="운영 최적화 및 파트너십"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

    </main>
  );
}
