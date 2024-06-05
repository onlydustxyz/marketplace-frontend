import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = parseInt(searchParams.get("status") ?? "201");
  searchParams.delete("status");
  return new NextResponse(request.body, {
    status,
  });
}
