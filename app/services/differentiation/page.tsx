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
    title: "필요한 순간마다 다시 자문할 수 있습니다.",
    summary: "단발성 상담으로 끝나지 않고 필요할 때마다 다시 연결됩니다.",
    points: [
      "이전 자문 내용을 바탕으로 연속적인 논의 가능",
      "브랜드 상황을 이해한 전문가와 지속적으로 소통",
      "중요한 의사결정을 반복적으로 점검",
    ],
    value:
      "우리 브랜드를 이해하는 전문가가 있다는 것만으로도 의사결정의 속도가 달라집니다.",
    bg: "bg-white",
    reverse: false,
    Icon: IconRepeat,
  },
  {
    id: "02",
    label: "전문가 매칭",
    title: "현재 문제에 맞는 실무 전문가와 연결됩니다.",
    summary: "상황과 자문 주제에 따라 가장 적합한 전문가를 매칭합니다.",
    points: [
      "브랜드 운영 및 성장",
      "제조 및 OEM·ODM",
      "유통, 마케팅, 이커머스, 해외 진출",
    ],
    value: "필요한 분야의 실무 경험을 정확하게 연결합니다.",
    bg: "bg-slate-50",
    reverse: true,
    Icon: IconGlobe,
  },
  {
    id: "03",
    label: "효율적인 활용",
    title: "필요한 만큼만 전문성을 활용할 수 있습니다.",
    summary: "전담 인력 채용 없이 필요한 순간에 전문성을 활용할 수 있습니다.",
    points: [
      "1회 단위 자문 가능",
      "고정비 부담 최소화",
      "필요한 주제만 선택 가능",
    ],
    value: "필요할 때만 전문성을 활용하는 가장 효율적인 방식입니다.",
    bg: "bg-white",
    reverse: false,
    Icon: IconShieldCheck,
  },
  {
    id: "04",
    label: "실전 솔루션",
    title: "바로 실행할 수 있는 현실적인 답을 얻습니다.",
    summary: "추상적인 조언이 아니라 실행 가능한 방향을 확인할 수 있습니다.",
    points: [
      "현재 문제의 핵심 정리",
      "우선순위 설정",
      "다음 실행 단계 구체화",
    ],
    value: "자문이 끝나면 무엇을 해야 할지 더 명확해집니다.",
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
              왜 많은 브랜드가<br className="hidden sm:block" />
              VIALOCAL을 선택할까요?
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
                  <p className="mt-4 leading-relaxed text-slate-600">{sec.summary}</p>
                  <ul className="mt-5 space-y-3">
                    {sec.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-slate-700">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  {sec.value && (
                    <p className="mt-6 font-semibold leading-relaxed text-blue-600">
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
