// middleware.js
import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";

export default withMiddlewareAuthRequired();

export const config = {
  matcher: ["/auth0-sample/:path*", "/rewards/:path*"],
};
