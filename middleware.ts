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
