"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

/* ══════════════════════════════════════════════════
   전 세계 국가 리스트 (우선순위 + 전체 알파벳순)
══════════════════════════════════════════════════ */

const PRIORITY_COUNTRIES = [
  "한국", "미국", "영국", "독일", "프랑스", "이탈리아", "스페인", "네덜란드",
  "싱가포르", "말레이시아", "태국", "베트남", "인도네시아", "필리핀", "일본", "중국",
];

const OTHER_COUNTRIES = [
  "가나", "가봉", "가이아나", "감비아", "과테말라", "그레나다", "그리스",
  "기니", "기니비사우", "나미비아", "나우루", "나이지리아", "남수단", "남아프리카공화국",
  "네팔", "노르웨이", "뉴질랜드", "니제르", "니카라과",
  "덴마크", "도미니카", "도미니카공화국", "동티모르",
  "라오스", "라이베리아", "라트비아", "레바논", "레소토", "루마니아", "룩셈부르크",
  "르완다", "리비아", "리투아니아", "리히텐슈타인",
  "마다가스카르", "마샬군도", "말라위", "말리", "멕시코",
  "모나코", "모로코", "모리셔스", "모리타니아", "모잠비크",
  "몬테네그로", "몰도바", "몰디브", "몰타", "몽골", "미크로네시아", "미얀마",
  "바누아투", "바레인", "바베이도스", "바하마", "바티칸",
  "방글라데시", "벨기에", "벨라루스", "벨리즈", "베냉", "베네수엘라",
  "보스니아헤르체고비나", "보츠와나", "볼리비아", "부룬디", "부르키나파소", "부탄", "불가리아",
  "브라질", "브루나이",
  "산마리노", "상투메프린시페", "사모아", "사우디아라비아",
  "세네갈", "세르비아", "세이셸", "세인트루시아", "세인트빈센트그레나딘", "세인트키츠네비스",
  "소말리아", "솔로몬제도", "수단", "수리남", "스리랑카", "스웨덴", "스위스",
  "슬로바키아", "슬로베니아", "시리아", "시에라리온",
  "아랍에미리트", "아르메니아", "아르헨티나", "아이슬란드", "아이티",
  "아일랜드", "아제르바이잔", "아프가니스탄",
  "안도라", "알바니아", "알제리", "앙골라", "앤티가바부다",
  "에리트레아", "에스와티니", "에스토니아", "에콰도르", "에티오피아", "엘살바도르",
  "예멘", "오만", "오스트리아", "온두라스", "요르단",
  "우간다", "우루과이", "우즈베키스탄", "우크라이나",
  "이라크", "이란", "이스라엘", "이집트",
  "자메이카", "잠비아", "적도기니", "조지아",
  "중앙아프리카공화국", "차드", "칠레",
  "카메룬", "카보베르데", "카자흐스탄", "카타르", "캄보디아", "캐나다",
  "케냐", "코모로", "코스타리카", "코트디부아르", "콜롬비아",
  "콩고공화국", "콩고민주공화국", "쿠바", "쿠웨이트",
  "키르기스스탄", "키리바시", "키프로스",
  "타지키스탄", "탄자니아", "터키", "통가", "투르크메니스탄", "투발루", "튀니지",
  "트리니다드토바고",
  "파나마", "파라과이", "파키스탄", "파푸아뉴기니", "팔라우", "페루",
  "포르투갈", "폴란드", "프랑스령폴리네시아",
  "피지", "핀란드", "헝가리",
  "호주", "홍콩", "대만", "마카오",
  "북마케도니아", "북한", "코소보", "팔레스타인", "서사하라",
];

const ALL_COUNTRIES = [...PRIORITY_COUNTRIES, "─────────────", ...OTHER_COUNTRIES];

/* ══════════════════════════════════════════════════
   전 세계 국가 전화 국번 리스트
══════════════════════════════════════════════════ */

type PhoneCode = { label: string; code: string };

