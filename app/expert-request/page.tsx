"use client";

import { FormEvent, useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

type InquiryInsert = {
  last_name: string;
  first_name: string;
  company: string;
  email: string;
  phone: string;
  department: string;
};

export default function ExpertRequestPage() {
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

  useEffect(() => {
    console.log("/expert-request 페이지 로드됨");
  }, []);

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
    };

    console.log("insert payload:", payload);

    if (
      !payload.last_name ||
      !payload.first_name ||
      !payload.company ||
      !payload.email ||
      !payload.phone ||
      !payload.department
    ) {
      console.log(
        "Supabase insert blocked: 필수 입력값(last_name, first_name, company, email, phone, department)이 비어 있습니다."
      );
      setSubmitStatus("필수 입력값이 비어 있습니다.");
      return;
    }

    if (!title.trim() || !responsibilities.trim() || !expertExperience.trim()) {
      console.log("Supabase insert blocked: 직책/주요 담당 업무/요구 전문가 경험이 비어 있습니다.");
      setSubmitStatus("직책/주요 담당 업무/요구 전문가 경험을 입력해주세요.");
      return;
    }

    if (!agreed) {
      console.log("Supabase insert blocked: 개인정보 동의가 체크되지 않았습니다.");
      setSubmitStatus("개인정보 동의 체크가 필요합니다.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from("inquiries")
        .insert([payload])
        .select();

      if (error) {
        console.log("Supabase insert error:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        });
        setSubmitStatus(`저장 실패: ${error.message}`);
        return;
      }

      console.log("Supabase insert success:", data);
      setSubmitStatus("저장이 완료되었습니다.");
    } catch (error) {
      console.log("Supabase insert unexpected error:", error);
      setSubmitStatus("예상치 못한 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <section className="mt-2 rounded-2xl border border-black/10 bg-white p-8 shadow-sm dark:border-white/15 dark:bg-black/20">
        <h2 className="text-2xl font-semibold">VIALOCAL 자문 문의</h2>
        <p className="mt-3 text-sm text-black/70 dark:text-white/80">
          필수 항목과 문의 내용을 입력해주세요. 보통 1영업일 이내에 담당자가
          확인 후 회신합니다.
        </p>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <aside className="rounded-xl border border-black/10 bg-[#f4f6f8] p-6 dark:border-white/15 dark:bg-white/10">
          <h3 className="text-lg font-bold">비즈니스 자문 문의를 받습니다</h3>

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
            <p className="mt-2 text-2xl font-bold text-blue-600">
              010-5054-4125
            </p>
            <p className="mt-1 text-black/60 dark:text-white/70">
              평일 10시 ~ 18시 운영
            </p>
          </div>
        </aside>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/15 dark:bg-black/20"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm">
              <span className="mb-1 block font-medium">
                이름(성)<span className="ml-1 text-red-500">*</span>
              </span>
              <input
                required
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                className="w-full rounded-md border border-black/15 px-3 py-2"
              />
            </label>

            <label className="text-sm">
              <span className="mb-1 block font-medium">
                이름(이름)<span className="ml-1 text-red-500">*</span>
              </span>
              <input
                required
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
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
                value={company}
                onChange={(event) => setCompany(event.target.value)}
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
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-md border border-black/15 px-3 py-2"
              />
            </label>

            <label className="block text-sm">
              <span className="mb-1 block font-medium">
                전화번호<span className="ml-1 text-red-500">*</span>
              </span>
              <input
                required
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="w-full rounded-md border border-black/15 px-3 py-2"
              />
            </label>

            <label className="block text-sm">
              <span className="mb-1 block font-medium">
                부서명<span className="ml-1 text-red-500">*</span>
              </span>
              <input
                required
                value={department}
                onChange={(event) => setDepartment(event.target.value)}
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
                value={title}
                onChange={(event) => setTitle(event.target.value)}
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
                value={responsibilities}
                onChange={(event) => setResponsibilities(event.target.value)}
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
                value={expertExperience}
                onChange={(event) => setExpertExperience(event.target.value)}
                className="w-full rounded-md border border-black/15 px-3 py-2"
              />
            </label>
          </div>

          <label className="mt-4 flex items-start gap-2 text-sm">
            <input
              required
              type="checkbox"
              checked={agreed}
              onChange={(event) => setAgreed(event.target.checked)}
              className="mt-1"
            />
            <span>
              개인정보 수집 및 서비스 안내 메일 수신에 동의합니다.
              <span className="ml-1 text-red-500">*</span>
            </span>
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded-md bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            {isSubmitting ? "전송 중..." : "보내기"}
          </button>

          {submitStatus && (
            <p className="mt-3 text-sm text-black/70 dark:text-white/80">
              {submitStatus}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}

