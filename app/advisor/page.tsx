"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ── 스크롤 Fade-in 래퍼 ─────────────────────────────────── */
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

/* ── 프로세스 아이콘 ────────────────────────────────────── */
function IconProfile() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="4" />
      <path strokeLinecap="round" d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}
function IconInbox() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
function IconCoin() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v1m0 8v1M9.5 9.5A2.5 2.5 0 0112 8a2.5 2.5 0 010 5 2.5 2.5 0 000 5 2.5 2.5 0 002.5-1.5" />
    </svg>
  );
}
function IconHandshake() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-1a4 4 0 00-5.5-3.7M9 20H4v-1a4 4 0 015.5-3.7M15 7a4 4 0 11-8 0 4 4 0 018 0zM21 20v-1a4 4 0 00-3-3.87M3 20v-1a4 4 0 013-3.87" />
    </svg>
  );
}

const processSteps = [
  {
    Icon: IconProfile,
    title: "프로필 등록",
    desc: "전문 분야와 경력을 등록하면 운영팀이 검토합니다.",
  },
  {
    Icon: IconInbox,
    title: "자문 요청 안내",
    desc: "적합한 자문 요청이 있을 경우 이메일 또는 연락처로 안내합니다.",
  },
  {
    Icon: IconCheck,
    title: "일정 확인 및 자문 진행",
    desc: "주제와 일정을 확인하고 수락하면 브랜드와 1:1 자문이 진행됩니다.",
  },
  {
    Icon: IconCoin,
    title: "자문료 지급",
    desc: "완료된 자문에 대해 안내된 기준에 따라 자문료를 지급합니다.",
  },
  {
    Icon: IconHandshake,
    title: "지속적인 협업",
    desc: "이후에도 적합한 자문 기회를 지속적으로 안내합니다.",
  },
];

