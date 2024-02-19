import { withMigration } from "middlewares/withMigration";
import { NextResponse } from "next/server";

function middleware() {
  return NextResponse.next();
}
export default withMigration(middleware);
