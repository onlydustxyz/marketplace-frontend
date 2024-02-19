import { getSession } from "@auth0/nextjs-auth0/edge";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

import { MiddlewareFactory } from "./type";

export const withAuthRequired: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const res = NextResponse.next();
    const user = await getSession(request, res);

    if (user) {
      console.log("user");
    }

    return next(request, _next);
  };
};
