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

const navLinks = [
  { label: "클라이언트", href: "/clients" },
  { label: "자문위원", href: "/advisor" },
  { label: "VIALOCAL 소개", href: "/about" },
];

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const { openModal } = useModal();
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleDropdownEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    closeTimeout.current = setTimeout(() => setDropdownOpen(false), 250);
  };

  const handleModalOpen = () => {
    setDropdownOpen(false);
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
          {/* 지원 영역 드롭다운 */}
          <div
            className="relative"
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <button className="flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900">
              지원 영역
              <svg
                className={`h-4 w-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* 드롭다운 패널 — pt-2로 버튼과의 간격을 투명 히트박스로 채움 */}
            <div className="absolute left-0 top-full pt-2">
              <div
                className={`w-52 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg transition-all duration-200 ${
                  dropdownOpen
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

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* 문의하기 버튼 (데스크톱) */}
        <button
          onClick={handleModalOpen}
          className="hidden rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 md:inline-block"
        >
          문의하기
        </button>

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
            onClick={() => setMobileDropdownOpen((prev) => !prev)}
          >
            지원 영역
            <svg
              className={`h-4 w-4 transition-transform duration-200 ${mobileDropdownOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {mobileDropdownOpen && (
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

          <button
            onClick={handleModalOpen}
            className="mt-3 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-800"
          >
            문의하기
          </button>
        </nav>
      )}
    </header>
  );
}