const PHONE_CODES: PhoneCode[] = [
  { label: "🇰🇷 +82  한국", code: "+82" },
  { label: "🇺🇸 +1   미국", code: "+1" },
  { label: "🇬🇧 +44  영국", code: "+44" },
  { label: "🇩🇪 +49  독일", code: "+49" },
  { label: "🇫🇷 +33  프랑스", code: "+33" },
  { label: "🇮🇹 +39  이탈리아", code: "+39" },
  { label: "🇪🇸 +34  스페인", code: "+34" },
  { label: "🇳🇱 +31  네덜란드", code: "+31" },
  { label: "🇸🇬 +65  싱가포르", code: "+65" },
  { label: "🇲🇾 +60  말레이시아", code: "+60" },
  { label: "🇹🇭 +66  태국", code: "+66" },
  { label: "🇻🇳 +84  베트남", code: "+84" },
  { label: "🇮🇩 +62  인도네시아", code: "+62" },
  { label: "🇵🇭 +63  필리핀", code: "+63" },
  { label: "🇯🇵 +81  일본", code: "+81" },
  { label: "🇨🇳 +86  중국", code: "+86" },
  { label: "🇦🇺 +61  호주", code: "+61" },
  { label: "🇨🇦 +1   캐나다", code: "+1-CA" },
  { label: "🇮🇳 +91  인도", code: "+91" },
  { label: "🇧🇷 +55  브라질", code: "+55" },
  { label: "🇲🇽 +52  멕시코", code: "+52" },
  { label: "🇦🇷 +54  아르헨티나", code: "+54" },
  { label: "🇨🇭 +41  스위스", code: "+41" },
  { label: "🇸🇪 +46  스웨덴", code: "+46" },
  { label: "🇳🇴 +47  노르웨이", code: "+47" },
  { label: "🇩🇰 +45  덴마크", code: "+45" },
  { label: "🇫🇮 +358 핀란드", code: "+358" },
  { label: "🇵🇱 +48  폴란드", code: "+48" },
  { label: "🇦🇹 +43  오스트리아", code: "+43" },
  { label: "🇧🇪 +32  벨기에", code: "+32" },
  { label: "🇵🇹 +351 포르투갈", code: "+351" },
  { label: "🇬🇷 +30  그리스", code: "+30" },
  { label: "🇨🇿 +420 체코", code: "+420" },
  { label: "🇭🇺 +36  헝가리", code: "+36" },
  { label: "🇷🇴 +40  루마니아", code: "+40" },
  { label: "🇸🇰 +421 슬로바키아", code: "+421" },
  { label: "🇸🇮 +386 슬로베니아", code: "+386" },
  { label: "🇭🇷 +385 크로아티아", code: "+385" },
  { label: "🇷🇸 +381 세르비아", code: "+381" },
  { label: "🇧🇬 +359 불가리아", code: "+359" },
  { label: "🇺🇦 +380 우크라이나", code: "+380" },
  { label: "🇷🇺 +7   러시아", code: "+7" },
  { label: "🇹🇷 +90  터키", code: "+90" },
  { label: "🇦🇪 +971 아랍에미리트", code: "+971" },
  { label: "🇸🇦 +966 사우디아라비아", code: "+966" },
  { label: "🇮🇱 +972 이스라엘", code: "+972" },
  { label: "🇪🇬 +20  이집트", code: "+20" },
  { label: "🇿🇦 +27  남아프리카공화국", code: "+27" },
  { label: "🇳🇬 +234 나이지리아", code: "+234" },
  { label: "🇰🇪 +254 케냐", code: "+254" },
  { label: "🇬🇭 +233 가나", code: "+233" },
  { label: "🇵🇰 +92  파키스탄", code: "+92" },
  { label: "🇧🇩 +880 방글라데시", code: "+880" },
  { label: "🇱🇰 +94  스리랑카", code: "+94" },
  { label: "🇳🇵 +977 네팔", code: "+977" },
  { label: "🇲🇲 +95  미얀마", code: "+95" },
  { label: "🇰🇭 +855 캄보디아", code: "+855" },
  { label: "🇱🇦 +856 라오스", code: "+856" },
  { label: "🇧🇳 +673 브루나이", code: "+673" },
  { label: "🇹🇼 +886 대만", code: "+886" },
  { label: "🇭🇰 +852 홍콩", code: "+852" },
  { label: "🇲🇴 +853 마카오", code: "+853" },
  { label: "🇲🇳 +976 몽골", code: "+976" },
  { label: "🇰🇿 +7   카자흐스탄", code: "+7-KZ" },
  { label: "🇺🇿 +998 우즈베키스탄", code: "+998" },
  { label: "🇦🇿 +994 아제르바이잔", code: "+994" },
  { label: "🇬🇪 +995 조지아", code: "+995" },
  { label: "🇦🇲 +374 아르메니아", code: "+374" },
  { label: "🇮🇷 +98  이란", code: "+98" },
  { label: "🇮🇶 +964 이라크", code: "+964" },
  { label: "🇯🇴 +962 요르단", code: "+962" },
  { label: "🇱🇧 +961 레바논", code: "+961" },
  { label: "🇰🇼 +965 쿠웨이트", code: "+965" },
  { label: "🇶🇦 +974 카타르", code: "+974" },
  { label: "🇧🇭 +973 바레인", code: "+973" },
  { label: "🇴🇲 +968 오만", code: "+968" },
  { label: "🇾🇪 +967 예멘", code: "+967" },
  { label: "🇸🇾 +963 시리아", code: "+963" },
  { label: "🇨🇱 +56  칠레", code: "+56" },
  { label: "🇨🇴 +57  콜롬비아", code: "+57" },
  { label: "🇵🇪 +51  페루", code: "+51" },
  { label: "🇻🇪 +58  베네수엘라", code: "+58" },
  { label: "🇨🇺 +53  쿠바", code: "+53" },
  { label: "🇪🇨 +593 에콰도르", code: "+593" },
  { label: "🇧🇴 +591 볼리비아", code: "+591" },
  { label: "🇵🇾 +595 파라과이", code: "+595" },
  { label: "🇺🇾 +598 우루과이", code: "+598" },
  { label: "🇨🇷 +506 코스타리카", code: "+506" },
  { label: "🇵🇦 +507 파나마", code: "+507" },
  { label: "🇬🇹 +502 과테말라", code: "+502" },
  { label: "🇭🇳 +504 온두라스", code: "+504" },
  { label: "🇸🇻 +503 엘살바도르", code: "+503" },
  { label: "🇳🇮 +505 니카라과", code: "+505" },
  { label: "🇩🇴 +1   도미니카공화국", code: "+1-DO" },
  { label: "🇯🇲 +1   자메이카", code: "+1-JM" },
  { label: "🇮🇪 +353 아일랜드", code: "+353" },
  { label: "🇮🇸 +354 아이슬란드", code: "+354" },
  { label: "🇱🇺 +352 룩셈부르크", code: "+352" },
  { label: "🇲🇹 +356 몰타", code: "+356" },
  { label: "🇨🇾 +357 키프로스", code: "+357" },
  { label: "🇱🇹 +370 리투아니아", code: "+370" },
  { label: "🇱🇻 +371 라트비아", code: "+371" },
  { label: "🇪🇪 +372 에스토니아", code: "+372" },
  { label: "🇧🇾 +375 벨라루스", code: "+375" },
  { label: "🇲🇩 +373 몰도바", code: "+373" },
  { label: "🇦🇱 +355 알바니아", code: "+355" },
  { label: "🇲🇰 +389 북마케도니아", code: "+389" },
  { label: "🇧🇦 +387 보스니아헤르체고비나", code: "+387" },
  { label: "🇲🇪 +382 몬테네그로", code: "+382" },
  { label: "🇽🇰 +383 코소보", code: "+383" },
  { label: "🇲🇦 +212 모로코", code: "+212" },
  { label: "🇩🇿 +213 알제리", code: "+213" },
  { label: "🇹🇳 +216 튀니지", code: "+216" },
  { label: "🇱🇾 +218 리비아", code: "+218" },
  { label: "🇸🇩 +249 수단", code: "+249" },
  { label: "🇪🇹 +251 에티오피아", code: "+251" },
  { label: "🇹🇿 +255 탄자니아", code: "+255" },
  { label: "🇺🇬 +256 우간다", code: "+256" },
  { label: "🇿🇲 +260 잠비아", code: "+260" },
  { label: "🇿🇼 +263 짐바브웨", code: "+263" },
  { label: "🇲🇿 +258 모잠비크", code: "+258" },
  { label: "🇲🇬 +261 마다가스카르", code: "+261" },
  { label: "🇨🇲 +237 카메룬", code: "+237" },
  { label: "🇨🇮 +225 코트디부아르", code: "+225" },
  { label: "🇸🇳 +221 세네갈", code: "+221" },
  { label: "🇦🇴 +244 앙골라", code: "+244" },
  { label: "🇷🇼 +250 르완다", code: "+250" },
  { label: "🇳🇿 +64  뉴질랜드", code: "+64" },
  { label: "🇫🇯 +679 피지", code: "+679" },
  { label: "🇵🇬 +675 파푸아뉴기니", code: "+675" },
  { label: "🇦🇫 +93  아프가니스탄", code: "+93" },
];

