import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

type ContactBody = {
  type?: "client" | "advisor";
  first_name?: string;
  last_name?: string;
  company?: string;
  phone?: string;
  email?: string;
  subject?: string;
  message?: string;
};

function trimStr(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    return NextResponse.json(
      { error: "서버 설정 오류입니다. 관리자에게 문의해 주세요." },
      { status: 500 }
    );
  }

  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "잘못된 요청 본문입니다." }, { status: 400 });
  }

  const type = body.type === "advisor" ? "advisor" : "client";

  const commonFields = {
    type,
    first_name: trimStr(body.first_name, 200),
    last_name: trimStr(body.last_name, 200),
    phone: trimStr(body.phone, 100),
    email: trimStr(body.email, 320),
    message: trimStr(body.message, 3000),
  };

  const missing: string[] = [];
  if (!commonFields.first_name) missing.push("first_name");
  if (!commonFields.last_name) missing.push("last_name");
  if (!commonFields.phone) missing.push("phone");
  if (!commonFields.email) missing.push("email");
  if (!commonFields.message) missing.push("message");

  const row =
    type === "client"
      ? {
          ...commonFields,
          company: trimStr(body.company, 500),
          subject: null,
        }
      : {
          ...commonFields,
          company: null,
          subject: trimStr(body.subject, 500),
        };

  if (type === "client" && !row.company) missing.push("company");
  if (type === "advisor" && !row.subject) missing.push("subject");

  if (missing.length > 0) {
    return NextResponse.json(
      { error: "필수 항목이 비어 있습니다.", missingFields: missing },
      { status: 400 }
    );
  }

  const admin = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await admin.from("contacts").insert([row]).select();

  if (error) {
    console.error("api/contact Supabase error:", error);
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: 400 }
    );
  }

  return NextResponse.json({ data }, { status: 201 });
}
