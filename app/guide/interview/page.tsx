import Image from "next/image";
import Link from "next/link";

const steps = [
  {
    num: "01",
    label: "준비",
    desc: "자문 전 현재 브랜드 상황과 목표, 질문 우선순위를 정리해두면 훨씬 밀도 있는 대화가 가능합니다.",
  },
  {
    num: "02",
    label: "시작",
    desc: "인터뷰 초반에는 오늘 자문의 목적과 현재의 가장 큰 고민을 충분히 설명하는 것이 중요합니다.",
  },
  {
    num: "03",
    label: "관계 형성",
    desc: "일방적인 질문보다 전문가가 경험을 충분히 설명할 수 있도록 경청하며 자연스러운 대화 흐름을 만듭니다.",
  },
  {
    num: "04",
    label: "깊이 있는 질문",
    desc: "전문가의 답변 중 흥미로운 지점에서 '왜 그렇게 생각하시는지' 꼬리 질문을 던져 깊이 있는 인사이트를 끌어냅니다.",
  },
  {
    num: "05",
    label: "마무리",
    desc: '"오늘 가장 먼저 실행해야 할 한 가지는 무엇인가요?"와 같은 질문으로 실행 우선순위를 체크합니다.',
  },
  {
    num: "06",
    label: "정리 및 실행",
    desc: "자문 직후 메모를 정리하고 실제 적용 가능한 항목을 우선 체크합니다. 필요 시 추가 자문을 연결합니다.",
  },
];

const badQuestions = ["우리 브랜드 잘 될까요?"];

const goodQuestions = [
  "현재 광고 효율이 낮은데 가장 먼저 점검해야 할 부분이 무엇일까요?",
  "현재 브랜드 포지셔닝에서 가장 큰 리스크는 무엇일까요?",
];

export default function GuideInterviewPage() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative h-[240px] w-full overflow-hidden md:h-[380px]">
        <Image
          src="https://images.unsplash.com/photo-1560472355-536de3962603?w=1600&q=80&fit=crop"
          alt="전문가 비즈니스 자문"
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
            Guide / Interview
          </p>
          <h1
            className="mt-2 text-2xl font-bold leading-snug text-white md:text-[2.25rem]"
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
          >
            전문가 인터뷰 진행 가이드
          </h1>
          <p
            className="mt-2 text-sm text-white/90 md:text-base"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
          >
            좋은 인터뷰는 단순 질문이 아니라 깊이 있는 대화에서 시작됩니다.
          </p>
          <p
            className="mt-1 text-sm text-white/75 md:text-base"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
          >
            전문가 자문은 현재 문제를 함께 정리하고 방향성을 점검하는 과정입니다.
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

      {/* ── Section 1: Interview is conversation ─────── */}
      <section className="border-b border-slate-200 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-950 md:text-sm">
            인터뷰는 &ldquo;질문&rdquo;보다 &ldquo;대화&rdquo;에 가깝습니다
          </h2>
          <div className="mt-6 space-y-4">
            <p className="text-[15px] leading-[1.85] text-slate-800">
              효과적인 자문은 심문처럼 진행되지 않습니다. 준비된 질문을 기반으로 자연스럽게 흐르는 대화가 중요합니다.
            </p>
            <p className="text-[15px] leading-[1.85] text-slate-800">
              좋은 인터뷰는 예상하지 못했던 인사이트로 이어지기도 합니다.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 2: 6 Steps ──────────────────────── */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-950 md:text-sm">
            인터뷰를 효과적으로 진행하는 6단계
          </h2>
          <div className="mt-8">
            {steps.map((step, idx) => (
              <div key={idx} className="border-t border-slate-200 py-10">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                  STEP {step.num}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-neutral-950 md:text-xl">
                  {step.label}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-700">{step.desc}</p>
              </div>
            ))}
            <div className="border-t border-slate-200" />
          </div>
        </div>
      </section>

      {/* ── Section 3: Good vs Bad questions ─────────── */}
      <section className="border-t border-slate-200 bg-[#f7f7f5] py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-950 md:text-sm">
            좋은 질문 vs 아쉬운 질문
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="border border-slate-200 bg-white p-6">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                아쉬운 질문
              </p>
              <div className="mt-5 space-y-3 border-l-2 border-slate-200 pl-4">
                {badQuestions.map((q, idx) => (
                  <p key={idx} className="text-[15px] leading-[1.75] text-slate-500">
                    &ldquo;{q}&rdquo;
                  </p>
                ))}
              </div>
            </div>
            <div className="border border-neutral-800 bg-white p-6">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-950">
                좋은 질문
              </p>
              <div className="mt-5 space-y-4 border-l-2 border-neutral-800 pl-4">
                {goodQuestions.map((q, idx) => (
                  <p key={idx} className="text-[15px] leading-[1.75] text-slate-700">
                    &ldquo;{q}&rdquo;
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: Principles ───────────────────── */}
      <section className="border-t border-slate-200 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-950 md:text-sm">
            인터뷰 중 중요하게 생각하는 원칙
          </h2>
          <ul className="mt-8 space-y-5">
            <li className="flex items-center gap-5">
              <span className="h-px w-5 flex-shrink-0 bg-slate-600" />
              <span className="text-[15px] text-slate-800">
                상호 신뢰 기반의 자문 환경 유지를 중요하게 생각합니다.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* ── Bottom CTA ──────────────────────────────── */}
      <section className="border-t border-slate-200 bg-[#f7f7f5] py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            href="/guide/security"
            className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-700 transition hover:text-neutral-950"
          >
            다음 가이드 확인하기
            <span className="text-neutral-400 transition group-hover:text-neutral-950">→</span>
            <span className="text-neutral-500 transition group-hover:text-neutral-950">
              보안 및 기밀 유지 원칙
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
