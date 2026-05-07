import Image from "next/image";

const steps = [
  {
    num: "01",
    title: "자문 신청",
    body: ["현재 고민하고 있는 문제와 필요한 자문 내용을 작성합니다."],
    examples: [
      "올리브영 입점을 준비 중인데 무엇부터 시작해야 할지 모르겠어요.",
      "광고는 집행 중인데 매출로 잘 이어지지 않고 있어요.",
      "해외 진출을 고민 중인데 어떤 국가부터 시작해야 할지 궁금합니다.",
      "현재 브랜드 방향성과 제품 전략에 대한 실무 조언이 필요해요.",
    ],
    note: "명확하지 않은 고민이어도 괜찮습니다.\n현재 상황을 함께 정리하는 것부터 시작할 수 있습니다.",
  },
  {
    num: "02",
    title: "전문가 매칭",
    body: [
      "등록된 내용을 바탕으로 적합한 실무 전문가를 검토 및 매칭합니다.",
      "전문 분야와 브랜드 상황을 고려해 운영팀이 직접 연결을 진행합니다.",
    ],
    examples: [],
    note: null,
  },
  {
    num: "03",
    title: "일정 조율 및 확정",
    body: [
      "자문 주제와 일정에 맞는 전문가를 연결한 뒤 가능한 일정을 조율하여 자문이 진행됩니다.",
      "필요 시 사전 질문이나 자료 요청이 진행될 수 있습니다.",
    ],
    examples: [],
    note: null,
  },
  {
    num: "04",
    title: "실시간 자문 진행",
    body: [
      "정해진 시간 동안 현재 문제와 방향성에 대한 실무 자문이 진행됩니다.",
      "단순 이론보다 현업 경험 기반의 현실적인 조언을 중요하게 생각합니다.",
    ],
    examples: [],
    note: null,
  },
  {
    num: "05",
    title: "자문 완료 및 결제",
    body: [
      "자문 진행 이후 안내된 방식에 따라 결제가 진행됩니다.",
      "필요 시 추가 자문 및 후속 연결도 가능합니다.",
    ],
    examples: [],
    note: null,
  },
];

const principles = [
  "실무 경험 기반 자문",
  "브랜드 상황에 맞는 방향 제시",
  "전문가와 브랜드 간의 신뢰",
  "현실적인 문제 해결 중심 접근",
];

const notices = [
  "전문가 일정에 따라 일정 조율 시간이 달라질 수 있습니다.",
  "일부 전문 분야는 매칭까지 추가 시간이 필요할 수 있습니다.",
  "모든 자문은 전문가의 실제 경험과 실무 기반 의견으로 진행됩니다.",
  "자문은 문제 해결 방향성을 함께 고민하는 과정이며 결과를 보장하지 않습니다.",
];

export default function GuideProcessPage() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative h-[240px] w-full overflow-hidden md:h-[380px]">
        <Image
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&q=80&fit=crop"
          alt="전략 회의"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative mx-auto flex h-full max-w-5xl flex-col justify-end px-6 pb-10 md:pb-16">
          <p
            className="text-[11px] font-semibold uppercase tracking-widest text-white/70"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
          >
            이용 가이드
          </p>
          <h1
            className="mt-2 text-2xl font-bold leading-snug text-white md:text-[2.25rem]"
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
          >
            자문 진행 프로세스
          </h1>
          <p
            className="mt-2 text-sm text-white/90 md:text-base"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
          >
            주제 등록부터 전문가 매칭, 자문 진행까지.
          </p>
          <p
            className="mt-1 text-sm text-white/80 md:text-base"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
          >
            VIALOCAL은 브랜드 상황에 맞는 실무 자문 연결을 지원합니다.
          </p>
        </div>
      </section>

      {/* ── Intro ────────────────────────────────────── */}
      <section className="border-b border-slate-200 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-[15px] leading-[1.85] text-slate-800 md:text-base md:leading-[1.9]">
            VIALOCAL은 브랜드가 현재 겪고 있는 실무 문제를 정리하고,
            적합한 전문가와 연결하여 현실적인 방향성을 함께 고민하는 자문 플랫폼입니다.
          </p>
          <p className="mt-5 text-[15px] leading-[1.85] text-slate-800 md:text-base md:leading-[1.9]">
            명확한 문제 해결뿐 아니라,
            브랜드 상황을 함께 정리하고 다음 방향을 설정하는 과정 자체를 중요하게 생각합니다.
          </p>
        </div>
      </section>

      {/* ── Steps ────────────────────────────────────── */}
      <section className="bg-white py-12 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          {steps.map((step, idx) => (
            <div key={idx} className="border-t border-slate-200 py-12">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                STEP {step.num}
              </p>
              <h2 className="mt-2 text-xl font-semibold text-neutral-950 md:text-2xl">
                {step.title}
              </h2>
              <div className="mt-4 space-y-2">
                {step.body.map((para, i) => (
                  <p
                    key={i}
                    className="text-[15px] leading-relaxed text-slate-700 md:text-base"
                  >
                    {para}
                  </p>
                ))}
              </div>
              {step.examples.length > 0 && (
                <ul className="mt-6 space-y-4 border-l-2 border-slate-400 pl-5">
                  {step.examples.map((ex, i) => (
                    <li
                      key={i}
                      className="py-0.5 text-[14px] leading-[1.75] text-slate-700 md:text-[15px]"
                    >
                      &ldquo;{ex}&rdquo;
                    </li>
                  ))}
                </ul>
              )}
              {step.note && (
                <p className="mt-6 text-sm leading-relaxed text-slate-600">
                  {step.note.split("\n").map((line, i, arr) => (
                    <span key={i}>
                      {line}
                      {i < arr.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              )}
            </div>
          ))}
          <div className="border-t border-slate-200" />
        </div>
      </section>

      {/* ── Principles ───────────────────────────────── */}
      <section className="border-t border-slate-200 bg-[#f7f7f5] py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-950 md:text-sm">
            VIALOCAL이 중요하게 생각하는 것
          </h2>
          <ul className="mt-8 space-y-5">
            {principles.map((item, idx) => (
              <li key={idx} className="flex items-center gap-5">
                <span className="h-px w-5 flex-shrink-0 bg-slate-600" />
                <span className="text-[15px] text-slate-800 md:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Notices ──────────────────────────────────── */}
      <section className="border-t border-slate-200 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-950 md:text-sm">
            안내 사항
          </h2>
          <ul className="mt-8 space-y-4">
            {notices.map((item, idx) => (
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
    </main>
  );
}
