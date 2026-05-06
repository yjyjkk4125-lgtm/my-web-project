"use client";

import Image from "next/image";
import Link from "next/link";
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

/* ── 자문위원단 데이터 ───────────────────────────────────────────── */
const advisors = [
  {
    id: 1,
    region: "글로벌 유통 / 동남아",
    title: "실무 자문위원",
    summary: [
      "500개 이상의 브랜드 자문 및 필리핀 식약처(FDA)/IOR 실무 총괄",
      "KOTRA 마닐라 대한화장품협회 필리핀 자문위원",
      "에스터포뮬라·메디힐·VT 등 국내 톱 브랜드 현지 운영 및 이커머스 대행",
    ],
    detail: {
      mainFields: [
        { label: "필리핀 유통 총괄", desc: "20년 경력의 현지 유통 및 500개 이상 브랜드 자문" },
        { label: "규제 및 인증", desc: "필리핀 식약처 등록 실무 및 수입 대행(IOR) 운영 총괄" },
        { label: "이커머스/라이브", desc: "쇼피·틱톡샵·라자다 공식 스토어 운영 및 라이브 커머스 실행" },
        { label: "마케팅", desc: "현지 인플루언서 네트워크 기반 마케팅 및 브랜딩 전략 수립" },
      ],
      career: [
        { label: "공식 자문", desc: "무역 진흥 기관 및 공신력 있는 화장품 협회 필리핀 자문위원" },
        { label: "브랜드 파트너", desc: "국내 톱티어 코스메틱 브랜드(M사, V사, R사 등) 현지 운영 대행" },
        { label: "저서", desc: "글로벌 뷰티 시장 진출 및 유통 실무 가이드북 저자" },
        { label: "경력", desc: "20년 실무 경력의 현지 비즈니스 전문가" },
      ],
      history: [
        "글로벌 마케팅 및 유통 전문 기업 대표이사",
        "필리핀 뷰티 & 헬스케어 독점 유통 및 인증 실무 총괄",
        "현지 대형 드럭스토어 입점 및 온·오프라인 유통망 구축",
        "국내 주요 코스메틱 브랜드 필리핀 지사 대표이사 및 현지 법인 운영",
      ],
    },
  },
  {
    id: 2,
    region: "글로벌 진출 / 유럽",
    title: "현지 유통 및 물류 자문위원",
    summary: [
      "이탈리아 기반 유럽 전역 온·오프라인 유통망 입점 지원",
      "현지 법인 설립 세팅 및 브랜드 현지화 전략 수립",
      "26년 차 유럽 시장 진출 실무 및 대기업 장기 파트너십 보유",
    ],
    detail: {
      mainFields: [
        { label: "유럽 진출 전략", desc: "유럽 현지 유통망 입점, 브랜드 현지화, 현지 법인 설립 세팅 전문" },
        { label: "물류/통관 실무", desc: "26년 차 이탈리아 관련 인/아웃바운드 유통 및 물류 통관 실무" },
        { label: "전문 수출 서비스", desc: "해외직구 및 유럽 명품, 코스메틱 수출 전문 자문" },
      ],
      career: [
        { label: "연차", desc: "26년 차 유럽 현지 유통 및 물류 전문가" },
        { label: "주요 이력", desc: "유럽 현지 유통 및 물류 전문 법인 대표 역임" },
        { label: "핵심 역량", desc: "국내 대기업과 장기적 파트너십 보유, 현지 기반의 체계적인 유통 인프라 활용 전문가" },
      ],
      history: [
        "유럽 내 K-뷰티 전문 유통망 구축 및 운영 총괄",
        "현지 시장 특성에 맞춘 브랜드 포지셔닝 및 현지화 전략 컨설팅",
        "복잡한 유럽 물류 및 관세 체계 최적화 솔루션 제공",
      ],
    },
  },
  {
    id: 3,
    region: "글로벌 마케팅 / 중동",
    title: "마케팅 자문위원",
    summary: [
      "사우디/중동(GCC) 현지 비즈니스 네트워크 및 바이어 매칭",
      "틱톡샵 및 인플루언서 시딩 기반의 글로벌 마케팅 최적화",
      "브랜드 스토리텔링 중심의 현지 맞춤형 GTM 전략 수립",
    ],
    detail: {
      mainFields: [
        { label: "중동 네트워크", desc: "사우디아라비아 및 중동(GCC) 현지 네트워크 매칭 및 협업 지원" },
        { label: "시장 조사", desc: "현지 소비자 반응 확인을 위한 포커스 그룹 조사(FGI) 설계 및 운영" },
        { label: "마케팅 전략", desc: "글로벌 숏폼 마케팅, GTM 플랜 구축, 글로벌 인플루언서 시딩 총괄" },
      ],
      career: [
        { label: "연차", desc: "15년 경력의 글로벌 비즈니스 커뮤니케이션 전문가" },
        { label: "주요 이력", desc: "글로벌 마케팅 및 브랜딩 에이전시 대표" },
        { label: "브랜드 스토리텔링", desc: "브랜드 고유의 가치를 현지 맥락에 맞게 재구성하는 전략 전문가" },
      ],
      history: [
        "중동 지역 인플루언서 시딩 프로젝트 총괄 및 20여 개 브랜드 매칭 성공",
        "두바이 현지 인프라 협업을 통한 맞춤형 비주얼 콘텐츠 촬영 및 홍보",
        "중동 진출 전략 세미나 호스트 및 글로벌 이커머스 실무 교육 기획",
      ],
    },
  },
  {
    id: 4,
    region: "국내 유통 전문 / 한국",
    title: "뷰티 온·오프라인 유통 전략 전문가",
    summary: [
      "수입 브랜드 총판 및 면세점 MD 역임",
      "온·오프라인 MD 총괄 및 유통, 컨설팅",
      "성수 팝업스토어 및 오프라인 매장 구축 자문",
    ],
    detail: {
      mainFields: [
        { label: "국내 유통망 매칭", desc: "면세점, 백화점, 대형마트, 홈쇼핑, 소셜 공구 등 전 채널 입점 및 유통 구조 설계" },
        { label: "오프라인 경험 설계", desc: "성수동 등 주요 거점 팝업스토어 기획, 오프라인 매장 구축 및 MD 총괄 자문" },
        { label: "채널 최적화", desc: "브랜드 특성에 맞는 온·오프라인 믹스 전략 및 수익 구조 최적화 가이드" },
      ],
      career: [
        { label: "연차", desc: "10년 경력의 뷰티 유통 및 MD 실무 전문가" },
        { label: "주요 이력", desc: "전) 수입 브랜드 총판 및 면세점 MD 역임" },
        { label: "현재", desc: "현) 온·오프라인 MD 총괄 및 유통/브랜딩 컨설팅 대표" },
      ],
      history: [
        "수입 브랜드 총판 운영을 통한 국내 시장 안착 및 유통망 확장 프로젝트 성공",
        "성수동 팝업스토어 및 주요 오프라인 거점 MD 구성을 통한 브랜드 인지도 제고 프로젝트 총괄",
        "10년 이상의 실무 네트워크를 기반으로 한 국내 뷰티 브랜드 온·오프라인 입점 및 자문 수행",
      ],
    },
  },
];

