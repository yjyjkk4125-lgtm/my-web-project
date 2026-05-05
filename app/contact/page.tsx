"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";

/* ── 공용 인풋 스타일 ─────────────────────────────────── */
const inputCls =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200";

/* ── 탭 타입 ─────────────────────────────────────────── */
type Tab = "client" | "advisor";

/* ── Toast 컴포넌트 ────────────────────────────────────── */
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 5000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-4 z-[9999] flex max-w-sm items-start gap-3 rounded-xl bg-red-600 px-5 py-4 text-sm font-medium text-white shadow-2xl sm:right-6">
      <svg className="mt-0.5 h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="ml-1 opacity-70 hover:opacity-100">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   클라이언트용 문의 폼  →  client_inquiries 테이블
   2-Step 구조: Step1 문제 입력 → Step2 연락처 입력
═══════════════════════════════════════════════════════ */
function ClientForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  /* Step 1 */
  const [problemText, setProblemText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formTopRef = useRef<HTMLDivElement>(null);

  /* Step 2 */
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [contactType, setContactType] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consultMethod, setConsultMethod] = useState<"email" | "phone" | "kakao" | "">("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState("");

  const closeToast = useCallback(() => setToast(""), []);

  const autoResizeTextarea = (el: HTMLTextAreaElement) => {
    el.style.height = "auto";
    el.style.height = Math.max(el.scrollHeight, 120) + "px";
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProblemText(e.target.value);
    autoResizeTextarea(e.target);
  };

  const goToStep = (target: 1 | 2) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(target);
      setIsTransitioning(false);
      formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
  };

  const handleStep1Next = () => {
    if (!problemText.trim()) {
      setToast("해결하고 싶은 문제를 입력해 주세요.");
      return;
    }
    goToStep(2);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setToast("");
    if (!name.trim()) {
      setToast("성함을 입력해 주세요.");
      return;
    }
    if (contactType === "email" && !email.trim()) {
      setToast("이메일을 입력해 주세요.");
      return;
    }
    if (contactType === "phone" && !phone.trim()) {
      setToast("전화번호를 입력해 주세요.");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "client",
          first_name: name.trim(),
          last_name: "",
          brand_name: company.trim(),
          phone: phone.trim(),
          email: email.trim(),
          message: problemText.trim(),
          marketing_consent: true,
        }),
      });
      if (!res.ok) {
        const json = (await res.json()) as { error?: string };
        console.error("[client_inquiries] 제출 오류:", json);
        setToast(json.error ?? "오류가 발생했습니다. 다시 시도해 주세요.");
        return;
      }
      setSubmitted(true);
    } catch (err) {
      console.error("[client_inquiries] 네트워크 오류:", err);
      setToast("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) return <ClientSuccessMessage />;

  return (
    <>
      <div ref={formTopRef} />

      {/* Hero */}
      <div className="mb-5">
        <h2 className="text-xl font-bold leading-snug text-slate-900 sm:text-2xl">
          해결하고 싶은 K-뷰티 성장 과제를 알려주세요.
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          간단한 입력만으로 전문가 연결 가능 여부를 빠르게 확인할 수 있습니다.{" "}
          <span className="font-medium text-blue-600">평균 12시간 이내 응답</span>
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-7">
        <div className="flex items-center">
          <div
            className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
              step >= 1 ? "bg-blue-700 text-white" : "bg-slate-200 text-slate-500"
            }`}
          >
            {step > 1 ? (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              "1"
            )}
          </div>
          <span className={`ml-2 text-xs font-medium ${step === 1 ? "text-blue-700" : "text-slate-400"}`}>
            문제 입력
          </span>
          <div className="mx-3 h-0.5 flex-1 rounded-full bg-slate-200">
            <div
              className={`h-full rounded-full bg-blue-700 transition-all duration-500 ${
                step === 2 ? "w-full" : "w-0"
              }`}
            />
          </div>
          <div
            className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
              step === 2 ? "bg-blue-700 text-white" : "bg-slate-200 text-slate-500"
            }`}
          >
            2
          </div>
          <span className={`ml-2 text-xs font-medium ${step === 2 ? "text-blue-700" : "text-slate-400"}`}>
            연락처 입력
          </span>
        </div>
      </div>

      {/* Desktop layout: sidebar + form */}
      <div className="lg:flex lg:items-start lg:gap-8">
        {/* Left Sidebar (desktop only) */}
        <div className="mb-6 hidden lg:mb-0 lg:block lg:w-56 lg:flex-shrink-0">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold leading-snug text-slate-800">
              이런 고민도 전문가와 이야기할 수 있습니다
            </p>
            <ul className="mt-3 space-y-2.5">
              {[
                "해외 진출 전략이나 유통 방향에 대한 고민",
                "마케팅 실행이나 성과 개선 관련 문제",
                "특정 시장 진입이나 운영 방식에 대한 질문",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-slate-600">
                  <span className="mt-0.5 flex-shrink-0 text-blue-500">•</span>
                  {item}
                </li>
              ))}
              <li className="flex items-start gap-2 text-xs italic leading-relaxed text-slate-400">
                <span className="mt-0.5 flex-shrink-0">•</span>
                그 외에도 다양한 실무 고민을 자유롭게 입력해 주세요
              </li>
            </ul>
            <div className="mt-4 border-t border-slate-200 pt-4">
              <p className="text-xs leading-relaxed text-slate-500">
                국내외 뷰티 브랜드 실무 경험자가 자문 네트워크에 참여하고 있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* Form area */}
        <div
          className={`flex-1 transition-all duration-200 ${
            isTransitioning ? "translate-x-2 opacity-0" : "translate-x-0 opacity-100"
          }`}
        >
          {/* ── Step 1 ── */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <p className="mb-2 text-sm font-semibold text-slate-800">
                  현재 어떤 문제를 해결하고 싶으신가요?
                  <span className="ml-1 text-red-500">*</span>
                </p>
                <textarea
                  ref={textareaRef}
                  value={problemText}
                  onChange={handleTextareaChange}
                  onFocus={(e) => {
                    setTimeout(() => {
                      e.target.scrollIntoView({ behavior: "smooth", block: "nearest" });
                    }, 350);
                  }}
                  placeholder={
                    "예:\n미국 틱톡샵 초기 세팅과 어필리에이트 확보 전략이 궁금합니다.\n동남아 유통 파트너를 찾고 있는데 접근 방법이 고민입니다.\n광고는 집행 중인데 상세페이지 전환율이 낮습니다."
                  }
                  className={`${inputCls} min-h-[128px] resize-none leading-relaxed`}
                  style={{ overflow: "hidden" }}
                />
                <p className="mt-2 text-xs text-slate-400">
                  입력해주신 내용은 전문가 매칭 목적 외에는 사용되지 않습니다.
                </p>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap gap-2">
                {["평균 응답 시간: 12시간", "실무자 직접 연결", "핵심 중심 자문"].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    {item}
                  </span>
                ))}
              </div>

              {/* Mobile: sidebar info */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 lg:hidden">
                <p className="text-xs font-semibold text-slate-700">이런 고민도 전문가와 이야기할 수 있습니다</p>
                <ul className="mt-2 space-y-1.5">
                  {[
                    "해외 진출 전략이나 유통 방향에 대한 고민",
                    "마케팅 실행이나 성과 개선 관련 문제",
                    "특정 시장 진입이나 운영 방식에 대한 질문",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-1.5 text-xs text-slate-500">
                      <span className="mt-0.5 flex-shrink-0 text-blue-400">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={handleStep1Next}
                className="w-full rounded-xl bg-blue-700 py-4 text-base font-semibold text-white shadow-md transition hover:bg-blue-800 active:scale-[0.98]"
              >
                다음 단계로 (1/2)
              </button>
            </div>
          )}

          {/* ── Step 2 ── */}
          {step === 2 && (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
                입력 완료 후, 24시간 이내 전문가 연결 가능 여부를 안내드립니다.
              </div>

              <p className="text-sm font-semibold text-slate-800">
                전문가 매칭 안내를 위한 정보를 입력해 주세요.
              </p>

              {/* Name */}
              <label className="block text-sm font-medium text-slate-700">
                성함<span className="ml-0.5 text-red-500">*</span>
                <input
                  required
                  autoComplete="name"
                  className={`mt-1.5 ${inputCls}`}
                  placeholder="홍길동"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>

              {/* Company */}
              <label className="block text-sm font-medium text-slate-700">
                회사명
                <span className="ml-1.5 text-xs font-normal text-slate-400">(선택)</span>
                <input
                  className={`mt-1.5 ${inputCls}`}
                  placeholder="회사명 또는 브랜드명"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </label>

              {/* Contact type */}
              <div>
                <p className="mb-2 text-sm font-medium text-slate-700">
                  연락처<span className="ml-0.5 text-red-500">*</span>
                  <span className="ml-1.5 text-xs font-normal text-slate-400">(이메일 또는 전화번호 중 하나)</span>
                </p>
                <div className="mb-3 flex gap-2">
                  {(["email", "phone"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setContactType(type)}
                      className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                        contactType === type
                          ? "border-blue-700 bg-blue-700 text-white shadow-sm"
                          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {type === "email" ? "이메일" : "전화번호"}
                    </button>
                  ))}
                </div>
                {contactType === "email" ? (
                  <input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    placeholder="example@email.com"
                    className={`${inputCls} border-blue-400 ring-2 ring-blue-200`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    placeholder="010-0000-0000"
                    className={`${inputCls} border-blue-400 ring-2 ring-blue-200`}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                )}
              </div>

              {/* Consult method */}
              <div>
                <p className="mb-2 text-sm font-medium text-slate-700">
                  희망 상담 방식
                  <span className="ml-1.5 text-xs font-normal text-slate-400">(선택)</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {(["email", "phone", "kakao"] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setConsultMethod(consultMethod === m ? "" : m)}
                      className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                        consultMethod === m
                          ? "border-blue-700 bg-blue-700 text-white shadow-sm"
                          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {m === "email" ? "이메일" : m === "phone" ? "전화" : "카카오톡"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit + Back */}
              <div className="space-y-3 pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-blue-700 py-4 text-base font-semibold text-white shadow-md transition hover:bg-blue-800 active:scale-[0.98] disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      처리 중...
                    </span>
                  ) : (
                    "전문가 매칭 요청하기"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => goToStep(1)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  이전으로
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {toast && <Toast message={toast} onClose={closeToast} />}
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   자문위원용 문의 폼  →  advisor_inquiries 테이블
═══════════════════════════════════════════════════════ */
function AdvisorForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState("");

  const closeToast = useCallback(() => setToast(""), []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setToast("");
    if (!agreed) {
      setToast("개인정보 수집 동의가 필요합니다.");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "advisor",
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
          marketing_consent: agreed,
        }),
      });
      if (!res.ok) {
        const json = (await res.json()) as { error?: string };
        const msg = json.error ?? "오류가 발생했습니다. 다시 시도해 주세요.";
        console.error("[advisor_inquiries] 제출 오류:", json);
        setToast(msg);
        return;
      }
      setSubmitted(true);
    } catch (err) {
      console.error("[advisor_inquiries] 네트워크 오류:", err);
      setToast("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) return <SuccessMessage />;

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            이름 (First Name)<span className="ml-0.5 text-red-500">*</span>
            <input
              required
              className={`mt-1.5 ${inputCls}`}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            성 (Last Name)<span className="ml-0.5 text-red-500">*</span>
            <input
              required
              className={`mt-1.5 ${inputCls}`}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            전화번호<span className="ml-0.5 text-red-500">*</span>
            <input
              required
              type="tel"
              className={`mt-1.5 ${inputCls}`}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            이메일<span className="ml-0.5 text-red-500">*</span>
            <input
              required
              type="email"
              className={`mt-1.5 ${inputCls}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>

        <label className="block text-sm font-medium text-slate-700">
          문의 제목<span className="ml-0.5 text-red-500">*</span>
          <input
            required
            className={`mt-1.5 ${inputCls}`}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          상세 내용<span className="ml-0.5 text-red-500">*</span>
          <textarea
            required
            rows={5}
            className={`mt-1.5 ${inputCls} resize-none`}
            placeholder="무엇을 도와드릴까요?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>

        <label className="flex items-start gap-3 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 flex-shrink-0 accent-blue-600"
          />
          개인정보 수집 및 이용, 서비스 안내 메일 수신에 동의합니다.
          <span className="ml-0.5 text-red-500">*</span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-blue-700 py-3.5 text-base font-semibold text-white transition hover:bg-blue-800 disabled:opacity-60"
        >
          {isSubmitting ? "전송 중..." : "문의 보내기"}
        </button>
      </form>

      {toast && <Toast message={toast} onClose={closeToast} />}
    </>
  );
}

/* ── 클라이언트 자문 요청 완료 화면 ────────────────────── */
function ClientSuccessMessage() {
  return (
    <div className="flex flex-col items-center py-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="mt-5 text-xl font-bold text-slate-900">자문 요청이 정상적으로 접수되었습니다.</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
        요청 내용을 검토한 뒤, 24시간 이내 전문가 연결 가능 여부와 다음 진행 절차를 안내해드립니다.
      </p>
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex w-full max-w-xs items-center justify-center gap-2 rounded-xl bg-[#FEE500] py-4 text-base font-bold text-[#3A1D1D] shadow-md transition hover:brightness-95 active:scale-[0.98]"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3C6.477 3 2 6.477 2 10.8c0 2.7 1.523 5.1 3.857 6.6L5 21l4.286-2.4c.877.2 1.786.3 2.714.3 5.523 0 10-3.477 10-7.8S17.523 3 12 3z" />
        </svg>
        카카오톡으로 바로 상담 이어가기
      </a>
      <p className="mt-2 text-xs text-slate-400">빠른 매칭을 원하시면 지금 바로 문의해 주세요.</p>
      <div className="mt-5 space-y-1">
        <p className="text-xs text-slate-400">요청 순서대로 빠르게 검토됩니다</p>
        <p className="text-xs text-slate-400">평균 응답 시간: 12~24시간</p>
      </div>
    </div>
  );
}

/* ── 제출 완료 화면 ─────────────────────────────────── */
function SuccessMessage() {
  return (
    <div className="flex flex-col items-center py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="mt-5 text-xl font-bold text-slate-900">문의가 접수되었습니다</h3>
      <p className="mt-2 text-sm text-slate-500">
        1영업일 이내에 담당자가 이메일로 회신드립니다.
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   메인 Contact 페이지
═══════════════════════════════════════════════════════ */
export default function ContactPage() {
  const [tab, setTab] = useState<Tab>("client");

  return (
    <main className="min-h-screen bg-[#f0f4f8]">
      {/* ── Hero 헤더 ── */}
      <section className="bg-[#0a1628]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-300">
            K-뷰티 브랜드 실무 자문 플랫폼
          </p>
          <h1 className="mt-4 text-3xl font-bold text-white md:text-4xl">
            문의하기
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-300">
            클라이언트 또는 자문위원으로 문의하실 내용을 선택해 주세요.
            담당자가 빠르게 검토 후 1영업일 이내에 회신드립니다.
          </p>
        </div>
      </section>

      {/* ── 탭 + 폼 영역 ── */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
        {/* 탭 선택 */}
        <div className="mb-8 flex gap-1 rounded-xl bg-white p-1 shadow-sm ring-1 ring-slate-200">
          <button
            onClick={() => setTab("client")}
            className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition ${
              tab === "client"
                ? "bg-blue-700 text-white shadow"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            클라이언트 문의
          </button>
          <button
            onClick={() => setTab("advisor")}
            className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition ${
              tab === "advisor"
                ? "bg-blue-700 text-white shadow"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            자문위원 문의
          </button>
        </div>

        {/* 설명 카드 */}
        <div className="mb-8 rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
          {tab === "client" ? (
            <div className="flex gap-4">
              <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-slate-900">클라이언트 문의</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">
                  K-뷰티 브랜드의 해외 진출, 유통, 마케팅 전략 등 비즈니스 자문이 필요하신 기업 담당자를 위한 문의입니다.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex gap-4">
              <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-slate-900">자문위원 문의</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">
                  K-뷰티 관련 실무 경험을 보유한 전문가로서 자문위원으로 참여하고 싶은 분들을 위한 문의입니다.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 폼 카드 */}
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-8">
          <h2 className="mb-6 text-lg font-bold text-slate-900">
            {tab === "client" ? "클라이언트 문의 양식" : "자문위원 문의 양식"}
          </h2>
          {tab === "client" ? <ClientForm /> : <AdvisorForm />}
        </div>

        {/* 하단 안내 */}
        <p className="mt-6 text-center text-xs text-slate-400">
          긴급 문의:{" "}
          <a href="tel:01050544125" className="font-semibold text-slate-600 hover:text-blue-700">
            010-5054-4125
          </a>{" "}
          (평일 10:00 – 18:00)
        </p>
      </section>
    </main>
  );
}
