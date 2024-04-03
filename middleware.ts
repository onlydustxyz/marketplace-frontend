import { withMigration } from "middlewares/withMigration";
import { NextRequest, NextResponse } from "next/server";
import { isInMaintenanceMode } from "utils/maintenance/maintenance";

import { NEXT_ROUTER } from "constants/router";

function middleware(req: NextRequest) {
  const { inMaintenance } = isInMaintenanceMode();

  if (inMaintenance) {
    req.nextUrl.pathname = NEXT_ROUTER.maintenance;

    return NextResponse.rewrite(req.nextUrl);
  }

  return NextResponse.next();
}
export default withMigration(middleware);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
