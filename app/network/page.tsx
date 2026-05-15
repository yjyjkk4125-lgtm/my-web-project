"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useModal } from "@/context/ModalContext";

/* ── FadeIn ─────────────────────────────────────────────── */
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

/* ── 전문가 데이터 ───────────────────────────────────────── */
const experts = [
  {
    id: 1,
    title: "올리브영 입점 및 성장 전략 전문가",
    summary: "올리브영 입점부터 전점포 확장, 매출 성장 전략까지 직접 리딩한 실무 전문가",
    points: [
      "주요 뷰티 브랜드의 올리브영 입점 및 성장 프로젝트 수행",
      "퇴점 후 재입점 및 카테고리 확장 경험",
      "코스메틱 업계 14년 경력",
    ],
    tags: ["올리브영", "입점 전략", "MD 협상", "매출 성장"],
  },
  {
    id: 2,
    title: "글로벌 화장품 기업 23년 차 연구개발 전문가",
    summary: "제형, 성분, 효능, 임상, OEM/ODM까지 제품 개발 전 과정을 자문합니다.",
    points: [
      "글로벌 화장품 기업 연구개발 리더 경력",
      "신규 브랜드 및 제품 개발 총괄",
      "스킨케어 및 더마 전문",
    ],
    tags: ["R&D", "제품 개발", "제형", "OEM/ODM"],
  },
  {
    id: 3,
    title: "글로벌 이커머스 전략 전문가",
    summary: "아마존, 쇼피, 라이브커머스까지 글로벌 커머스 전략을 설계한 전문가",
    points: [
      "글로벌 뷰티 브랜드 이커머스 팀장 경력",
      "라이브커머스 사업 총괄",
      "커머스 업계 17년 경력",
    ],
    tags: ["Amazon", "Shopee", "이커머스", "라이브커머스"],
  },
  {
    id: 4,
    title: "필리핀 현지 유통 및 규제 전문가",
    summary: "필리핀 현지 유통, FDA 등록, TikTok 라이브커머스까지 직접 운영하는 실무형 전문가",
    points: [
      "KOTRA 마닐라 및 대한화장품협회 필리핀 자문위원",
      "필리핀 현지 20년 경력",
      "다수의 K-뷰티 브랜드 현지 운영 대행",
    ],
    tags: ["필리핀", "FDA", "유통", "TikTok Live", "운영 대행"],
  },
  {
    id: 5,
    title: "유럽 현지 유통 및 물류 전문가",
    summary: "유럽 인증, 통관, 물류, 온·오프라인 유통까지 현지 실행 중심 자문을 제공합니다.",
    points: [
      "이탈리아 현지 법인 운영",
      "유럽 현지 26년 경력",
      "글로벌 기업 유럽 진출 프로젝트 수행",
    ],
    tags: ["유럽", "물류", "통관", "유통"],
  },
  {
    id: 6,
    title: "파리 기반 유럽 뷰티 인사이트 전문가",
    summary: "유럽 소비자 인사이트와 글로벌 트렌드 기반의 제품 기획 및 시장 전략을 자문합니다.",
    points: [
      "글로벌 뷰티 트렌드 기업 임원 경력",
      "주요 화장품 기업 프로젝트 수행",
      "국제 뷰티 컨퍼런스 연사",
      "파리 거주 20년",
    ],
    tags: ["유럽 트렌드", "시장 조사", "제품 기획", "글로벌 인사이트"],
  },
  {
    id: 7,
    title: "유럽 화장품 인증 및 규제 전문가",
    summary: "유럽 화장품 인증과 글로벌 규제 대응 및 현지 커뮤니케이션을 지원합니다.",
    points: [
      "네덜란드 현지 거주",
      "CPNP 인증 실무",
      "MoCRA 대응 가능",
      "전문 비즈니스 통역 경험",
    ],
    tags: ["CPNP", "MoCRA", "유럽 인증", "규제", "통역"],
  },
  {
    id: 8,
    title: "중동 GCC 시장 진출 전문가",
    summary: "중동 현지 네트워크와 TikTok Shop 전략을 기반으로 시장 진출을 지원합니다.",
    points: [
      "GCC 시장 프로젝트 수행",
      "글로벌 인플루언서 시딩",
      "TikTok Shop 운영 전략",
      "비즈니스 커뮤니케이션 15년 경력",
    ],
    tags: ["GCC", "중동", "TikTok Shop", "인플루언서"],
  },
  {
    id: 9,
    title: "브랜드 런칭 및 유통 전략 전문가",
    summary: "제품 기획부터 브랜드 런칭, 국내외 유통 전략까지 전 과정을 자문합니다.",
    points: [
      "뷰티 MD 출신",
      "국내외 OEM/ODM 개발 경험",
      "글로벌 20여 개국 운영 경험",
      "16년 경력",
    ],
    tags: ["브랜드 런칭", "제품 기획", "유통 전략"],
  },
  {
    id: 10,
    title: "사업 전략 및 투자 유치 전문가",
    summary: "K-뷰티 글로벌 GTM, 투자 유치, 정부지원사업 및 사업 구조 개선 전략을 자문합니다.",
    points: [
      "미국·중국·인도 시장 진출 전략",
      "3회 창업 및 Exit 경험",
      "청년창업사관학교 전담 교수",
      "TIPS 및 시드 투자 유치 지원",
    ],
    tags: ["K-뷰티", "GTM", "투자 유치", "TIPS", "정부지원사업"],
  },
];

