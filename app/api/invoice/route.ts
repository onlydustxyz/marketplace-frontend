import { MeActions } from "actions/me/me.actions";

export async function GET({ accessToken }: { accessToken: string }) {
  const res = await MeActions.queries.retrieveRewardsPendingInvoices({ accessToken });

  return Response.json({ res });
}
