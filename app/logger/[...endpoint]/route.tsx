import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url") ?? "";
  const status = parseInt(searchParams.get("status") ?? "201");
  console.info("Endpoint url :", { url });
  return new NextResponse(request.body, {
    status,
  });
}
