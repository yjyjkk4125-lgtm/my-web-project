import Image from "next/image";
import Link from "next/link";

const protectedInfo = [
  "브랜드 전략",
  "제품 기획",
  "제조 및 원가 정보",
  "유통 및 계약 내용",
  "마케팅 데이터",
];

const operationalPrinciples = [
  "민감 정보 공유 지양 및 이해상충 가능 시 매칭 제한.",
  "현직 전문가의 회사 기밀 보호 및 직무상 민감 정보 보호 원칙 준수.",
  "자문 범위 외 과도한 정보 요청 제한 및 무단 녹음/외부 공유 제한.",
];

const brandPrinciples = [
  "자문 내용의 외부 공개 제한 및 프로젝트 정보 보호.",
  "필요 시 운영팀 중재 가능.",
];

export default function GuideSecurityPage() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative h-[240px] w-full overflow-hidden md:h-[380px]">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80&fit=crop"
          alt="보안 및 기밀 유지"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px]" />
        <div className="relative mx-auto flex h-full max-w-5xl flex-col justify-end px-6 pb-10 md:pb-16">
          <p
            className="text-[10px] uppercase tracking-widest text-white/50"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
          >
            Guide / Security
          </p>
          <h1
            className="mt-2 text-2xl font-bold leading-snug text-white md:text-[2.25rem]"
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
          >
            보안 및 기밀 유지 원칙
          </h1>
          <p
            className="mt-2 text-sm text-white/90 md:text-base"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
          >
            VIALOCAL은 전문가와 브랜드 간의 신뢰를 중요하게 생각합니다.
          </p>
          <p
            className="mt-1 text-sm text-white/75 md:text-base"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
          >
            실무 자문 과정의 정보는 브랜드 성장과 직결되기에 기밀성과 신뢰를 최우선으로 운영합니다.
          </p>
        </div>
      </section>

      {/* ── Back link ────────────────────────────────── */}
      <div className="border-b border-slate-200 bg-white py-3">
        <div className="mx-auto max-w-5xl px-6">
          <Link
            href="/guide/process"
            className="text-sm text-neutral-500 transition hover:text-neutral-900"
          >
            ← 자문 진행 프로세스 보기
          </Link>
        </div>
      </div>

      {/* ── Section 1: Protected info ────────────────── */}
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-950 md:text-sm">
            자문 중 보호되는 정보
          </h2>
          <ul className="mt-8 space-y-4">
            {protectedInfo.map((item, idx) => (
              <li key={idx} className="flex items-center gap-5">
                <span className="h-px w-5 flex-shrink-0 bg-slate-600" />
                <span className="text-[15px] text-slate-800">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Section 2: Operational principles ───────── */}
      <section className="border-t border-slate-200 bg-[#f7f7f5] py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-950 md:text-sm">
            운영 및 전문가 보호 원칙
          </h2>
          <ul className="mt-8 space-y-5">
            {operationalPrinciples.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-sm leading-relaxed text-slate-700 md:text-[15px]"
              >
                <span className="mt-[9px] h-1 w-1 flex-shrink-0 rounded-full bg-slate-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Section 3: Brand protection ──────────────── */}
      <section className="border-t border-slate-200 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-950 md:text-sm">
            브랜드 보호 원칙
          </h2>
          <ul className="mt-8 space-y-5">
            {brandPrinciples.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-sm leading-relaxed text-slate-700 md:text-[15px]"
              >
                <span className="mt-[9px] h-1 w-1 flex-shrink-0 rounded-full bg-slate-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Closing ──────────────────────────────────── */}
      <section className="border-t border-slate-200 bg-[#f7f7f5] py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-base font-semibold leading-relaxed text-neutral-950 md:text-lg">
            VIALOCAL은 단순 연결 플랫폼이 아니라 신뢰 기반의 실무 자문 환경을 만드는 것을 중요하게 생각합니다.
          </p>
        </div>
      </section>
    </main>
  );
}
