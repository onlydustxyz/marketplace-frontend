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
