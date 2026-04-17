"use client";

import { FormEvent, useState } from "react";

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

export default function Home() {
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
        "Supabase insert blocked: 필수 입력값(last_name, first_name, company, email, phone, department, position, main_task, experience)이 비어 있습니다."
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
      setSubmitStatus("저장이 완료되었습니다.");
    } catch (error) {
      console.log("문의 저장 네트워크 오류:", error);
      setSubmitStatus("예상치 못한 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      {/* ── Hero Section ── */}
      <section className="relative bg-[#0a1628] py-20 lg:py-28">
        {/* 미묘한 그라디언트 오버레이 */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d2044] to-[#102060] opacity-90" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid items-start gap-16 lg:grid-cols-2">
            {/* ── 왼쪽: 타이틀 + 설명 ── */}
            <div className="flex flex-col items-start text-left">
              <span className="inline-block rounded-full border border-blue-400/40 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-300">
                K-뷰티 브랜드 실무 자문 플랫폼
              </span>

              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-5xl">
              해외 진출, 
              <br />
              전문가 인사이트로더 빠른 결정
              </h1>

              <p className="mt-6 max-w-md text-base leading-relaxed text-slate-300">
              K-뷰티 브랜드 전문가의 실전 경험, 1시간 1:1 직접 자문
              </p>

              <div className="mt-10 space-y-3 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">✓</span> 미국/동남아 유통 채널 진입 전략
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">✓</span> 브랜드 리포지셔닝 및 제품 포트폴리오 점검
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">✓</span> ODM 협업 프로세스 및 양산 전 체크리스트
                </div>
              </div>

              <div className="mt-10 rounded-xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  급한 문의
                </p>
                <p className="mt-1 text-2xl font-bold text-white">
                  010-5054-4125
                </p>
                <p className="mt-0.5 text-xs text-slate-400">
                  평일 10시 ~ 18시 운영
                </p>
              </div>
            </div>

            {/* ── 오른쪽: 문의 폼 ── */}
            <div id="inquiry-form" className="rounded-2xl border border-white/10 bg-white/95 p-8 shadow-2xl backdrop-blur-sm">
              <h2 className="text-xl font-bold text-slate-900">
                VIALOCAL 자문 문의
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                필수 항목을 입력해주세요. 1영업일 이내에 회신합니다.
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                {/* 성 / 이름 */}
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

                {submitStatus && (
                  <p
                    className={`text-sm font-medium ${
                      submitStatus === "저장이 완료되었습니다."
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {submitStatus}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
