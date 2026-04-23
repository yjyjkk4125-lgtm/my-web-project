import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#faf5f5] px-6 py-10">
      <div className="mx-auto max-w-7xl space-y-2 text-[11px] text-slate-500">
        <p>상호: 비아로컬(VIALOCAL)&nbsp;&nbsp;|&nbsp;&nbsp;대표자: 김연준</p>
        <p>
          사업자등록번호: 369-26-01820&nbsp;&nbsp;|&nbsp;&nbsp;주소: 대전광역시 유성구&nbsp;&nbsp;|&nbsp;&nbsp;Email: yjyjkk4125@gmail.com
        </p>
        <p className="flex gap-3">
          <Link href="#" className="hover:text-slate-700">개인정보처리방침</Link>
          <span>|</span>
          <Link href="#" className="hover:text-slate-700">이용약관</Link>
          <span>|</span>
          <Link href="#" className="hover:text-slate-700">사업자정보확인</Link>
        </p>
        <p className="pt-4">Copyright ⓒ 2026 VIALOCAL. All rights reserved.</p>
      </div>
    </footer>
  );
}
