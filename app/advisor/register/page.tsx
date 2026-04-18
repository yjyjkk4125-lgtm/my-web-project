"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ══════════════════════════════════════════════════
   데이터 상수
══════════════════════════════════════════════════ */

const PRIORITY_COUNTRIES = [
  "한국", "미국", "영국", "독일", "프랑스", "이탈리아", "스페인", "네덜란드",
  "싱가포르", "말레이시아", "태국", "베트남", "인도네시아", "필리핀", "일본", "중국",
];
const OTHER_COUNTRIES = [
  "호주", "캐나다", "뉴질랜드", "인도", "브라질", "멕시코", "아르헨티나",
  "러시아", "터키", "스위스", "스웨덴", "노르웨이", "덴마크", "핀란드",
  "폴란드", "체코", "오스트리아", "벨기에", "포르투갈", "그리스",
  "사우디아라비아", "아랍에미리트", "이스라엘", "이집트", "남아프리카공화국",
];
const ALL_COUNTRIES = [...PRIORITY_COUNTRIES, "─────────────", ...OTHER_COUNTRIES];

type PhoneCode = { label: string; code: string };
const PHONE_CODES: PhoneCode[] = [
  { label: "🇰🇷 +82 한국", code: "+82" },
  { label: "🇺🇸 +1  미국", code: "+1" },
  { label: "🇬🇧 +44 영국", code: "+44" },
  { label: "🇩🇪 +49 독일", code: "+49" },
  { label: "🇫🇷 +33 프랑스", code: "+33" },
  { label: "🇮🇹 +39 이탈리아", code: "+39" },
  { label: "🇪🇸 +34 스페인", code: "+34" },
  { label: "🇳🇱 +31 네덜란드", code: "+31" },
  { label: "🇸🇬 +65 싱가포르", code: "+65" },
  { label: "🇲🇾 +60 말레이시아", code: "+60" },
  { label: "🇹🇭 +66 태국", code: "+66" },
  { label: "🇻🇳 +84 베트남", code: "+84" },
  { label: "🇮🇩 +62 인도네시아", code: "+62" },
  { label: "🇵🇭 +63 필리핀", code: "+63" },
  { label: "🇯🇵 +81 일본", code: "+81" },
  { label: "🇨🇳 +86 중국", code: "+86" },
  { label: "🇦🇺 +61 호주", code: "+61" },
  { label: "🇨🇦 +1  캐나다", code: "+1" },
  { label: "🇮🇳 +91 인도", code: "+91" },
  { label: "🇧🇷 +55 브라질", code: "+55" },
  { label: "🇨🇭 +41 스위스", code: "+41" },
  { label: "🇸🇪 +46 스웨덴", code: "+46" },
  { label: "🇦🇪 +971 UAE", code: "+971" },
  { label: "🇸🇦 +966 사우디", code: "+966" },
];

const SPECIALTIES = [
  "상품 기획/제조", "현지 유통/영업", "마케팅/브랜딩",
  "인증/규제", "물류/운영", "이커머스 전략", "기타",
];
const CONSULT_TYPES = ["유선전화 자문", "화상전화 자문"];
const FEE_TABLE = [
  { range: "3,000 ~ 5,000만원", fee: "3 ~ 5만원" },
  { range: "5,000 ~ 8,000만원", fee: "5 ~ 8만원" },
  { range: "8,000만 ~ 1억원", fee: "8 ~ 12만원" },
  { range: "1억원 이상", fee: "12만원 이상" },
];

/* ══════════════════════════════════════════════════
   폼 데이터 타입
══════════════════════════════════════════════════ */

type FormData = {
  fullName: string;
  email: string;
  country: string;
  phoneCode: string;
  phone: string;
  linkedinUrl: string;
  resumeFile: File | null;
  careerSummary: string;
  specialties: string[];
  consultTypes: string[];
  desiredFee: string;
  agreed: boolean;
};

const initialForm: FormData = {
  fullName: "", email: "", country: "", phoneCode: "+82", phone: "",
  linkedinUrl: "", resumeFile: null, careerSummary: "",
  specialties: [], consultTypes: [], desiredFee: "", agreed: false,
};

/* ══════════════════════════════════════════════════
   공용 컴포넌트: SearchableDropdown
══════════════════════════════════════════════════ */

