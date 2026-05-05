"use client";

import { FormEvent, useState } from "react";

/* ── 공용 인풋 스타일 ─────────────────────────────────── */
const inputCls =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200";

/* ── 탭 타입 ─────────────────────────────────────────── */
type Tab = "client" | "advisor";

/* ═══════════════════════════════════════════════════════
   클라이언트용 문의 폼
═══════════════════════════════════════════════════════ */
function ClientForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!agreed) {
      setError("개인정보 수집 동의가 필요합니다.");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "client",
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          company: company.trim(),
          phone: phone.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });
      if (!res.ok) {
        const json = (await res.json()) as { error?: string };
        setError(json.error ?? "오류가 발생했습니다. 다시 시도해 주세요.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return <SuccessMessage />;
  }

  return (
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

      <label className="block text-sm font-medium text-slate-700">
        회사명<span className="ml-0.5 text-red-500">*</span>
        <input
          required
          className={`mt-1.5 ${inputCls}`}
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </label>

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
        문의 내용<span className="ml-0.5 text-red-500">*</span>
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

      {error && <p className="text-sm font-medium text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-blue-700 py-3.5 text-base font-semibold text-white transition hover:bg-blue-800 disabled:opacity-60"
      >
        {isSubmitting ? "전송 중..." : "문의 보내기"}
      </button>
    </form>
  );
}

/* ═══════════════════════════════════════════════════════
   자문위원용 문의 폼
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
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!agreed) {
      setError("개인정보 수집 동의가 필요합니다.");
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
        }),
      });
      if (!res.ok) {
        const json = (await res.json()) as { error?: string };
        setError(json.error ?? "오류가 발생했습니다. 다시 시도해 주세요.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return <SuccessMessage />;
  }

  return (
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

      {error && <p className="text-sm font-medium text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-blue-700 py-3.5 text-base font-semibold text-white transition hover:bg-blue-800 disabled:opacity-60"
      >
        {isSubmitting ? "전송 중..." : "문의 보내기"}
      </button>
    </form>
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
      </section>
    </main>
  );
}
