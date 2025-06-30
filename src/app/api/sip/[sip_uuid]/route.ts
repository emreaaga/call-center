import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BASE = "https://app.robotcall.uz/api/sip";

export async function GET(
  req: NextRequest,
  { params }: { params: { sip_uuid: string } }
) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }

  const res = await fetch(`${BASE}/${params.sip_uuid}`, {
    headers: {
      Accept:        "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const body = await res.json();
  return NextResponse.json(body, { status: res.status });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { sip_uuid: string } }
) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }

  const payload = await req.json();
  const res = await fetch(`${BASE}/${params.sip_uuid}`, {
    method: "PUT",
    headers: {
      "Content-Type":  "application/json",
      Authorization:   `Bearer ${token}`,
      Accept:          "application/json",
    },
    body: JSON.stringify(payload),
  });
  const body = await res.json();
  return NextResponse.json(body, { status: res.status });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { sip_uuid: string } }
) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }

  const res = await fetch(`${BASE}/${params.sip_uuid}`, {
    method: "DELETE",
    headers: {
      Accept:        "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const body = await res.json();
  return NextResponse.json(body, { status: res.status });
}