const SPECIALTIES = [
  "상품 기획/제조", "현지 유통/영업", "마케팅/브랜딩",
  "인증/규제", "물류/운영", "이커머스 전략",
  "투자/IR", "사업 전략/GTM", "기타",
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
   Toast 컴포넌트
══════════════════════════════════════════════════ */

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 6000);
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

/* ══════════════════════════════════════════════════
   SearchableDropdown — 국가 검색
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
        <svg className="h-4 w-4 flex-shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl">
          <div className="border-b border-slate-100 p-2">
            <div className="flex items-center gap-2 rounded-md bg-slate-50 px-3 py-2">
              <svg className="h-4 w-4 flex-shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="국가 검색..."
                className="flex-1 bg-transparent text-sm focus:outline-none"
              />
            </div>
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
                    className={`cursor-pointer px-4 py-2.5 text-sm transition hover:bg-blue-50 hover:text-blue-700 ${
                      value === opt ? "bg-blue-50 font-semibold text-blue-700" : "text-slate-700"
                    }`}
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

/* ── PhoneCodeDropdown — 국번 검색 */
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
    p.label.toLowerCase().includes(query.toLowerCase()) ||
    p.code.includes(query)
  );

  const displayLabel = PHONE_CODES.find((p) => p.code === value)?.label ?? value;

  return (
    <div ref={ref} className="relative w-40">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 transition hover:border-blue-400 focus:outline-none"
      >
        <span className="truncate">{displayLabel}</span>
        <svg className="ml-1 h-3.5 w-3.5 flex-shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-72 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl">
          <div className="border-b border-slate-100 p-2">
            <div className="flex items-center gap-2 rounded-md bg-slate-50 px-3 py-2">
              <svg className="h-4 w-4 flex-shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="국가명 또는 국번 검색..."
                className="flex-1 bg-transparent text-sm focus:outline-none"
              />
            </div>
          </div>
          <ul className="max-h-52 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-4 py-2 text-sm text-slate-400">결과 없음</li>
            ) : (
              filtered.map((p) => (
                <li
                  key={p.label}
                  onClick={() => { onChange(p.code); setOpen(false); setQuery(""); }}
                  className={`cursor-pointer px-4 py-2.5 text-sm transition hover:bg-blue-50 hover:text-blue-700 ${
                    value === p.code ? "bg-blue-50 font-semibold text-blue-700" : "text-slate-700"
                  }`}
                >
                  {p.label}
                </li>
              ))
            )}
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
   ProgressBar — 컴포넌트 외부 선언 (re-mount 방지)
