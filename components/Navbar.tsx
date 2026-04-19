"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useModal } from "@/context/ModalContext";

const supportItems = [
  { label: "서비스 개요", href: "/services/overview", modal: false },
  { label: "VIALOCAL 시작하기", href: "/services/getting-started", modal: false },
  { label: "VIALOCAL 차별화", href: "/services/differentiation", modal: false },
  { label: "전화 자문", href: "/services/call-consulting", modal: true },
];

const faqItems = [
  { label: "클라이언트용", href: "/faq/client" },
  { label: "자문위원용", href: "/faq/advisor" },
  { label: "공통 FAQ", href: "/faq/common" },
];

const navLinks = [
  { label: "클라이언트", href: "/clients" },
  { label: "자문위원", href: "/advisor" },
  { label: "VIALOCAL 소개", href: "/about" },
];

export default function Navbar() {
  const [supportOpen, setSupportOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSupportOpen, setMobileSupportOpen] = useState(false);
  const [mobileFaqOpen, setMobileFaqOpen] = useState(false);
  const { openModal } = useModal();

  const supportCloseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const faqCloseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* 지원 영역 드롭다운 핸들러 */
  const handleSupportEnter = () => {
    if (supportCloseTimeout.current) clearTimeout(supportCloseTimeout.current);
    setSupportOpen(true);
  };
  const handleSupportLeave = () => {
    supportCloseTimeout.current = setTimeout(() => setSupportOpen(false), 250);
  };

  /* FAQ 드롭다운 핸들러 */
  const handleFaqEnter = () => {
    if (faqCloseTimeout.current) clearTimeout(faqCloseTimeout.current);
    setFaqOpen(true);
  };
  const handleFaqLeave = () => {
    faqCloseTimeout.current = setTimeout(() => setFaqOpen(false), 250);
  };

  const handleModalOpen = () => {
    setSupportOpen(false);
    setFaqOpen(false);
    setMobileOpen(false);
    openModal();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* 로고 */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-slate-900 hover:text-blue-700"
        >
          VIALOCAL
        </Link>

        {/* 데스크톱 메뉴 */}
        <nav className="hidden items-center gap-1 md:flex">
          {/* 지원 영역 드롭다운 — onMouseEnter는 버튼에만, onMouseLeave는 래퍼에 */}
          <div className="relative" onMouseLeave={handleSupportLeave}>
            <button
              className="flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
              onMouseEnter={handleSupportEnter}
            >
              지원 영역
              <svg
                className={`h-4 w-4 transition-transform duration-200 ${supportOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* pt-2 브릿지로 버튼~패널 사이 투명 히트박스 확보 */}
            <div className="absolute left-0 top-full pt-2">
              <div
                className={`w-52 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg transition-all duration-200 ${
                  supportOpen
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-1 opacity-0"
                }`}
              >
                <ul className="py-1">
                  {supportItems.map((item) =>
                    item.modal ? (
                      <li key={item.label}>
                        <button
                          onClick={handleModalOpen}
                          className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                        >
                          {item.label}
                          <span className="ml-auto rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700">
                            문의
                          </span>
                        </button>
                      </li>
                    ) : (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="block px-4 py-2.5 text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                        >
                          {item.label}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* 일반 링크: 클라이언트, 자문위원, VIALOCAL 소개 */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}

          {/* FAQ 드롭다운 — VIALOCAL 소개 바로 옆 */}
          <div className="relative" onMouseLeave={handleFaqLeave}>
            <button
              className="flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
              onMouseEnter={handleFaqEnter}
            >
              FAQ
              <svg
                className={`h-4 w-4 transition-transform duration-200 ${faqOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className="absolute left-0 top-full pt-2">
              <div
                className={`w-44 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg transition-all duration-200 ${
                  faqOpen
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-1 opacity-0"
                }`}
              >
                <ul className="py-1">
                  {faqItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </nav>

        {/* 버튼 그룹 (데스크톱): 로그인 + 문의하기 */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/login"
            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
          >
            로그인
          </Link>
          <button
            onClick={handleModalOpen}
            className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            문의하기
          </button>
        </div>

        {/* 모바일 햄버거 버튼 */}
        <button
          className="rounded-md p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="메뉴 열기"
        >
          {mobileOpen ? (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {mobileOpen && (
        <nav className="border-t border-slate-200 bg-white px-6 pb-4 md:hidden">
          {/* 지원 영역 */}
          <button
            className="flex w-full items-center justify-between py-3 text-sm font-medium text-slate-700"
            onClick={() => setMobileSupportOpen((prev) => !prev)}
          >
            지원 영역
            <svg
              className={`h-4 w-4 transition-transform duration-200 ${mobileSupportOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {mobileSupportOpen && (
            <ul className="mb-2 ml-4 space-y-1 border-l-2 border-blue-100 pl-3">
              {supportItems.map((item) =>
                item.modal ? (
                  <li key={item.label}>
                    <button
                      onClick={handleModalOpen}
                      className="flex w-full items-center gap-2 py-2 text-left text-sm text-slate-600 hover:text-blue-700"
                    >
                      {item.label}
                      <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700">
                        문의
                      </span>
                    </button>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 text-sm text-slate-600 hover:text-blue-700"
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          )}

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm font-medium text-slate-700 hover:text-blue-700"
            >
              {link.label}
            </Link>
          ))}

          {/* FAQ */}
          <button
            className="flex w-full items-center justify-between py-3 text-sm font-medium text-slate-700"
            onClick={() => setMobileFaqOpen((prev) => !prev)}
          >
            FAQ
            <svg
              className={`h-4 w-4 transition-transform duration-200 ${mobileFaqOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {mobileFaqOpen && (
            <ul className="mb-2 ml-4 space-y-1 border-l-2 border-blue-100 pl-3">
              {faqItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2 text-sm text-slate-600 hover:text-blue-700"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* 로그인 + 문의하기 */}
          <div className="mt-3 flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="w-full rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-center text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              로그인
            </Link>
            <button
              onClick={handleModalOpen}
              className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-800"
            >
              문의하기
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