/* ── FAQ 데이터 ─────────────────────────────────────────── */
const faqs = [
  {
    q: "전문가를 직접 선택할 수 있나요?",
    a: "원하는 분야를 기준으로 운영팀이 적합한 전문가를 검토해 연결합니다.",
  },
  {
    q: "어떤 기준으로 매칭되나요?",
    a: "현재 상황, 자문 주제, 우선순위를 종합적으로 검토합니다.",
  },
];

/* ── Page ────────────────────────────────────────────────── */
export default function NetworkPage() {
  const { openModal } = useModal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main>
      {/* ══════════════════════════════════════════
          Hero
      ══════════════════════════════════════════ */}
      <section className="bg-[#faf5f5] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              실무 전문가 네트워크
            </p>
            <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-snug text-slate-900 md:text-4xl">
              브랜드 성장 전반을 지원하는<br className="hidden sm:block" />
              30+ 검증된 전문가 네트워크
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-500">
              브랜드 운영, 제품 개발, 유통, 마케팅, 해외 진출까지.<br className="hidden sm:block" />
              실제 현장에서 결과를 만들어온 전문가들과 연결됩니다.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          대표 전문가 프로필
      ══════════════════════════════════════════ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              대표 전문가 프로필
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500">
              전체 네트워크 중 일부 전문가를 소개합니다.<br className="hidden sm:block" />
              현재 상황과 자문 주제에 따라 적합한 전문가를 검토 후 매칭합니다.
            </p>
          </FadeIn>

          <div className="mt-14 space-y-0 divide-y divide-slate-100">
            {experts.map((expert, idx) => (
              <FadeIn key={expert.id} delay={idx * 60}>
                <div className="py-10">
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 text-xs font-bold tabular-nums text-blue-400">
                      {String(expert.id).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900">
                        {expert.title}
                      </h3>
                      <p className="mt-2 leading-relaxed text-slate-600">
                        {expert.summary}
                      </p>
                      <ul className="mt-4 space-y-2">
                        {expert.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-2 text-sm text-slate-700"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                            {point}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {expert.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          운영 방식 안내
      ══════════════════════════════════════════ */}
      <section className="bg-slate-50 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              자문 주제에 따라 적합한 전문가를 검토 후 매칭합니다
            </h2>
            <p className="mt-5 max-w-2xl leading-relaxed text-slate-600">
              프로필 페이지에는 전체 네트워크 중 일부 전문가만 소개되어 있습니다.<br className="hidden sm:block" />
              자문 신청 후 현재 상황과 필요한 주제를 검토한 뒤 적합한 전문가 정보를 안내해드립니다.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              자주 묻는 질문
            </h2>
          </FadeIn>

          <div className="mt-8 space-y-3">
            {faqs.map((faq, idx) => (
              <FadeIn key={idx} delay={idx * 80}>
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="flex w-full items-center justify-between px-6 py-4 text-left text-base font-semibold text-slate-800 transition hover:bg-slate-50"
                  >
                    <span>Q. {faq.q}</span>
                    <svg
                      className={`h-5 w-5 flex-shrink-0 text-slate-400 transition-transform duration-300 ${
                        openFaq === idx ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {openFaq === idx && (
                    <div className="border-t border-slate-100 px-6 py-4">
                      <p className="text-sm leading-relaxed text-slate-600">
                        A. {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA
      ══════════════════════════════════════════ */}
      <section className="bg-[#faf5f5] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              현재 상황에 맞는 전문가를 연결해드립니다
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">
              브랜드 운영, 제품 개발, 유통, 마케팅, 해외 진출까지<br className="hidden sm:block" />
              필요한 주제에 맞는 실무 전문가와 연결해드립니다.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={openModal}
                className="rounded-lg bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              >
                자문 신청하기
              </button>
              <Link
                href="/clients"
                className="text-sm font-semibold text-slate-600 underline-offset-2 transition hover:text-blue-600 hover:underline"
              >
                서비스 소개 보기
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
