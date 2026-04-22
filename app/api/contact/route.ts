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

  const admin = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const type = body.type === "advisor" ? "advisor" : "client";

  if (type === "client") {
    const row = {
      first_name: trimStr(body.first_name, 200),
      last_name: trimStr(body.last_name, 200),
      brand_name: trimStr(body.brand_name, 500),
      phone: trimStr(body.phone, 100),
      email: trimStr(body.email, 320),
      message: trimStr(body.message, 3000),
      marketing_consent: !!body.marketing_consent,
    };

    const missing = (Object.entries(row) as [string, unknown][])
      .filter(([k, v]) => k !== "marketing_consent" && !v)
      .map(([k]) => k);

    if (missing.length > 0) {
      return NextResponse.json(
        { error: "필수 항목이 비어 있습니다.", missingFields: missing },
        { status: 400 }
      );
    }

    const { data, error } = await admin.from("client_inquiries").insert([row]).select();
    if (error) {
      console.error("api/contact → client_inquiries error:", error);
      return NextResponse.json({ error: error.message, code: error.code }, { status: 400 });
    }
    return NextResponse.json({ data }, { status: 201 });
  } else {
    const row = {
      first_name: trimStr(body.first_name, 200),
      last_name: trimStr(body.last_name, 200),
      phone: trimStr(body.phone, 100),
      email: trimStr(body.email, 320),
      subject: trimStr(body.subject, 500),
      message: trimStr(body.message, 3000),
      marketing_consent: !!body.marketing_consent,
    };

    const missing = (Object.entries(row) as [string, unknown][])
      .filter(([k, v]) => k !== "marketing_consent" && !v)
      .map(([k]) => k);

    if (missing.length > 0) {
      return NextResponse.json(
        { error: "필수 항목이 비어 있습니다.", missingFields: missing },
        { status: 400 }
      );
    }

    const { data, error } = await admin.from("advisor_inquiries").insert([row]).select();
    if (error) {
      console.error("api/contact → advisor_inquiries error:", error);
      return NextResponse.json({ error: error.message, code: error.code }, { status: 400 });
    }
    return NextResponse.json({ data }, { status: 201 });
  }
}