══════════════════════════════════════════════════ */

function ProgressBar({ step }: { step: number }) {
  return (
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
}

/* ══════════════════════════════════════════════════
   메인 페이지 컴포넌트
══════════════════════════════════════════════════ */

const SESSION_KEY_STEP = "advisor_register_step";
const SESSION_KEY_FORM = "advisor_register_form";

export default function AdvisorRegisterPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [done, setDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const closeToast = useCallback(() => setToast(""), []);

  /* ── 새로고침 시 sessionStorage에서 복원 */
  useEffect(() => {
    try {
      const savedStep = sessionStorage.getItem(SESSION_KEY_STEP);
      const savedForm = sessionStorage.getItem(SESSION_KEY_FORM);
      if (savedStep) {
        const n = parseInt(savedStep, 10);
        if (n >= 1 && n <= 3) setStep(n);
      }
      if (savedForm) {
        const parsed = JSON.parse(savedForm) as Partial<FormData>;
        setForm((f) => ({ ...f, ...parsed, resumeFile: null }));
      }
    } catch {
      // sessionStorage 파싱 실패 시 기본값 유지
    }
  }, []);

  /* ── step 변경 시 저장 */
  useEffect(() => {
    sessionStorage.setItem(SESSION_KEY_STEP, String(step));
  }, [step]);

  /* ── form 변경 시 저장 (File 제외) */
  useEffect(() => {
    const { resumeFile: _f, ...rest } = form;
    sessionStorage.setItem(SESSION_KEY_FORM, JSON.stringify(rest));
  }, [form]);

  const set = (key: keyof FormData, value: unknown) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleArr = (key: "specialties" | "consultTypes", val: string) =>
    set(
      key,
      (form[key] as string[]).includes(val)
        ? (form[key] as string[]).filter((v) => v !== val)
        : [...(form[key] as string[]), val]
    );

  const handleSubmit = async () => {
    if (!form.agreed) { setToast("약관 동의가 필요합니다."); return; }
    if (form.specialties.length === 0) { setToast("전문 분야를 1개 이상 선택해 주세요."); return; }
    if (form.consultTypes.length === 0) { setToast("자문 가능 형태를 1개 이상 선택해 주세요."); return; }

    setIsSubmitting(true);
    try {
      let resumeUrl: string | null = null;
      if (form.resumeFile) {
        const ext = form.resumeFile.name.split(".").pop() ?? "bin";
        const filePath = `resumes/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("advisors")
          .upload(filePath, form.resumeFile, { cacheControl: "3600", upsert: false });
        if (uploadError) {
          console.error("[advisors] 파일 업로드 오류:", uploadError);
          setToast("이력서 업로드에 실패했습니다. 파일을 확인하고 다시 시도해 주세요.");
          setIsSubmitting(false);
          return;
        }
        const { data: urlData } = supabase.storage.from("advisors").getPublicUrl(filePath);
        resumeUrl = urlData.publicUrl;
      }

      const res = await fetch("/api/advisors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.fullName.trim(),
          email: form.email.trim(),
          phone: `${form.phoneCode} ${form.phone.trim()}`,
          residence_country: form.country,
          linkedin_url: form.linkedinUrl.trim(),
          experience_summary: form.careerSummary.trim(),
          expert_fields: form.specialties,
          consulting_types: form.consultTypes,
          desired_fee: form.desiredFee.trim(),
          resume_url: resumeUrl,
        }),
      });

      if (!res.ok) {
        const json = (await res.json()) as { error?: string; missingFields?: string[] };
        const msg = json.error ?? "저장에 실패했습니다. 다시 시도해 주세요.";
        console.error("[advisors] 등록 오류:", json);
        setToast(msg);
        return;
      }

      sessionStorage.removeItem(SESSION_KEY_STEP);
      sessionStorage.removeItem(SESSION_KEY_FORM);
      setDone(true);
    } catch (err) {
      console.error("[advisors] 네트워크 오류:", err);
      setToast("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

        <ProgressBar step={step} />

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
                    placeholder="국가를 선택하거나 검색하세요"
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
                onClick={() => {
                  if (!form.fullName || !form.email || !form.country || !form.phone) {
                    setToast("성함, 이메일, 거주 국가, 연락처를 모두 입력해 주세요.");
                    return;
                  }
                  setStep(2);
                }}
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
                onClick={() => {
                  if (!form.careerSummary.trim()) {
                    setToast("경력 및 전문성 소개를 작성해 주세요.");
                    return;
                  }
                  setStep(3);
                }}
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
              {/* 전문 분야 — 버튼 클릭 영역 개선 */}
              <div>
                <label className={labelCls}>
                  전문 분야 <span className="text-red-500">*</span>{" "}
                  <span className="font-normal text-slate-400">(중복 선택 가능)</span>
                </label>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {SPECIALTIES.map((s) => {
                    const selected = form.specialties.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleArr("specialties", s)}
                        className={`min-h-[44px] cursor-pointer select-none rounded-full border px-5 py-2.5 text-sm font-medium transition-all active:scale-95 ${
                          selected
                            ? "border-blue-700 bg-blue-700 text-white shadow-md ring-2 ring-blue-300"
                            : "border-slate-200 bg-white text-slate-600 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
                        }`}
                      >
                        {selected && (
                          <span className="mr-1.5">✓</span>
                        )}
                        {s}
                      </button>
                    );
                  })}
                </div>
                {form.specialties.length > 0 && (
                  <p className="mt-2 text-xs text-blue-600">
                    선택됨: {form.specialties.join(", ")}
                  </p>
                )}
              </div>

              {/* 자문 형태 */}
              <div>
                <label className={labelCls}>
                  자문 가능 형태 <span className="text-red-500">*</span>{" "}
                  <span className="font-normal text-slate-400">(중복 선택 가능)</span>
                </label>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {CONSULT_TYPES.map((t) => {
                    const selected = form.consultTypes.includes(t);
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => toggleArr("consultTypes", t)}
                        className={`min-h-[44px] cursor-pointer select-none rounded-full border px-5 py-2.5 text-sm font-medium transition-all active:scale-95 ${
                          selected
                            ? "border-blue-700 bg-blue-700 text-white shadow-md ring-2 ring-blue-300"
                            : "border-slate-200 bg-white text-slate-600 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
                        }`}
                      >
                        {selected && (
                          <span className="mr-1.5">✓</span>
                        )}
                        {t}
                      </button>
                    );
                  })}
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
                disabled={isSubmitting || !form.agreed || form.specialties.length === 0 || form.consultTypes.length === 0}
                className="flex-1 rounded-lg bg-blue-700 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "저장 중..." : "저장 및 완료"}
              </button>
            </div>
          </div>
        )}

      </div>

      {toast && <Toast message={toast} onClose={closeToast} />}
    </main>
  );
}
