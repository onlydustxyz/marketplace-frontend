import { getAccessToken } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

const proxyUrl = "/api/proxy";

export const GET = apiProxy;
export const PUT = apiProxy;

async function apiProxy(request: NextRequest): Promise<Response> {
  let accessToken;
  try {
    const accessTokenResult = await getAccessToken(request, new NextResponse());
    accessToken = accessTokenResult.accessToken;
  } catch {
    //
  }

  const headers = new Headers(request.headers);

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  console.log("BASE PATH", process.env.NEXT_PUBLIC_ONLYDUST_API_BASEPATH);
  console.log("PATHNAME", request.nextUrl.pathname);
  console.log("SEARCH", request.nextUrl.search);
  console.log("headers", accessToken);
  return fetch(
    `https://${process.env.NEXT_PUBLIC_ONLYDUST_API_BASEPATH}${request.nextUrl.pathname.replace(proxyUrl, "")}${
      request.nextUrl.search
    }`,
    {
      ...request,
      body: request.body && (await request.blob()),
      headers,
      method: request.method,
    }
  );
}
