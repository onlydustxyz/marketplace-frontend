import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

import { MiddlewareFactory } from "./type";

const paths = ["/migration"];
export const withMigration: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const find = paths.find(path => request.nextUrl.pathname.startsWith(path));
    if (find) {
      if (process.env.NEXT_PUBLIC_ALLOW_MIGRATION_FOLDER !== "true") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    return next(request, _next);
  };
};
