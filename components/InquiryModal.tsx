"use client";

import { FormEvent, useEffect, useState } from "react";
import { useModal } from "@/context/ModalContext";

type InquiryInsert = {
  last_name: string;
  first_name: string;
  company: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  main_task: string;
  experience: string;
};

export default function InquiryModal() {
  const { isOpen, closeModal } = useModal();

  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [title, setTitle] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [expertExperience, setExpertExperience] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // ESC 키로 모달 닫기 + 스크롤 잠금
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeModal]);

  // 모달 닫힐 때 폼 초기화
  useEffect(() => {
    if (!isOpen) {
      setLastName("");
      setFirstName("");
      setCompany("");
      setEmail("");
      setPhone("");
      setDepartment("");
      setTitle("");
      setResponsibilities("");
      setExpertExperience("");
      setAgreed(false);
      setSubmitStatus("");
      setSubmitted(false);
    }
  }, [isOpen]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submit 실행됨");
    setSubmitStatus("제출 시도 중...");

    const payload: InquiryInsert = {
      last_name: lastName.trim(),
      first_name: firstName.trim(),
      company: company.trim(),
      email: email.trim(),
      phone: phone.trim(),
      department: department.trim(),
      position: title.trim(),
      main_task: responsibilities.trim(),
      experience: expertExperience.trim(),
    };

    console.log("insert payload:", payload);

    if (
      !payload.last_name ||
      !payload.first_name ||
      !payload.company ||
      !payload.email ||
      !payload.phone ||
      !payload.department ||
      !payload.position ||
      !payload.main_task ||
      !payload.experience
    ) {
      console.log(
        "Supabase insert blocked: 필수 입력값이 비어 있습니다."
      );
      setSubmitStatus("필수 입력값이 비어 있습니다.");
      return;
    }

    if (!agreed) {
      console.log("Supabase insert blocked: 개인정보 동의가 체크되지 않았습니다.");
      setSubmitStatus("개인정보 동의 체크가 필요합니다.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = (await response.json()) as {
        data?: unknown;
        error?: string;
        code?: string;
        missingFields?: string[];
      };

      if (!response.ok) {
        console.log("문의 저장 API 오류:", {
          status: response.status,
          error: json.error,
          code: json.code,
          missingFields: json.missingFields,
        });
        const missingText =
          json.missingFields && json.missingFields.length > 0
            ? `누락 필드: ${json.missingFields.join(", ")}`
            : "";
        setSubmitStatus(
          `${json.error ?? `저장 실패 (HTTP ${response.status})`}${
            missingText ? ` (${missingText})` : ""
          }`
        );
        return;
      }

      console.log("문의 저장 성공:", json.data);
      setSubmitted(true);
      setSubmitStatus("저장이 완료되었습니다.");
    } catch (error) {
      console.log("문의 저장 네트워크 오류:", error);
      setSubmitStatus("예상치 못한 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    /* 오버레이 */
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      {/* 모달 패널 */}
      <div className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl shadow-2xl lg:flex-row">

        {/* ── 왼쪽: 가이드 패널 ── */}
        <div className="flex flex-col bg-[#0a1628] px-8 py-10 text-white lg:w-[42%] lg:overflow-y-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-300">
            K-뷰티 브랜드 실무 자문 플랫폼
          </p>
          <h2 className="mt-4 text-2xl font-bold leading-snug">
            비즈니스 자문 문의를<br />받습니다
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            원하는 경력과 자문 분야를 입력하면 등록 전문가 매칭 가능
            여부를 안내해드립니다.
          </p>

          {/* 문의 예시 */}
          <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold text-white">문의 예시</p>
            <ul className="mt-3 space-y-3 text-sm text-slate-300">
              <li className="flex gap-2">
                <span className="mt-0.5 flex-shrink-0 text-blue-400">✓</span>
                미국/동남아 유통 채널 진입 전략 자문 가능 여부
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 flex-shrink-0 text-blue-400">✓</span>
                브랜드 리포지셔닝 및 제품 포트폴리오 점검 요청
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 flex-shrink-0 text-blue-400">✓</span>
                ODM 협업 프로세스 및 양산 전 체크리스트 검토
              </li>
            </ul>
          </div>

          {/* 급한 문의 카드 */}
          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              급한 문의
            </p>
            <p className="mt-2 text-2xl font-bold text-white">
              010-5054-4125
            </p>
            <p className="mt-1 text-xs text-slate-400">
              평일 10시 ~ 18시 운영
            </p>
          </div>
        </div>

        {/* ── 오른쪽: 폼 패널 ── */}
        <div className="flex-1 overflow-y-auto bg-white px-8 py-10 lg:py-10">
          {/* 닫기 버튼 */}
          <button
            onClick={closeModal}
            className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="모달 닫기"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {submitted ? (
            /* 제출 완료 화면 */
            <div className="flex h-full flex-col items-center justify-center py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-5 text-xl font-bold text-slate-900">
                문의가 접수되었습니다
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                1영업일 이내에 담당자가 이메일로 회신드립니다.
              </p>
              <button
                onClick={closeModal}
                className="mt-8 rounded-lg bg-blue-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
              >
                닫기
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-bold text-slate-900">
                VIALOCAL 자문 문의
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                필수 항목(<span className="text-red-500">*</span>)을 모두 입력해주세요.
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <label className="text-sm">
                    <span className="mb-1 block font-medium text-slate-700">
                      성<span className="ml-0.5 text-red-500">*</span>
                    </span>
                    <input
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </label>
                  <label className="text-sm">
                    <span className="mb-1 block font-medium text-slate-700">
                      이름<span className="ml-0.5 text-red-500">*</span>
                    </span>
                    <input
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </label>
                </div>

                <label className="block text-sm">
                  <span className="mb-1 block font-medium text-slate-700">
                    회사명<span className="ml-0.5 text-red-500">*</span>
                  </span>
                  <input
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </label>

                <label className="block text-sm">
                  <span className="mb-1 block font-medium text-slate-700">
                    회사 이메일<span className="ml-0.5 text-red-500">*</span>
                  </span>
                  <input
                    required
                    type="email"
                    placeholder="email@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <label className="text-sm">
                    <span className="mb-1 block font-medium text-slate-700">
                      전화번호<span className="ml-0.5 text-red-500">*</span>
                    </span>
                    <input
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </label>
                  <label className="text-sm">
                    <span className="mb-1 block font-medium text-slate-700">
                      부서명<span className="ml-0.5 text-red-500">*</span>
                    </span>
                    <input
                      required
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </label>
                </div>

                <label className="block text-sm">
                  <span className="mb-1 block font-medium text-slate-700">
                    직책<span className="ml-0.5 text-red-500">*</span>
                  </span>
                  <input
                    required
                    placeholder="예: 브랜드 매니저"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </label>

                <label className="block text-sm">
                  <span className="mb-1 block font-medium text-slate-700">
                    주요 담당 업무<span className="ml-0.5 text-red-500">*</span>
                  </span>
                  <input
                    required
                    placeholder="예: 해외 유통 전략"
                    value={responsibilities}
                    onChange={(e) => setResponsibilities(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </label>

                <label className="block text-sm">
                  <span className="mb-1 block font-medium text-slate-700">
                    요구하는 전문가의 경험
                    <span className="ml-0.5 text-red-500">*</span>
                  </span>
                  <textarea
                    required
                    rows={4}
                    placeholder="희망하는 자문 주제와 필요한 전문가 배경을 작성해주세요."
                    value={expertExperience}
                    onChange={(e) => setExpertExperience(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </label>

                <label className="flex items-start gap-2 text-sm">
                  <input
                    required
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 h-4 w-4 accent-blue-600"
                  />
                  <span className="text-slate-600">
                    개인정보 수집 및 서비스 안내 메일 수신에 동의합니다.
                    <span className="ml-0.5 text-red-500">*</span>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:opacity-60"
                >
                  {isSubmitting ? "전송 중..." : "문의 보내기"}
                </button>

                {submitStatus && !submitted && (
                  <p className="text-sm font-medium text-red-500">
                    {submitStatus}
                  </p>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
