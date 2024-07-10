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

  const doFetch = await fetch(
    `https://${process.env.NEXT_PUBLIC_ONLYDUST_API_BASEPATH}${request.nextUrl.pathname.replace(proxyUrl, "")}${
      request.nextUrl.search
    }`,
    {
      ...request,
      body: request.body && (await request.blob()),
      headers,
      method: request.method,
    }
  ).then(res => res.json());

  return NextResponse.json(doFetch);
}
