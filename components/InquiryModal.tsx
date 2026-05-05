"use client";

import { FormEvent, useEffect, useState, useCallback, useRef } from "react";
import { useModal } from "@/context/ModalContext";

const inputCls =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200";

export default function InquiryModal() {
  const { isOpen, closeModal } = useModal();

  const [step, setStep] = useState<1 | 2>(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  /* Step 1 */
  const [problemText, setProblemText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /* Step 2 */
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [contactType, setContactType] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consultMethod, setConsultMethod] = useState<"email" | "phone" | "kakao" | "">("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  /* ESC 키로 모달 닫기 + 스크롤 잠금 */
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

  /* 모달 닫힐 때 폼 초기화 */
  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setProblemText("");
      setName("");
      setCompany("");
      setContactType("email");
      setEmail("");
      setPhone("");
      setConsultMethod("");
      setIsSubmitting(false);
      setSubmitted(false);
      setErrorMsg("");
    }
  }, [isOpen]);

  const stopPropagation = useCallback((e: React.MouseEvent) => e.stopPropagation(), []);

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
    }, 200);
  };

  const handleStep1Next = () => {
    if (!problemText.trim()) {
      setErrorMsg("해결하고 싶은 문제를 입력해 주세요.");
      return;
    }
    setErrorMsg("");
    goToStep(2);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!name.trim()) {
      setErrorMsg("성함을 입력해 주세요.");
      return;
    }
    if (contactType === "email" && !email.trim()) {
      setErrorMsg("이메일을 입력해 주세요.");
      return;
    }
    if (contactType === "phone" && !phone.trim()) {
      setErrorMsg("전화번호를 입력해 주세요.");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: name.trim(),
          last_name: "",
          company: company.trim(),
          email: email.trim(),
          phone: phone.trim(),
          position: consultMethod || "",
          main_task: "",
          experience: problemText.trim(),
        }),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) {
        setErrorMsg(json.error ?? "오류가 발생했습니다. 다시 시도해 주세요.");
        return;
      }
      setSubmitted(true);
    } catch {
      setErrorMsg("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* ── 닫기 버튼: 항상 화면 우측 상단에 고정 ── */}
      <button
        onClick={closeModal}
        className="fixed right-4 top-4 z-[300] flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md text-slate-500 transition hover:bg-white hover:text-slate-800"
        aria-label="모달 닫기"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* ── 오버레이: 자체 스크롤 ── */}
      <div
        className="fixed inset-0 z-[200] overflow-y-auto bg-black/60 backdrop-blur-sm"
        onClick={closeModal}
      >
        {/* 세로 중앙 정렬 래퍼 */}
        <div
          className="flex min-h-full items-start justify-center p-4 py-12 lg:items-center"
          onClick={stopPropagation}
        >
          {/* ── 모달 패널 ── */}
          <div className="w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl flex flex-col lg:flex-row">

            {/* ── 가이드 패널 ── */}
            <div className="flex flex-col gap-6 bg-[#0a1628] px-6 py-8 text-white lg:w-[38%] lg:gap-0 lg:justify-between lg:px-10 lg:py-12">

              {/* ① 상단: 핵심 메시지 */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-300">
                  K-뷰티 브랜드 실무 자문
                </p>
                <h2 className="mt-3 text-xl font-bold leading-snug lg:text-2xl">
                  비즈니스 자문 신청
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  빠르게 문제를 정리하고<br />
                  적합한 전문가를 연결해드립니다
                </p>
              </div>

              {/* ② 중단: Step Progress */}
              <div>
                <div className="flex items-center gap-1.5">
                  <div
                    className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                      step >= 1 ? "bg-blue-500 text-white" : "bg-white/20 text-white/60"
                    }`}
                  >
                    {step > 1 ? (
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : "1"}
                  </div>
                  <span className={`text-xs font-semibold ${step === 1 ? "text-white" : "text-white/50"}`}>
                    문제 입력
                  </span>
                  <div className="mx-1 h-px flex-1 bg-white/20">
                    <div
                      className={`h-full bg-blue-400 transition-all duration-500 ${step === 2 ? "w-full" : "w-0"}`}
                    />
                  </div>
                  <div
                    className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                      step === 2 ? "bg-blue-500 text-white" : "bg-white/20 text-white/60"
                    }`}
                  >
                    2
                  </div>
                  <span className={`text-xs ${step === 2 ? "font-semibold text-white" : "text-white/40"}`}>
                    연락처 입력
                  </span>
                </div>
              </div>

              {/* ③ 하단: 신뢰 요소 */}
              <div className="space-y-2">
                {["평균 12시간 내 응답", "실무 경험 기반 자문", "불필요한 컨설팅 없음"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="h-1 w-1 flex-shrink-0 rounded-full bg-blue-400" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* ── 폼 패널 (모바일: 하단 / 데스크탑: 오른쪽) ── */}
            <div className="flex-1 bg-white px-6 py-8 lg:px-8 lg:py-10">
              {submitted ? (
                /* 제출 완료 화면 */
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-slate-900">
                    자문 요청이 정상적으로 접수되었습니다.
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
                    요청 내용을 검토한 뒤, 24시간 이내 전문가 연결 가능 여부와 다음 진행 절차를 안내해드립니다.
                  </p>
                  <a
                    href="https://open.kakao.com/o/sOT0q5pi"
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
                 
                  <button
                    onClick={closeModal}
                    className="mt-6 rounded-lg border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                  >
                    닫기
                  </button>
                </div>
              ) : (
                <>
                  {/* Hero */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold leading-snug text-slate-900">
                      해결하고 싶은 문제를 입력해 주세요
                    </h3>
                    <p className="mt-1.5 text-sm text-slate-400">
                      간단히 작성해도 괜찮습니다
                    </p>
                  </div>

                  {/* 폼 영역 (fade 전환) */}
                  <div
                    className={`transition-all duration-200 ${
                      isTransitioning ? "translate-x-2 opacity-0" : "translate-x-0 opacity-100"
                    }`}
                  >
                    {/* ── Step 1 ── */}
                    {step === 1 && (
                      <div className="space-y-6">
                        <textarea
                          ref={textareaRef}
                          value={problemText}
                          onChange={handleTextareaChange}
                          onFocus={(e) => {
                            setTimeout(() => {
                              e.target.scrollIntoView({ behavior: "smooth", block: "nearest" });
                            }, 350);
                          }}
                          placeholder="예: 틱톡샵 진출 전략이 궁금합니다"
                          className={`${inputCls} min-h-[192px] resize-none leading-relaxed`}
                          style={{ overflow: "hidden" }}
                        />

                        {errorMsg && <p className="text-sm font-medium text-red-500">{errorMsg}</p>}

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
                      <form onSubmit={handleSubmit} noValidate className="space-y-4">
                        <p className="text-sm font-semibold text-slate-800">
                          전문가 매칭을 위해 최소 정보만 입력해 주세요
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
                            연락받을 방법
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

                        {errorMsg && <p className="text-sm font-medium text-red-500">{errorMsg}</p>}

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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
