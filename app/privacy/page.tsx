export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white py-20 px-6">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold text-slate-900">개인정보처리방침</h1>
        <p className="mt-3 text-sm text-slate-400">시행일: 2026년 4월 23일</p>

        <div className="mt-14 space-y-12 text-left">
          {/* 1 */}
          <div>
            <h2 className="text-base font-bold text-slate-900">1. 개인정보의 처리 목적</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              비아로컬은 전문가 매칭 서비스 제공, 상담 및 문의 응대, 서비스 이용 의사 확인을 목적으로 개인정보를 처리합니다.
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="text-base font-bold text-slate-900">2. 처리하는 개인정보 항목</h2>
            <ul className="mt-3 space-y-1 text-sm leading-relaxed text-slate-500 list-disc list-inside">
              <li>일반 이용자(고객): 성명, 연락처(휴대폰 번호), 이메일 주소, 소속 회사/기관명, 직책</li>
              <li>자문위원(전문가): 위 항목을 포함하여 연차 및 경력사항(이력서), 링크드인 프로필 URL, 주요 자문 분야, 전문성 증빙 자료, 경력 연차, 포트폴리오</li>>
              <li>자동수집항목: 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보</li>
            </ul>
          </div>

          {/* 3 */}
          <div>
            <h2 className="text-base font-bold text-slate-900">3. 개인정보의 처리 및 보유 기간</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계 법령에 따라 보존할 필요가 있는 경우 해당 기간 동안 보관합니다.
            </p>
          </div>

          {/* 4 */}
          <div>
            <h2 className="text-base font-bold text-slate-900">4. 개인정보의 파기 절차 및 방법</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 파기하며, 종이 문서의 경우 분쇄하거나 소각합니다.
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 className="text-base font-bold text-slate-900">5. 개인정보의 제3자 제공 및 위탁</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              비아로컬은 이용자의 동의 없이 개인정보를 외부에 제공하거나 위탁하지 않습니다. 향후 결제 서비스 연동 등을 위해 위탁이 필요한 경우 사전에 고지하고 동의를 받습니다.
            </p>
          </div>

          {/* 6 */}
          <div>
            <h2 className="text-base font-bold text-slate-900">6. 정보주체의 권리와 행사 방법</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              이용자는 언제든지 자신의 개인정보를 조회, 수정하거나 삭제(탈퇴)를 요청할 수 있습니다.
            </p>
          </div>

          {/* 7 */}
          <div>
            <h2 className="text-base font-bold text-slate-900">7. 개인정보의 안전성 확보조치</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              해킹 등에 대비하여 관리적·기술적 보안 대책을 수립하여 데이터를 안전하게 보호하고 있습니다.
            </p>
          </div>

          {/* 8 */}
          <div>
            <h2 className="text-base font-bold text-slate-900">8. 개인정보 자동 수집 장치(쿠키)의 설치·운영 및 거부</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              이용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있으나, 이 경우 일부 서비스 이용에 불편이 있을 수 있습니다.
            </p>
          </div>

          {/* 9 */}
          <div>
            <h2 className="text-base font-bold text-slate-900">9. 개인정보 보호책임자</h2>
            <ul className="mt-3 space-y-1 text-sm leading-relaxed text-slate-500 list-none">
              <li>성명: 김연준</li>
              <li>이메일: yjyjkk4125@gmail.com</li>
            </ul>
          </div>

          {/* 10 */}
          <div>
            <h2 className="text-base font-bold text-slate-900">10. 개인정보 처리방침의 변경</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              본 방침은 시행일로부터 적용되며, 변경사항이 있을 경우 공지사항을 통해 고지합니다. (시행일: 2026년 4월 23일)
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