function SearchableDropdown({
  options,
  value,
  onChange,
  placeholder,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = options.filter(
    (o) => o === "─────────────" || o.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm text-slate-700 transition hover:border-blue-400 focus:outline-none"
      >
        <span className={value ? "text-slate-900" : "text-slate-400"}>
          {value || placeholder}
        </span>
        <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl">
          <div className="border-b border-slate-100 p-2">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="검색..."
              className="w-full rounded-md bg-slate-50 px-3 py-2 text-sm focus:outline-none"
            />
          </div>
          <ul className="max-h-52 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-4 py-2 text-sm text-slate-400">결과 없음</li>
            ) : (
              filtered.map((opt, i) =>
                opt === "─────────────" ? (
                  <li key={i} className="cursor-default px-4 py-1 text-xs text-slate-300">
                    ───────────────
                  </li>
                ) : (
                  <li
                    key={opt}
                    onClick={() => { onChange(opt); setOpen(false); setQuery(""); }}
                    className={`cursor-pointer px-4 py-2.5 text-sm transition hover:bg-blue-50 hover:text-blue-700 ${value === opt ? "bg-blue-50 font-semibold text-blue-700" : "text-slate-700"}`}
                  >
                    {opt}
                  </li>
                )
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ── PhoneCodeDropdown (코드만 표시) */
function PhoneCodeDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = PHONE_CODES.filter((p) =>
    p.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div ref={ref} className="relative w-36">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 transition hover:border-blue-400 focus:outline-none"
      >
        <span>{value}</span>
        <svg className="h-3.5 w-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-64 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl">
          <div className="border-b border-slate-100 p-2">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="국가/코드 검색..."
              className="w-full rounded-md bg-slate-50 px-3 py-2 text-sm focus:outline-none"
            />
          </div>
          <ul className="max-h-52 overflow-y-auto py-1">
            {filtered.map((p) => (
              <li
                key={p.label}
                onClick={() => { onChange(p.code); setOpen(false); setQuery(""); }}
                className={`cursor-pointer px-4 py-2.5 font-mono text-sm transition hover:bg-blue-50 hover:text-blue-700 ${value === p.code ? "bg-blue-50 font-semibold text-blue-700" : "text-slate-700"}`}
              >
                {p.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   공용 스타일
══════════════════════════════════════════════════ */

const inputCls =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500";

const labelCls = "block text-sm font-medium text-slate-700";

/* ══════════════════════════════════════════════════
   메인 페이지 컴포넌트
══════════════════════════════════════════════════ */

export default function AdvisorRegisterPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [done, setDone] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (key: keyof FormData, value: unknown) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleArr = (key: "specialties" | "consultTypes", val: string) =>
    set(
      key,
      (form[key] as string[]).includes(val)
        ? (form[key] as string[]).filter((v) => v !== val)
        : [...(form[key] as string[]), val]
    );

  const handleSubmit = () => {
    const payload = { ...form, resumeFile: form.resumeFile?.name ?? null };
    console.log("advisor_registrations payload:", payload);
    setDone(true);
  };

  /* ── 프로그레스 바 */
  const ProgressBar = () => (
    <div className="mb-12">
      <div className="flex items-center justify-center gap-0">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex items-center">
            <div className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-bold transition-all ${
              step > n
                ? "border-blue-700 bg-blue-700 text-white"
                : step === n
                ? "border-blue-700 bg-white text-blue-700"
                : "border-slate-200 bg-white text-slate-400"
            }`}>
              {step > n ? (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : n}
            </div>
            {n < 3 && (
              <div className={`h-0.5 w-24 transition-all sm:w-32 ${step > n ? "bg-blue-700" : "bg-slate-200"}`} />
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-0">
        {["기본 정보", "전문성 증빙", "전문 분야 · 자문료"].map((label, i) => (
          <p
            key={label}
            className={`w-28 text-center text-xs sm:w-36 ${step === i + 1 ? "font-semibold text-blue-700" : "text-slate-400"}`}
          >
            {label}
          </p>
        ))}
      </div>
    </div>
  );

  if (done) {
    return (
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-slate-50 px-6 py-20">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
            <svg className="h-10 w-10 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mt-6 text-2xl font-bold text-slate-900">등록 신청이 완료되었습니다</h2>
          <p className="mt-3 text-slate-500">VIALOCAL팀이 검토 후 이메일로 연락드립니다.</p>
          <Link
            href="/advisor"
            className="mt-8 inline-block rounded-lg bg-blue-700 px-7 py-3 text-sm font-semibold text-white hover:bg-blue-800"
          >
            자문위원 페이지로 돌아가기
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-slate-50">
      <div className="mx-auto max-w-2xl px-6 py-16 lg:py-20">

        {/* 상단 제목 */}
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">VIALOCAL</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">자문위원 등록</h1>
          <p className="mt-2 text-sm text-slate-500">
            전문 경험을 K-뷰티 브랜드와 나눠보세요.
          </p>
        </div>

        <ProgressBar />

        {/* ────────────────────────────────────────
            Step 1 — 기본 정보
        ──────────────────────────────────────── */}
        {step === 1 && (
          <div className="space-y-8 rounded-2xl bg-white p-8 shadow-sm lg:p-10">
            <div>
              <h2 className="text-lg font-bold text-slate-900">기본 정보</h2>
              <p className="mt-1 text-sm text-slate-500">자문위원으로 연락 가능한 정보를 입력해주세요.</p>
            </div>

            <div className="space-y-6">
              {/* 성함 */}
              <div>
                <label className={labelCls}>
                  성함 <span className="text-red-500">*</span>
                </label>
                <input
                  className={`${inputCls} mt-1.5`}
                  placeholder="홍길동"
                  value={form.fullName}
                  onChange={(e) => set("fullName", e.target.value)}
                />
              </div>

              {/* 이메일 */}
              <div>
                <label className={labelCls}>
                  이메일 <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className={`${inputCls} mt-1.5`}
                  placeholder="example@email.com"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                />
              </div>

              {/* 거주 국가 */}
              <div>
                <label className={labelCls}>
                  거주 국가 <span className="text-red-500">*</span>
                </label>
                <div className="mt-1.5">
                  <SearchableDropdown
                    options={ALL_COUNTRIES}
                    value={form.country}
                    onChange={(v) => set("country", v)}
                    placeholder="국가를 선택해주세요"
                  />
                </div>
              </div>

              {/* 연락처 */}
              <div>
                <label className={labelCls}>
                  연락처 <span className="text-red-500">*</span>
                </label>
                <div className="mt-1.5 flex gap-2">
                  <PhoneCodeDropdown
                    value={form.phoneCode}
                    onChange={(v) => set("phoneCode", v)}
                  />
                  <input
                    type="tel"
                    className={`${inputCls} flex-1`}
                    placeholder="010-0000-0000"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setStep(2)}
                className="w-full rounded-lg bg-blue-700 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                다음으로 →
              </button>
            </div>
          </div>
        )}

        {/* ────────────────────────────────────────
            Step 2 — 전문성 및 증빙
        ──────────────────────────────────────── */}
        {step === 2 && (
          <div className="space-y-8 rounded-2xl bg-white p-8 shadow-sm lg:p-10">
            <div>
              <h2 className="text-lg font-bold text-slate-900">전문성 및 증빙</h2>
              <p className="mt-1 text-sm text-slate-500">
                링크드인 프로필 또는 이력서가 있다면 등록해 주세요.{" "}
                <span className="text-slate-400">(선택 사항)</span>
              </p>
            </div>

            <div className="space-y-6">
              {/* 링크드인 */}
              <div>
                <label className={labelCls}>링크드인 프로필 URL</label>
                <input
                  className={`${inputCls} mt-1.5`}
                  placeholder="https://www.linkedin.com/in/..."
                  value={form.linkedinUrl}
                  onChange={(e) => set("linkedinUrl", e.target.value)}
                />
              </div>

              {/* 이력서 업로드 */}
              <div>
                <label className={labelCls}>이력서 업로드</label>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => set("resumeFile", e.target.files?.[0] ?? null)}
                />
                <div className="mt-1.5 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm text-slate-700 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
                  >
                    파일 선택
                  </button>
                  <span className="text-sm text-slate-400">
                    {form.resumeFile ? form.resumeFile.name : "PDF 또는 Word 파일 (.pdf, .doc, .docx)"}
                  </span>
                </div>
              </div>

              {/* 경력 요약 */}
              <div>
                <label className={labelCls}>
                  경력 및 전문성 소개 <span className="text-red-500">*</span>
                </label>
                <p className="mb-1.5 mt-1 text-xs text-slate-400">
                  주요 경력, 담당 업무, 핵심 스킬 및 프로젝트 경험을 자유롭게 입력해 주세요.
                  증빙 자료가 없는 경우에도 상세히 작성하시면 충분합니다.
                </p>
                <textarea
                  rows={10}
                  className={inputCls}
                  placeholder={`예시)\n• OO뷰티 해외사업팀 5년 근무 (미국/동남아 유통 담당)\n• 아마존/쇼피파이 브랜드 론칭 5건 경험\n• FDA, HALAL 인증 절차 실무 경험\n• 현재 프리랜서 컨설턴트로 활동 중`}
                  value={form.careerSummary}
                  onChange={(e) => set("careerSummary", e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 rounded-lg border border-slate-200 py-3.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                ← 이전으로
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 rounded-lg bg-blue-700 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                다음으로 →
              </button>
            </div>
          </div>
        )}

        {/* ────────────────────────────────────────
            Step 3 — 전문 분야 · 자문료 · 약관
        ──────────────────────────────────────── */}
        {step === 3 && (
          <div className="space-y-8 rounded-2xl bg-white p-8 shadow-sm lg:p-10">
            <div>
              <h2 className="text-lg font-bold text-slate-900">전문 분야 · 자문료 · 약관</h2>
              <p className="mt-1 text-sm text-slate-500">자문 가능한 분야와 희망 자문료를 설정해주세요.</p>
            </div>

            <div className="space-y-8">
              {/* 전문 분야 */}
              <div>
                <label className={labelCls}>
                  전문 분야 <span className="text-red-500">*</span>{" "}
                  <span className="font-normal text-slate-400">(중복 선택 가능)</span>
                </label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {SPECIALTIES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleArr("specialties", s)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                        form.specialties.includes(s)
                          ? "border-blue-700 bg-blue-700 text-white"
                          : "border-slate-200 bg-white text-slate-600 hover:border-blue-400 hover:text-blue-700"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* 자문 형태 */}
              <div>
                <label className={labelCls}>
                  자문 가능 형태 <span className="text-red-500">*</span>{" "}
                  <span className="font-normal text-slate-400">(중복 선택 가능)</span>
                </label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {CONSULT_TYPES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => toggleArr("consultTypes", t)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                        form.consultTypes.includes(t)
                          ? "border-blue-700 bg-blue-700 text-white"
                          : "border-slate-200 bg-white text-slate-600 hover:border-blue-400 hover:text-blue-700"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* 자문료 추천 표 */}
              <div>
                <label className={labelCls}>자문료 설정</label>
                <div className="mt-3 overflow-hidden rounded-xl border border-slate-200">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-5 py-3 text-left font-semibold text-slate-600">연봉 구간</th>
                        <th className="px-5 py-3 text-left font-semibold text-slate-600">추천 자문료 (시간당)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {FEE_TABLE.map((row) => (
                        <tr key={row.range} className="hover:bg-slate-50">
                          <td className="px-5 py-3.5 text-slate-700">{row.range}</td>
                          <td className="px-5 py-3.5 font-semibold text-blue-700">{row.fee}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-2.5 text-xs text-slate-400">
                  위 금액은 참고용 추천 자문료입니다. 실제 자문료는 경력과 전문 분야에 따라 브랜드사와 매칭 시 최종 확정됩니다.
                </p>

                {/* 희망 자문료 입력 */}
                <div className="mt-4 flex items-center gap-3">
                  <label className={`${labelCls} flex-shrink-0`}>희망 자문료</label>
                  <div className="flex flex-1 items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      className={`${inputCls} w-36 text-right`}
                      placeholder="50,000"
                      value={form.desiredFee}
                      onChange={(e) => set("desiredFee", e.target.value)}
                    />
                    <span className="text-sm text-slate-500">원 / 시간당</span>
                  </div>
                </div>
              </div>

              {/* 약관 동의 */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={form.agreed}
                    onChange={(e) => set("agreed", e.target.checked)}
                    className="mt-0.5 h-4 w-4 flex-shrink-0 accent-blue-700"
                  />
                  <span className="text-sm leading-relaxed text-slate-700">
                    <span className="underline decoration-slate-400 underline-offset-2 hover:text-blue-700 cursor-pointer">
                      비밀유지 의무
                    </span>{" "}
                    및 자문 내용에 대한{" "}
                    <span className="underline decoration-slate-400 underline-offset-2 hover:text-blue-700 cursor-pointer">
                      자문위원 본인 책임 원칙
                    </span>
                    에 동의합니다.{" "}
                    <span className="text-red-500">*</span>
                  </span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setStep(2)}
                className="w-1/3 rounded-lg border border-slate-200 py-3.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                ← 이전으로
              </button>
              <button
                onClick={handleSubmit}
                disabled={!form.agreed || form.specialties.length === 0 || form.consultTypes.length === 0}
                className="flex-1 rounded-lg bg-blue-700 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                저장 및 완료
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
