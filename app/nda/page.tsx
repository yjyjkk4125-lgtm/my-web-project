export default function NdaPage() {
  return (
    <main className="min-h-screen bg-white py-20 px-6">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold text-slate-900">자문위원 비밀유지 의무</h1>
        <p className="mt-2 text-sm text-slate-400">Non-Disclosure Agreement</p>

        <div className="mt-14 space-y-12 text-left">
          {/* 제1조 */}
          <div>
            <h2 className="text-base font-bold text-slate-900">제1조 (목적)</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              본 규정은 자문위원이 비아로컬(이하 "회사")의 서비스를 통해 자문을 수행하는 과정에서 취득한 정보를 보호함을 목적으로 합니다.
            </p>
          </div>

          {/* 제2조 */}
          <div>
            <h2 className="text-base font-bold text-slate-900">제2조 (비밀정보의 정의)</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              "비밀정보"란 자문 과정에서 구두, 서면, 전자적 형태 등 명칭을 불문하고 전달받은 고객사의 경영 상태, 기술 정보, 영업 비밀 및 개인정보를 의미합니다.
            </p>
          </div>

          {/* 제3조 */}
          <div>
            <h2 className="text-base font-bold text-slate-900">제3조 (의무의 내용)</h2>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-500 list-disc list-inside">
              <li>자문위원은 취득한 비밀정보를 엄격히 관리해야 하며, 본 서비스의 자문 목적 외에 무단으로 사용할 수 없습니다.</li>
              <li>어떠한 경우에도 제3자에게 비밀정보를 누설하거나 배포해서는 안 됩니다.</li>
            </ul>
          </div>

          {/* 제4조 */}
          <div>
            <h2 className="text-base font-bold text-slate-900">제4조 (의무의 기간)</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              본 비밀유지 의무는 자문이 종료된 이후에도 영구적으로 지속됩니다.
            </p>
          </div>

          {/* 제5조 */}
          <div>
            <h2 className="text-base font-bold text-slate-900">제5조 (위반 시 책임)</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              자문위원이 본 의무를 위반하여 회사 또는 고객사에 손해를 입힌 경우, 관련 법령에 따른 민·형사상의 책임을 질 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
