import Image from "next/image";
import Link from "next/link";

const reasons = [
  {
    title: "시간의 밀도",
    desc: "같은 자문 시간이어도 준비 정도에 따라 얻는 인사이트는 크게 달라질 수 있습니다.",
  },
  {
    title: "구체적 방향성",
    desc: "막연한 고민보다 현재 상황과 목표를 함께 정리하면 더 현실적인 방향성을 얻을 수 있습니다.",
  },
  {
    title: "전문가 시각",
    desc: "전문가 역시 현재 상황을 이해해야 더 구체적인 조언이 가능합니다.",
  },
];

const prepItems = [
  {
    label: "현재 상황",
    desc: "브랜드 단계, 판매 채널, 현재 가장 큰 문제",
  },
  {
    label: "목표",
    desc: "올리브영 입점, 해외 진출, 제품 출시, 광고 효율 개선",
  },
  {
    label: "지금까지 진행한 내용",
    desc: "광고 집행 여부, 유통 진행 상황, 제조 및 개발 상태",
  },
  {
    label: "가장 궁금한 질문",
    desc: "무엇부터 해야 하는지, 왜 성과가 안 나는지, 어떤 방향이 맞는지",
  },
];

const goodQuestions = [
  "올리브영 입점을 준비 중인데 무엇부터 시작해야 할까요?",
  "광고는 집행 중인데 매출 전환이 잘 안 됩니다.",
  "미국 진출을 고민 중인데 어떤 채널부터 보는 게 좋을까요?",
  "현재 브랜드 방향성이 맞는지 점검받고 싶습니다.",
];

const tips = [
  '질문은 구체적일수록 좋습니다. "잘 될까요?"보다 현재 상황을 함께 설명하는 것이 중요합니다.',
  "전문가의 답변은 단순 정답보다 현업 경험 기반 인사이트에 가깝습니다.",
  "예상과 다른 답변에서도 중요한 방향성을 발견할 수 있습니다.",
];

export default function GuidePreparationPage() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative h-[240px] w-full overflow-hidden md:h-[380px]">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80&fit=crop"
          alt="비즈니스 전략 계획"
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
            Guide / Preparation
          </p>
          <h1
            className="mt-2 text-2xl font-bold leading-snug text-white md:text-[2.25rem]"
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
          >
            자문 준비 가이드
          </h1>
          <p
            className="mt-2 text-sm text-white/90 md:text-base"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
          >
            현재 상황과 고민을 미리 정리하면 자문을 훨씬 더 밀도 있게 활용할 수 있습니다.
          </p>
          <p
            className="mt-1 text-sm text-white/75 md:text-base"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
          >
            VIALOCAL은 실무 경험 기반의 현실적인 인사이트를 연결합니다.
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

      {/* ── Section 1: Why prepare ───────────────────── */}
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-950 md:text-sm">
            왜 준비가 중요한가
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3">
            {reasons.map((item, idx) => (
              <div key={idx} className="border-t-2 border-neutral-800 pt-5">
                <h3 className="text-base font-semibold text-neutral-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2: What to prepare ──────────────── */}
      <section className="border-t border-slate-200 bg-[#f7f7f5] py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-950 md:text-sm">
            자문 전 꼭 정리하면 좋은 내용
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {prepItems.map((item, idx) => (
              <div key={idx} className="border border-slate-200 bg-white p-6">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                  {item.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Good question examples ───────── */}
      <section className="border-t border-slate-200 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-950 md:text-sm">
            좋은 질문 예시
          </h2>
          <div className="mt-8 space-y-4 border-l-2 border-slate-400 pl-5">
            {goodQuestions.map((q, idx) => (
              <p key={idx} className="py-0.5 text-[15px] leading-[1.75] text-slate-700">
                &ldquo;{q}&rdquo;
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Tips ─────────────────────────── */}
      <section className="border-t border-slate-200 bg-[#f7f7f5] py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-950 md:text-sm">
            자문을 더 잘 활용하는 방법
          </h2>
          <ul className="mt-8 space-y-5">
            {tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-5">
                <span className="mt-[11px] h-px w-5 flex-shrink-0 bg-slate-600" />
                <span className="text-[15px] leading-relaxed text-slate-800">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Bottom CTA ──────────────────────────────── */}
      <section className="border-t border-slate-200 bg-white py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            href="/guide/interview"
            className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-700 transition hover:text-neutral-950"
          >
            다음 가이드 보기
            <span className="text-neutral-400 transition group-hover:text-neutral-950">→</span>
            <span className="text-neutral-500 transition group-hover:text-neutral-950">
              전문가 인터뷰 진행 가이드
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
