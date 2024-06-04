import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  // const url = searchParams.get("url") ?? "";
  const status = parseInt(searchParams.get("status") ?? "201");
  return new NextResponse(request.body, {
    status,
  });
}
