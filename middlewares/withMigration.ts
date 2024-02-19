import { cookies, headers } from "next/headers";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

import { MiddlewareFactory } from "./type";

export const withMigration: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    if (request.nextUrl.pathname.startsWith("/migration")) {
      const headersList = headers();
      const cookieStore = cookies();
      const isLog = cookieStore.get(`auth0.${process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}.is.authenticated`);
      console.log("headersList", cookieStore);
      console.log("isLog", isLog);
      if (process.env.NEXT_PUBLIC_ALLOW_MIGRATION_FOLDER !== "true") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    return next(request, _next);
  };
};
