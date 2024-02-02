import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  /** add a middleware to redirect to the root if the user tries to access the migration folder */
  if (request.nextUrl.pathname.startsWith("/migration")) {
    if (process.env.NEXT_PUBLIC_ALLOW_MIGRATION_FOLDER !== "true") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);

  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });

  return response;
}
