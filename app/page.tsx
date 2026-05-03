"use client";

import Image from "next/image";
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
    region: "필리핀/동남아",
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
    region: "유럽",
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
    region: "중동/글로벌",
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
    region: "베트남",
    title: "B2B 및 물류 최적화 자문위원",
    summary: [
      "베트남 시장 진입을 위한 데이터 기반 B2B 바이어 매칭",
      "베트남향 통합 물류 경로 설계 및 공급망 관리(SCM) 자문",
      "정부 유관기관 수출상담회 초청 바이어 등 공공 협력 사업 수행",
    ],
    detail: {
      mainFields: [
        { label: "B2B 바이어 매칭", desc: "데이터 분석 기반의 한국 유망 상품(건기식, 뷰티 등) 매칭 전략" },
        { label: "물류 프로세스 최적화", desc: "베트남향 물류 경로 설계 및 공급망 관리(SCM)를 통한 비용 절감" },
        { label: "유통/판매 전략", desc: "베트남 온·오프라인 유통 구조를 활용한 판매 활성화 방안 수립" },
      ],
      career: [
        { label: "연차", desc: "7년 이상의 글로벌 이커머스 및 수출 실무 전문가" },
        { label: "주요 이력", desc: "한국-베트남 비즈니스 매칭 및 통합 물류 서비스 운영사 대표" },
        { label: "대외 활동", desc: "정부 산하 유관기관 수출상담회 초청 바이어 등 공공기관 협력 사업 다수 수행" },
      ],
      history: [
        "누적 판매량 42,000건 이상 및 100여 개 이상의 클라이언트 관리 실적 보유",
        "베트남 시장 특화 비즈니스 매칭 플랫폼 기획 및 총괄 운영",
      ],
    },
  },
];

/* ── 메인 페이지 ─────────────────────────────────────────────────── */
export default function Home() {
  const { openModal } = useModal();
  const [selectedAdvisor, setSelectedAdvisor] = useState<(typeof advisors)[0] | null>(null);

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
            K-뷰티 브랜드 컨설팅, 성장 문제를 해결합니다
          </h1>

          {/* 설명 */}
          <p className="mt-14 max-w-lg text-base leading-relaxed text-slate-300 md:text-lg">
            전문가 1:1 자문으로 핵심 문제만 빠르게 정리합니다
          </p>

          {/* 자문 신청 버튼 */}
          <button
            onClick={openModal}
            className="mt-8 rounded-lg bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0a1628]"
          >
            자문 신청하기
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
          섹션 4.5  |  비즈니스 파트너십 (이미지 + 텍스트)
      ════════════════════════════════════════════ */}
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
                자문을 넘어 비즈니스 파트너십으로
              </h2>
              <p className="mt-5 text-base font-medium leading-relaxed text-blue-700">
                VIALOCAL은 단순한 지식 전달을 넘어 실질적인 비즈니스 기회를 연결합니다.
              </p>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-500">
                <p>
                  자문 과정에서 양측의 니즈와 비즈니스 적합성이 확인될 경우, VIALOCAL은 이를 놓치지 않고 실질적인 파트너십으로 이어질 수 있도록 가교 역할을 수행합니다.
                </p>
                <p>
                  현지 시장 진출은 물론, 국내 비즈니스 생태계 내의 유망한 브랜드들과 연결되어 전문가님의 영향력을 더욱 넓혀보세요.
                </p>
              </div>
            </FadeIn>
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
              비아로컬은 각 국가별 시장에 정통한 자문위원과 함께합니다.
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              (분야별 대표 자문위원 일부를 소개합니다.)
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
              비아로컬은 이외에도 국가별·분야별로 세분화된 전문 위원단을 통해 귀사의 가장 확실한 글로벌 파트너가 되어 드립니다.
            </p>
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
              { delay: 0,   label: "검증", title: "엄격한 경력 검증을 통과한 산업별 실무 전문가 그룹" },
              { delay: 120, label: "지식", title: "리포트에는 담기지 않는 현장 실무자들의 생생한 노하우" },
              { delay: 0,   label: "보안", title: "철저한 비밀유지 의무(NDA) 기반의 안전하고 프라이빗한 정보 교환" },
              { delay: 120, label: "효율", title: "시행착오를 줄이는 가장 빠른 방법, 실무자의 경험치를 사는 효율성" },
            ].map((item, idx) => (
              <FadeIn key={idx} delay={item.delay} className="h-full">
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:bg-white/10 lg:p-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">
                    {item.label}
                  </p>
                  <h3 className="mt-3 text-xs font-bold leading-snug text-white md:text-sm lg:text-base">
                    {item.title}
                  </h3>
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
