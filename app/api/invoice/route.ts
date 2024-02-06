import { MeActions } from "actions/me/me.actions";

export async function GET() {
  const res = await MeActions.queries.retrieveRewardsPendingInvoices();

  return Response.json({ res });
}
