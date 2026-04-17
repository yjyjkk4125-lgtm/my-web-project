export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <section className="rounded-2xl border border-black/10 bg-white p-8 shadow-sm dark:border-white/15 dark:bg-black/20">
        <p className="text-sm font-semibold tracking-wide text-pink-600">
          K-뷰티 브랜드 실무 자문 플랫폼
        </p>
        <h1 className="mt-3 text-3xl font-bold md:text-4xl">
          해외 진출과 브랜드 고민, 전문가와 1시간 1:1 전화 자문
        </h1>
        <p className="mt-4 text-base text-black/70 dark:text-white/80">
          K-뷰티 브랜드사가 시장 확장, 브랜딩, 제품 전략 등 핵심 이슈를
          정리하면 업계 전문가가 1시간 동안 실무 중심으로 해결 방향을
          제안합니다.
        </p>
      </section>

      <section id="inquiry-form" className="mt-10 rounded-2xl border border-black/10 bg-white p-8 shadow-sm dark:border-white/15 dark:bg-black/20">
        <h2 className="text-2xl font-semibold">등록 전문가 확인</h2>
        <p className="mt-3 text-sm text-black/70 dark:text-white/80">
          원하는 경력과 자문 분야를 입력하면 등록 전문가 매칭 가능 여부를
          안내해드립니다.
        </p>
        <a
          href="/expert-request"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          전문가 확인 요청하기
        </a>
      </section>
    </main>
  );
}
