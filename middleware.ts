import { withMigration } from "middlewares/withMigration";
import { NextResponse } from "next/server";

function middleware() {
  return NextResponse.next();
}
export default withMigration(middleware);

// check if cookie exist before fecth /me
// if cookie exist and project is not in list -> fetch /me to check if have auth
// else fetch /me to check if have auth
