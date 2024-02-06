import { MeActions } from "actions/me/me.actions";
import { headers } from "next/headers";
import { ImageResponse } from "next/og";
import { CSSProperties } from "react";

export const runtime = "edge";

export const alt = "Invoice generator";
export const size = {
  width: 2480,
  height: 3508,
};
export const contentType = "image/png";

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    background: "white",
    color: "#000",
  },
};

export async function GET() {
  const headersList = headers();

  const token = headersList.get("authorization");

  const { rewards } = await MeActions.queries.retrieveRewardsPendingInvoices({ accessToken: token ?? "" });

  return new ImageResponse(<div style={styles["container"]}>coucou</div>);

  // return Response.json(res);
}
