import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  /** add a middleware to redirect to the root if the user tries to access the migration folder */
  if (request.nextUrl.pathname.startsWith("/migration")) {
    if (process.env.NEXT_PUBLIC_ALLOW_MIGRATION_FOLDER !== "true") {
      console.log("REDIRECT USER TO HOME");
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}
// middleware.js
import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";

export default withMiddlewareAuthRequired();

export const config = {
  matcher: [
    "/auth0-sample/:path*",
    "/rewards",
    "/contributions",
    "/p/create",
    "/p/:path*/rewards",
    "/p/:path*/rewards/new",
    "/p/:path*/insights",
  ],
};
