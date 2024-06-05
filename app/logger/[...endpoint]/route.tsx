import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = parseInt(searchParams.get("status") ?? "201");
  return new NextResponse(request.body, {
    status,
  });
}

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = parseInt(searchParams.get("status") ?? "201");
  return new NextResponse(request.body, {
    status,
  });
}

export async function PATCH(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = parseInt(searchParams.get("status") ?? "201");
  return new NextResponse(request.body, {
    status,
  });
}

export async function PUT(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = parseInt(searchParams.get("status") ?? "201");
  return new NextResponse(request.body, {
    status,
  });
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = parseInt(searchParams.get("status") ?? "201");
  return new NextResponse(request.body, {
    status,
  });
}
