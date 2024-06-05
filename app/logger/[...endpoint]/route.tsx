import { NextRequest, NextResponse } from "next/server";

function paramsToObject(entries: IterableIterator<[string, string]>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = {};
  for (const [key, value] of entries) {
    result[key] = value;
  }
  return result;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = parseInt(searchParams.get("status") ?? "201");
  searchParams.delete("status");

  return new NextResponse(`PARAMS : ${JSON.stringify(paramsToObject(searchParams.entries()))}`, {
    status,
  });
}
