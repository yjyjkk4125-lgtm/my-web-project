"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useModal } from "@/context/ModalContext";
import { Repeat, Globe, ShieldCheck, Zap } from "lucide-react";

/* ── FadeIn ───────────────────────────────────────────── */
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

/* ── Icon wrappers ────────────────────────────────────── */
const ICON_SIZE = 96;
const ICON_CLS = "text-slate-800";

function IconRepeat() { return <Repeat size={ICON_SIZE} className={ICON_CLS} strokeWidth={1.25} />; }
function IconGlobe() { return <Globe size={ICON_SIZE} className={ICON_CLS} strokeWidth={1.25} />; }
function IconShieldCheck() { return <ShieldCheck size={ICON_SIZE} className={ICON_CLS} strokeWidth={1.25} />; }
function IconZap() { return <Zap size={ICON_SIZE} className={ICON_CLS} strokeWidth={1.25} />; }

/* ── Section data ─────────────────────────────────────── */
const sections = [
  {
    id: "01",
    label: "지속적인 재자문",
    title: "내 브랜드를 가장 잘 아는 '사외 전략 파트너'를 확보하세요.",
    body: "단발성 상담은 임시방편일 뿐입니다. 비아로컬은 우리 브랜드의 성장 히스토리를 이해하는 전문가와 지속적인 재자문을 통해 전략을 고도화하는 환경을 제공합니다.",
    value:
      "필요할 때마다 다시 찾는 전담 전문가가 있다는 것, 그것만으로도 비즈니스의 속도가 달라집니다.",
    bg: "bg-white",
    reverse: false,
    Icon: IconRepeat,
  },
  {
    id: "02",
    label: "글로벌 비즈니스 가교",
    title: "신뢰가 쌓였다면, 이제 전문가의 '실전 인프라'를 활용하세요.",
    body: "충분한 자문을 통해 신뢰가 형성되었나요? 비아로컬은 단순 조언을 넘어, 전문가가 보유한 현지 유통 채널, 글로벌 네트워크, 각국 법률 및 인증 인프라를 기업이 직접 활용할 수 있도록 가교 역할을 수행합니다.",
    value:
      "상담실 안의 전략이 실제 매출로 이어지는 글로벌 진출의 지름길을 안내합니다.",
    bg: "bg-slate-50",
    reverse: true,
    Icon: IconGlobe,
  },
  {
    id: "03",
    label: "효율적인 리스크 관리",
    title: "고정비 부담은 0원, 검증된 상위 1% 전문가만 매칭합니다.",
    body: "연봉 수천만 원의 해외 사업 담당자를 고용하거나, 검증되지 않은 외부 제안서에 리스크를 걸지 마세요. 비아로컬이 필터링한 현업 리더들에게 필요할 때만 자문을 요청하는 것이 가장 경제적이고 확실한 방법입니다.",
    value:
      "고정비는 대폭 줄이고, 전문성은 대기업 수준으로 높이는 스마트한 비즈니스를 시작하세요.",
    bg: "bg-white",
    reverse: false,
    Icon: IconShieldCheck,
  },
  {
    id: "04",
    label: "실전 솔루션",
    title: "이론은 끝났습니다. 내일 당장 실행 가능한 '현장의 언어'.",
    body: "검색으로는 절대 알 수 없는 현지 시장의 생생한 온도와 실무 눈높이의 해결책을 제시합니다. 지금 이 순간에도 글로벌 현장에서 결과를 내고 있는 전문가들이 당신의 실행력을 지원합니다.",
    value: "",
    bg: "bg-slate-50",
    reverse: true,
    Icon: IconZap,
  },
];

/* ── Page ─────────────────────────────────────────────── */
export default function DifferentiationPage() {
  const { openModal } = useModal();

  return (
    <main>
      {/* ═══════════════════════════════════════════
          Hero
      ═══════════════════════════════════════════ */}
      <section className="relative h-[350px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2000"
          alt="VIALOCAL 차별화"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative flex h-full items-center justify-center px-6 text-center">
          <FadeIn>
            <h1 className="text-3xl font-bold leading-snug text-white md:text-4xl">
              일회성 상담을 넘어,<br className="hidden sm:block" />
              당신의 브랜드가 글로벌 시장에 안착할 때까지 함께합니다.
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          Content Sections
      ═══════════════════════════════════════════ */}
      {sections.map((sec) => (
        <section key={sec.id} className={`${sec.bg} py-20 lg:py-28`}>
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <div
                className={`flex flex-col items-center gap-12 lg:grid lg:grid-cols-10 ${
                  sec.reverse ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* 텍스트 (7/10) */}
                <div
                  className={`w-full lg:col-span-7 ${
                    sec.reverse ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                    {sec.id}. {sec.label}
                  </p>
                  <h2 className="mt-4 text-2xl font-bold leading-snug text-slate-900 md:text-3xl">
                    {sec.title}
                  </h2>
                  <p className="mt-5 leading-relaxed text-slate-500">{sec.body}</p>
                  {sec.value && (
                    <p className="mt-5 text-sm font-medium leading-relaxed text-blue-700">
                      {sec.value}
                    </p>
                  )}
                </div>

                {/* 아이콘 (3/10) */}
                <div
                  className={`flex w-full items-center justify-center py-4 lg:col-span-3 lg:py-0 ${
                    sec.reverse ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <sec.Icon />
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      ))}

      {/* ═══════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <FadeIn>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              지금 바로 검증된 전문가와 연결하세요
            </h2>
            <button
              onClick={openModal}
              className="mt-10 rounded-full bg-blue-600 px-12 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              자문 신청하기
            </button>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
