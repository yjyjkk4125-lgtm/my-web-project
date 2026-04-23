export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white py-20 px-6">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold text-slate-900">이용약관</h1>

        <div className="mt-14 space-y-12 text-left">
          {/* 제1조 */}
          <div>
            <h2 className="text-base font-bold text-slate-900">제1조 (목적 및 정의)</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              본 약관은 비아로컬(이하 "회사")이 제공하는 전문가 매칭 및 비즈니스 자문 서비스의 이용 조건, 절차 및 이용자와 회사 간의 권리, 의무를 규정함을 목적으로 합니다.
            </p>
          </div>

          {/* 제2조 */}
          <div>
            <h2 className="text-base font-bold text-slate-900">제2조 (약관의 게시와 개정)</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              회사는 본 약관을 서비스 화면에 게시하며, 관련 법령을 위배하지 않는 범위 내에서 약관을 개정할 수 있습니다.
            </p>
          </div>

          {/* 제3조 */}
          <div>
            <h2 className="text-base font-bold text-slate-900">제3조 (서비스의 제공 및 중단)</h2>
            <ol className="mt-3 space-y-2 text-sm leading-relaxed text-slate-500 list-decimal list-inside">
              <li>회사는 전문가 매칭, 일정 조율, 자문료 결제 관리 서비스를 제공합니다.</li>
              <li>시스템 점검이나 서비스 운영상 필요한 경우 서비스의 전부 또는 일부를 일시적으로 중단할 수 있습니다.</li>
            </ol>
          </div>

          {/* 제4조 */}
          <div>
            <h2 className="text-base font-bold text-slate-900">제4조 (이용 신청 및 결제)</h2>
            <ol className="mt-3 space-y-2 text-sm leading-relaxed text-slate-500 list-decimal list-inside">
              <li>이용자는 회사가 정한 양식에 따라 정보를 입력함으로써 자문 서비스를 신청합니다.</li>
              <li>모든 결제는 회사가 안내하는 지정 계좌로의 무통장 입금을 원칙으로 하며, 입금 확인 시 매칭이 최종 확정됩니다.</li>
              <li>세금계산서 및 현금영수증 발행은 입금 확인 후 이용자의 요청에 따라 즉시 처리됩니다.</li>
            </ol>
          </div>

          {/* 제5조 */}
          <div>
            <h2 className="text-base font-bold text-slate-900">제5조 (청약철회 및 환불)</h2>
            <ol className="mt-3 space-y-2 text-sm leading-relaxed text-slate-500 list-decimal list-inside">
              <li>자문 시작 24시간 전까지 취소를 요청할 경우 전액 환불합니다.</li>
              <li>자문 시작 24시간 이내 혹은 자문이 시작된 이후에는 원칙적으로 환불이 불가하나, 전문가의 귀책 사유로 진행이 불가능할 경우 별도 규정에 따라 환불 또는 재매칭을 진행합니다.</li>
            </ol>
          </div>

          {/* 제6조 */}
          <div>
            <h2 className="text-base font-bold text-slate-900">제6조 (저작권 및 비밀유지)</h2>
            <ol className="mt-3 space-y-2 text-sm leading-relaxed text-slate-500 list-decimal list-inside">
              <li>서비스 내 콘텐츠에 대한 권리는 회사에 귀속됩니다.</li>
              <li>이용자와 전문가는 자문 과정에서 취득한 상대방의 경영상·기술상 비밀을 제3자에게 누설하거나 무단 복제·배포할 수 없습니다.</li>
            </ol>
          </div>

          {/* 제7조 */}
          <div>
            <h2 className="text-base font-bold text-slate-900">제7조 (책임의 제한 및 면책)</h2>
            <ol className="mt-3 space-y-2 text-sm leading-relaxed text-slate-500 list-decimal list-inside">
              <li>회사는 전문가와 이용자를 연결하는 플랫폼 제공자로, 전문가가 제공한 자문 내용의 정확성이나 이를 활용한 결과에 대해 직접적인 책임을 지지 않습니다.</li>
              <li>천재지변, 전문가의 개인적 사정 등 불가항력적인 사유로 서비스가 지연되는 경우 회사는 이에 대한 책임을 면합니다.</li>
            </ol>
          </div>

          {/* 제8조 */}
          <div>
            <h2 className="text-base font-bold text-slate-900">제8조 (분쟁 해결 및 관할법원)</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              서비스 이용과 관련하여 발생한 분쟁은 회사와 이용자가 원만히 합의하여 해결하되, 합의가 되지 않을 경우 회사의 소재지 관할 법원을 통하여 해결합니다.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
