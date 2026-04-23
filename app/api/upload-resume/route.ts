import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const MAX_SIZE = 20 * 1024 * 1024; // 20 MB
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    return NextResponse.json(
      { error: "서버 설정 오류입니다. 관리자에게 문의해 주세요." },
      { status: 500 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "파일 파싱 오류입니다." }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) {
    return NextResponse.json({ error: "파일이 없습니다." }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "파일이 너무 큽니다 (최대 20MB)" },
      { status: 400 }
    );
  }

  const mimeType = file.type || "application/octet-stream";
  if (!ALLOWED_TYPES.includes(mimeType)) {
    return NextResponse.json(
      { error: "PDF 또는 Word 파일(.pdf, .doc, .docx)만 업로드 가능합니다." },
      { status: 400 }
    );
  }

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
  const filePath = `resumes/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;

  const admin = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const { error: uploadError } = await admin.storage
    .from("advisors")
    .upload(filePath, buffer, {
      contentType: mimeType,
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    console.error("[upload-resume] Supabase 업로드 오류:", {
      message: uploadError.message,
      name: uploadError.name,
    });
    return NextResponse.json(
      { error: `파일 업로드에 실패했습니다: ${uploadError.message}` },
      { status: 400 }
    );
  }

  const { data: urlData } = admin.storage.from("advisors").getPublicUrl(filePath);

  return NextResponse.json({ url: urlData.publicUrl }, { status: 200 });
}