const valueCards = [
  {
    title: "자문료 지급",
    desc: "각 자문 완료 후 약정된 자문료를 지급합니다.",
    Icon: () => (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth={1.3} viewBox="0 0 24 24">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path strokeLinecap="round" d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
  },
  {
    title: "업계 네트워크",
    desc: "다양한 브랜드 및 업계 관계자와 연결될 수 있습니다.",
    Icon: () => (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth={1.3} viewBox="0 0 24 24">
        <circle cx="12" cy="5" r="2" />
        <circle cx="5" cy="19" r="2" />
        <circle cx="19" cy="19" r="2" />
        <path strokeLinecap="round" d="M12 7v4M10 19H7M14 19h3M12 11l-5 6M12 11l5 6" />
      </svg>
    ),
  },
  {
    title: "신뢰할 수 있는 환경",
    desc: "기밀성과 정보 보호를 최우선으로 운영합니다.",
    Icon: () => (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth={1.3} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 4v5c0 5-3.5 9.7-8 11C7.5 21.7 4 17 4 12V7l8-4z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

export default function AdvisorPage() {
  return (
    <main>
      {/* ════════════════════════════════════════
          섹션 1 — Hero
      ════════════════════════════════════════ */}
      <section className="relative min-h-[70vh] bg-[#0a1628]">
        {/* 배경 이미지 오버레이 */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=60')] bg-cover bg-center opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/90 via-[#0a1628]/60 to-transparent" />

        <div className="relative mx-auto flex min-h-[70vh] max-w-7xl flex-col items-start justify-center px-6 py-28 lg:py-36">
          <h1 className="max-w-2xl text-3xl font-bold leading-snug text-white md:text-4xl lg:text-5xl">
            K-뷰티 브랜드의 성장을 돕는 자문위원
          </h1>

          <Link
            href="/advisor/register"
            className="mt-8 inline-block rounded border border-white px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-[#0a1628]"
          >
            자문위원 등록하기
          </Link>
        </div>
      </section>

      {/* ════════════════════════════════════════
          섹션 2 — 소개 (좌측 정렬, 제목+설명 세로 배치)
      ════════════════════════════════════════ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <h2 className="max-w-lg text-3xl font-bold leading-snug text-slate-900 md:text-4xl lg:text-5xl">
              경험을 활용해<br />
              K-뷰티 산업 발전에<br />
              기여해 보세요.
            </h2>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="mt-10 max-w-2xl space-y-5 text-base leading-relaxed text-slate-600">
              <p>
                K-뷰티 브랜드는 제품 기획, 제조, 유통, 마케팅, 해외 진출 등 다양한 의사결정을 내려야 합니다. 실무 경험이 없다면 방향을 잡기 어려운 경우가 많습니다.
              </p>
              <p>
                <strong className="text-slate-900">그 해답은 당신의 경험에 있습니다.</strong>
              </p>
              <p>
                VIALOCAL 자문위원은 브랜드와 실무 경험을 공유하고 자문료를 받습니다.<br />
                브랜드 운영, 제조, 유통, 마케팅, 글로벌 비즈니스 등 각 분야의 전문가라면 참여할 수 있습니다.
              </p>
              <p>
                VIALOCAL 자문위원으로서 브랜드와 어떻게 협력할 수 있는지 확인해보세요.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════
          섹션 3 — 가치 제안 (3열 카드, 핑크 배경)
      ════════════════════════════════════════ */}
      <section className="bg-[#faf5f5] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              VIALOCAL을 선택해야 하는 이유
            </h2>
            <p className="mt-3 max-w-2xl text-slate-500">
              보유한 실무 경험과 전문성을 바탕으로 브랜드의 중요한 의사결정을 지원할 수 있습니다. 현직이거나 이전 경력을 보유한 전문가 모두 자유롭게 참여할 수 있습니다.
            </p>
          </FadeIn>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {valueCards.map(({ title, desc, Icon }, idx) => (
              <FadeIn key={title} delay={idx * 100}>
                <div className="flex flex-col gap-4">
                  <div className="text-slate-700">
                    <Icon />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                  <p className="text-sm leading-relaxed text-slate-500">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          섹션 4 — 프로세스 (수직 리스트, 글씨 크게)
      ════════════════════════════════════════ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              자문위원 참여 프로세스
            </h2>
          </FadeIn>

          <div className="mt-14 divide-y divide-slate-200">
            {processSteps.map(({ Icon, title, desc }, idx) => (
              <FadeIn key={title} delay={idx * 80}>
                <div className="flex items-center gap-10 py-10 lg:py-12">
                  {/* 아이콘 */}
                  <div className="flex-shrink-0 text-slate-400">
                    <Icon />
                  </div>
                  {/* 제목 + 설명 */}
                  <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-0">
                    <h3 className="w-full text-xl font-bold text-slate-900 lg:w-64 lg:text-2xl lg:flex-shrink-0">
                      {title}
                    </h3>
                    <p className="text-base leading-relaxed text-slate-500 lg:text-lg">
                      {desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          섹션 4.5 — 비즈니스 파트너십 (이미지 + 텍스트)
      ════════════════════════════════════════ */}
      <section className="bg-[#f0f4f8] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* 가로형 이미지 */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-200">
              <Image
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80&fit=crop"
                alt="글로벌 비즈니스 파트너십"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* 텍스트 */}
            <FadeIn>
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                파트너십
              </p>
              <h2 className="mt-4 text-2xl font-bold text-slate-900 md:text-3xl">
                자문을 넘어 비즈니스 협업으로
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-500">
                <p>
                  자문 과정에서 비즈니스 적합성이 확인될 경우,
                  유통, 제조, 마케팅 등 다양한 분야의 협업 기회로 이어질 수 있습니다.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          섹션 5 — 하단 CTA (다크 네이비)
      ════════════════════════════════════════ */}
      <section className="bg-[#0a1628] py-24">
        <FadeIn>
          <div className="mx-auto max-w-7xl px-6 text-center">
            <h2 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
              지금 바로 VIALOCAL 자문위원에 등록하세요
            </h2>
            <Link
              href="/advisor/register"
              className="mt-10 inline-block rounded border border-white px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-white hover:text-[#0a1628]"
            >
              자문위원 등록하기
            </Link>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
