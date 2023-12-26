import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  /** add a middleware to redirect to the root if the user tries to access the migration folder */
  if (request.nextUrl.pathname.startsWith("/migration")) {
    if (process.env.NEXT_PUBLIC_ALLOW_MIGRATION_FOLDER !== "true") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}
