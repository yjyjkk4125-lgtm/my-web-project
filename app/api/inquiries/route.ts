import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

type InquiryBody = {
  last_name?: string;
  first_name?: string;
  company?: string;
  email?: string;
  phone?: string;
  department?: string;
  position?: string;
  main_task?: string;
  experience?: string;
};

function trimStr(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    console.error(
      "api/inquiries: NEXT_PUBLIC_SUPABASE_URL 또는 SUPABASE_SERVICE_ROLE_KEY가 설정되지 않았습니다."
    );
    return NextResponse.json(
      {
        error:
          "서버 설정 오류입니다. Vercel(또는 배포 환경)에 SUPABASE_SERVICE_ROLE_KEY를 추가해 주세요. Supabase 대시보드 → Settings → API → service_role 키입니다.",
      },
      { status: 500 }
    );
  }

  let body: InquiryBody;
  try {
    body = (await request.json()) as InquiryBody;
  } catch {
    return NextResponse.json({ error: "잘못된 요청 본문입니다." }, { status: 400 });
  }

  const firstName = trimStr(body.first_name, 200);
  const experience = trimStr(body.experience, 2000);
  const emailVal = trimStr(body.email, 320);
  const phoneVal = trimStr(body.phone, 100);

  if (!firstName) {
    return NextResponse.json({ error: "성함을 입력해 주세요.", missingFields: ["first_name"] }, { status: 400 });
  }
  if (!experience) {
    return NextResponse.json({ error: "문제 내용을 입력해 주세요.", missingFields: ["experience"] }, { status: 400 });
  }
  if (!emailVal && !phoneVal) {
    return NextResponse.json(
      { error: "이메일 또는 전화번호를 입력해 주세요.", missingFields: ["email", "phone"] },
      { status: 400 }
    );
  }

  const row = {
    last_name: trimStr(body.last_name, 200),
    first_name: firstName,
    company: trimStr(body.company, 500),
    email: emailVal,
    phone: phoneVal,
    position: trimStr(body.position, 500),
    main_task: trimStr(body.main_task, 1000),
    experience,
  };

  const admin = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await admin.from("inquiries").insert([row]).select();

  if (error) {
    console.error("api/inquiries Supabase insert error:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: 400 }
    );
  }

  console.log("api/inquiries insert success, id:", data?.[0]);
  return NextResponse.json({ data }, { status: 201 });
}
