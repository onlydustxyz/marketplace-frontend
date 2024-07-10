import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

const withApiAuth = withApiAuthRequired(async function getAccessTokenRoute(request) {
  const { accessToken } = await getAccessToken(request, new NextResponse());

  return NextResponse.json({ accessToken }, { status: 200 });
});

export const GET = withApiAuth;
