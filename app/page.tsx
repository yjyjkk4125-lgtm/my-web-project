"use client";

import { useState } from "react";

export default function Home() {
  const [showInquiryForm, setShowInquiryForm] = useState(false);

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

      <section className="mt-10 rounded-2xl border border-black/10 bg-white p-8 shadow-sm dark:border-white/15 dark:bg-black/20">
        <h2 className="text-2xl font-semibold">등록 전문가 확인</h2>
        <p className="mt-3 text-sm text-black/70 dark:text-white/80">
          원하는 경력과 자문 분야를 입력하면 등록 전문가 매칭 가능 여부를
          안내해드립니다.
        </p>
        <button
          type="button"
          onClick={() => setShowInquiryForm((prev) => !prev)}
          className="mt-6 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          전문가 확인 요청하기
        </button>
      </section>

      {showInquiryForm && (
        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <aside className="rounded-xl border border-black/10 bg-[#f4f6f8] p-6 dark:border-white/15 dark:bg-white/10">
            <h3 className="text-2xl font-bold">VIALOCAL 자문 문의</h3>
            <p className="mt-3 text-sm text-black/70 dark:text-white/80">
              필수 항목과 문의 내용을 입력해주세요. 보통 1영업일 이내에 담당자가
              확인 후 회신합니다.
            </p>

            <div className="mt-6 rounded-lg bg-white p-5 text-sm shadow-sm dark:bg-black/20">
              <h4 className="text-lg font-semibold">문의 예시</h4>
              <ul className="mt-3 space-y-2 text-black/80 dark:text-white/85">
                <li>• 미국/동남아 유통 채널 진입 전략 자문 가능 여부</li>
                <li>• 브랜드 리포지셔닝 및 제품 포트폴리오 점검 요청</li>
                <li>• ODM 협업 프로세스 및 양산 전 체크리스트 검토</li>
              </ul>
            </div>

            <div className="mt-6 rounded-lg bg-white p-5 text-sm shadow-sm dark:bg-black/20">
              <p className="font-semibold">급한 문의</p>
              <p className="mt-2 text-2xl font-bold text-blue-600">010-5054-4125</p>
              <p className="mt-1 text-black/60 dark:text-white/70">
                평일 10시 ~ 18시 운영
              </p>
            </div>
          </aside>

          <form className="rounded-xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/15 dark:bg-black/20">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm">
                <span className="mb-1 block font-medium">
                  이름(성)<span className="ml-1 text-red-500">*</span>
                </span>
                <input
                  required
                  className="w-full rounded-md border border-black/15 px-3 py-2"
                />
              </label>
              <label className="text-sm">
                <span className="mb-1 block font-medium">
                  이름(이름)<span className="ml-1 text-red-500">*</span>
                </span>
                <input
                  required
                  className="w-full rounded-md border border-black/15 px-3 py-2"
                />
              </label>
            </div>

            <div className="mt-4 space-y-4">
              <label className="block text-sm">
                <span className="mb-1 block font-medium">
                  회사명<span className="ml-1 text-red-500">*</span>
                </span>
                <input
                  required
                  className="w-full rounded-md border border-black/15 px-3 py-2"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium">
                  회사 이메일 주소<span className="ml-1 text-red-500">*</span>
                </span>
                <input
                  required
                  type="email"
                  placeholder="email@company.com"
                  className="w-full rounded-md border border-black/15 px-3 py-2"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium">
                  전화번호<span className="ml-1 text-red-500">*</span>
                </span>
                <input
                  required
                  className="w-full rounded-md border border-black/15 px-3 py-2"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium">
                  부서명<span className="ml-1 text-red-500">*</span>
                </span>
                <input
                  required
                  className="w-full rounded-md border border-black/15 px-3 py-2"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium">
                  직책<span className="ml-1 text-red-500">*</span>
                </span>
                <input
                  required
                  placeholder="예: 브랜드 매니저"
                  className="w-full rounded-md border border-black/15 px-3 py-2"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium">
                  주요 담당 업무<span className="ml-1 text-red-500">*</span>
                </span>
                <input
                  required
                  placeholder="예: 해외 유통 전략"
                  className="w-full rounded-md border border-black/15 px-3 py-2"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium">
                  요구하는 전문가의 경험
                  <span className="ml-1 text-red-500">*</span>
                </span>
                <textarea
                  required
                  rows={5}
                  placeholder="희망하는 자문 주제와 필요한 전문가 배경을 작성해주세요."
                  className="w-full rounded-md border border-black/15 px-3 py-2"
                />
              </label>
            </div>

            <label className="mt-4 flex items-start gap-2 text-sm">
              <input required type="checkbox" className="mt-1" />
              <span>
                개인정보 수집 및 서비스 안내 메일 수신에 동의합니다.
                <span className="ml-1 text-red-500">*</span>
              </span>
            </label>

            <button
              type="submit"
              className="mt-6 w-full rounded-md bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              보내기
            </button>
          </form>
        </section>
      )}
    </main>
  );
}