/* ── FAQ 데이터 ───────────────────────────────────────────────── */
const faqs = [
  {
    q: "어떤 전문가가 연결되나요?",
    a: "실무 경험을 기반으로 요청에 맞는 전문가를 매칭합니다.",
  },
  {
    q: "비용은 어떻게 되나요?",
    a: "전문가의 경력 및 자문 내용에 따라 비용이 달라집니다.",
  },
  {
    q: "바로 진행 가능한가요?",
    a: "요청 후 24시간 이내 연결 가능 여부를 안내드립니다.",
  },
];

/* ── 메인 페이지 ─────────────────────────────────────────────────── */
export default function Home() {
  const { openModal } = useModal();
  const [selectedAdvisor, setSelectedAdvisor] = useState<(typeof advisors)[0] | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
            K-뷰티 브랜드 성장 문제를 해결하는 실무 자문
          </h1>

          {/* 설명 */}
          <p className="mt-14 max-w-lg text-base leading-relaxed text-slate-300 md:text-lg">
            해외 진출, 마케팅, 유통, 운영 등 실무 전반을 다룹니다
          </p>

          {/* 버튼 그룹 */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={openModal}
              className="rounded-lg bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0a1628]"
            >
              자문 신청하기
            </button>
            <Link
              href="/advisor/register"
              className="rounded-lg bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0a1628]"
            >
              전문가 참여
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          섹션 A  |  이렇게 진행됩니다  |  연한 그레이-블루
      ════════════════════════════════════════════ */}
      <section className="bg-[#f0f4f8] py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              진행 방식
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
              이렇게 진행됩니다
            </h2>
          </FadeIn>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                delay: 0,
                step: "1",
                title: "문제 입력",
                desc: "현재 고민을 간단히 작성합니다.",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                ),
              },
              {
                delay: 120,
                step: "2",
                title: "전문가 매칭",
                desc: "적합한 실무 경험자를 연결합니다.",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
              {
                delay: 240,
                step: "3",
                title: "자문 진행",
                desc: "필요한 방식으로 빠르게 문제를 정리합니다.",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
            ].map((card, idx) => (
              <FadeIn key={idx} delay={card.delay}>
                <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      {card.icon}
                    </div>
                    <span className="text-xs font-bold text-blue-400">STEP {card.step}</span>
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
          섹션 B  |  다양한 실무 문제  |  화이트
      ════════════════════════════════════════════ */}
      <section className="bg-white py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              자문 분야
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
              다양한 실무 문제를 다룹니다
            </h2>
            <p className="mt-4 max-w-2xl text-slate-500">
              해외 진출, 마케팅, 유통, 운영 등 브랜드 성장 전반의 이슈를 함께 정리합니다
            </p>
          </FadeIn>

          {/* 이미지 3열 (데스크탑), 1열 (모바일) */}
          <div className="mt-12">
            {/* 모바일: 대표 이미지 1개 */}
            <FadeIn>
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-100 lg:hidden">
                <Image
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80&fit=crop"
                  alt="글로벌 비즈니스 전략"
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            </FadeIn>

            {/* 데스크탑: 3열 */}
            <div className="hidden gap-6 lg:grid lg:grid-cols-3">
              {[
                {
                  delay: 0,
                  src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80&fit=crop",
                  alt: "글로벌 비즈니스 전략",
                  label: "글로벌 진출",
                },
                {
                  delay: 120,
                  src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&fit=crop",
                  alt: "마케팅 데이터 분석",
                  label: "마케팅 전략",
                },
                {
                  delay: 240,
                  src: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80&fit=crop",
                  alt: "뷰티 브랜드 운영",
                  label: "유통 · 운영",
                },
              ].map((img, idx) => (
                <FadeIn key={idx} delay={img.delay}>
                  <div className="overflow-hidden rounded-2xl bg-slate-100">
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover transition duration-500 hover:scale-105"
                        sizes="(max-width: 1280px) 33vw, 400px"
                      />
                    </div>
                    <div className="px-4 py-3">
                      <p className="text-sm font-semibold text-slate-700">{img.label}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          자문위원단  |  Footer 배경색 (#faf5f5)
      ════════════════════════════════════════════ */}
      <section className="bg-[#faf5f5] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              전문 자문위원단
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-bold text-slate-900 md:text-4xl">
              실무 경험 기반 전문가 네트워크
            </h2>
            <p className="mt-3 max-w-2xl text-slate-500">
              브랜드 성장 전반의 문제를 다루는 실무 전문가를 연결합니다
            </p>
            <p className="mt-2 text-sm text-slate-400">
              (아래는 일부 분야 예시입니다)
            </p>
          </FadeIn>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {advisors.map((advisor, idx) => (
              <FadeIn key={advisor.id} delay={idx * 100}>
                <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                  <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                    {advisor.region}
                  </p>
                  <h3 className="mt-2 text-base font-bold text-slate-900">
                    {advisor.title}
                  </h3>
                  <ul className="mt-4 flex-1 space-y-2">
                    {advisor.summary.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs leading-relaxed text-slate-500">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setSelectedAdvisor(advisor)}
                    className="mt-5 rounded-lg border border-blue-200 px-4 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-50"
                  >
                    상세보기
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-14">
            <p className="text-sm leading-relaxed text-slate-500">
              다양한 분야의 실무 전문가 네트워크를 통해 브랜드 상황에 맞는 자문을 제공합니다
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          이런 분께 적합합니다  |  화이트
      ════════════════════════════════════════════ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              적합한 대상
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
              이런 분께 적합합니다
            </h2>
          </FadeIn>

          <div className="mt-10 space-y-4">
            {[
              "브랜드 운영 중 중요한 의사결정이 필요한 경우",
              "현재 문제를 빠르게 정리하고 싶은 팀",
              "실행 전략을 구체화하고 싶은 경우",
            ].map((item, idx) => (
              <FadeIn key={idx} delay={idx * 80}>
                <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 px-6 py-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                    {idx + 1}
                  </span>
                  <p className="text-base font-medium text-slate-800">{item}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FAQ  |  미색 (#FAF9F6)
      ════════════════════════════════════════════ */}
      <section className="bg-[#FAF9F6] py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <h2 className="text-center text-3xl font-bold text-slate-900 md:text-4xl">
              자주 묻는 질문
            </h2>
          </FadeIn>

          <div className="mt-10 space-y-3">
            {faqs.map((faq, idx) => (
              <FadeIn key={idx} delay={idx * 80}>
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="flex w-full items-center justify-between px-6 py-4 text-left text-base font-semibold text-slate-800 transition hover:bg-slate-50"
                  >
                    <span>Q. {faq.q}</span>
                    <svg
                      className={`h-5 w-5 flex-shrink-0 text-slate-400 transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === idx && (
                    <div className="border-t border-slate-100 px-6 py-4">
                      <p className="text-sm leading-relaxed text-slate-600">A. {faq.a}</p>
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>

          {/* FAQ 하단 CTA */}
          <FadeIn className="mt-12 flex justify-center">
            <button
              onClick={openModal}
              className="rounded-xl bg-blue-600 px-10 py-4 text-base font-semibold text-white shadow-md transition hover:bg-blue-500 active:scale-[0.98]"
            >
              자문 신청하기
            </button>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 자문위원 상세 모달 ═══ */}
      {selectedAdvisor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setSelectedAdvisor(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedAdvisor(null)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200"
              aria-label="닫기"
            >
              ✕
            </button>

            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              {selectedAdvisor.region}
            </p>
            <h3 className="mt-1 text-xl font-bold text-slate-900">
              {selectedAdvisor.title}
            </h3>

            <div className="mt-6 space-y-6 text-left">
              <div>
                <p className="font-bold text-slate-900">주요 자문 분야</p>
                <ul className="mt-3 space-y-2">
                  {selectedAdvisor.detail.mainFields.map((f, i) => (
                    <li key={i} className="text-sm leading-relaxed text-slate-600">
                      <span className="font-semibold text-slate-800">{f.label}:</span>{" "}
                      {f.desc}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-bold text-slate-900">연차 및 경력</p>
                <ul className="mt-3 space-y-2">
                  {selectedAdvisor.detail.career.map((c, i) => (
                    <li key={i} className="text-sm leading-relaxed text-slate-600">
                      <span className="font-semibold text-slate-800">{c.label}:</span>{" "}
                      {c.desc}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-bold text-slate-900">주요 이력</p>
                <ul className="mt-3 space-y-2">
                  {selectedAdvisor.detail.history.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-slate-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
