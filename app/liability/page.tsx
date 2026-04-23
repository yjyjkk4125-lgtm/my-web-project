export default function LiabilityPage() {
  return (
    <main className="min-h-screen bg-white py-20 px-6">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold text-slate-900">전문가 자문 수행 원칙</h1>

        <div className="mt-14 space-y-12 text-left">
          {/* 제1조 */}
          <div>
            <h2 className="text-base font-bold text-slate-900">제1조 (자문의 독립성 및 성실 의무)</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              자문위원은 본인의 전문적 식견과 경험을 바탕으로 독립적이고 성실하게 자문을 제공합니다. 비아로컬은 전문가의 고유한 지식 체계를 존중하며, 구체적인 자문 내용에 부당하게 개입하지 않습니다.
            </p>
          </div>

          {/* 제2조 */}
          <div>
            <h2 className="text-base font-bold text-slate-900">제2조 (의사결정의 참고 자료 및 최종 책임)</h2>
            <ol className="mt-3 space-y-2 text-sm leading-relaxed text-slate-500 list-decimal list-inside">
              <li>자문위원이 제공하는 정보와 조언은 기업의 합리적인 의사결정을 돕기 위한 참고용 자료입니다.</li>
              <li>자문 내용을 바탕으로 한 실행 여부의 최종 판단과 그에 따른 경영상의 결과는 전적으로 이용자(기업)에게 귀속됩니다.</li>
            </ol>
          </div>

          {/* 제3조 */}
          <div>
            <h2 className="text-base font-bold text-slate-900">제3조 (회사의 면책)</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              회사는 전문가와 이용자를 연결하고 원활한 소통을 지원하는 플랫폼 제공자로서, 자문위원의 개인적 견해나 자문 결과로 인해 발생하는 어떠한 손실에 대해서도 법적 책임을 지지 않습니다.
            </p>
          </div>

          {/* 제4조 */}
          <div>
            <h2 className="text-base font-bold text-slate-900">제4조 (전문가 안전 보장)</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              회사는 전문가가 자신의 전문성을 자유롭게 발휘할 수 있는 환경을 지향합니다. 자문위원이 전문가로서의 윤리를 준수하며 제공한 의견에 대해서는 그 결과가 기대에 미치지 못한다는 이유만으로 전문가에게 법적/경제적 책임을 묻지 않는 환경을 보장합니다.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
