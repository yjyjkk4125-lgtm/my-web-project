import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

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

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "잘못된 요청 본문입니다." }, { status: 400 });
  }

  const resumeUrl = typeof body.resume_url === "string" && body.resume_url.trim() ? body.resume_url.trim() : null;

  const row: Record<string, unknown> = {
    name: trimStr(body.name, 200),
    email: trimStr(body.email, 320),
    phone: trimStr(body.phone, 100),
    residence_country: trimStr(body.residence_country, 200),
    linkedin_url: trimStr(body.linkedin_url, 500),
    experience_summary: trimStr(body.experience_summary, 5000),
    expert_fields: Array.isArray(body.expert_fields) ? body.expert_fields as string[] : [],
    consulting_types: Array.isArray(body.consulting_types) ? body.consulting_types as string[] : [],
    desired_fee: trimStr(body.desired_fee, 100),
  };
  if (resumeUrl) row.resume_url = resumeUrl;

  const missing: string[] = [];
  if (!row.name) missing.push("name");
  if (!row.email) missing.push("email");
  if (!row.phone) missing.push("phone");
  if (!row.residence_country) missing.push("residence_country");
  if (!row.experience_summary) missing.push("experience_summary");
  if (row.expert_fields.length === 0) missing.push("expert_fields");
  if (row.consulting_types.length === 0) missing.push("consulting_types");

  if (missing.length > 0) {
    return NextResponse.json(
      { error: "필수 항목이 비어 있습니다.", missingFields: missing },
      { status: 400 }
    );
  }

  const admin = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await admin.from("advisors").insert([row]).select();

  if (error) {
    console.error("api/advisors Supabase error:", error);
    return NextResponse.json({ error: error.message, code: error.code }, { status: 400 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
