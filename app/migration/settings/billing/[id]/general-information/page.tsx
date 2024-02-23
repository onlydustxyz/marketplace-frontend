"use client";

import { useParams } from "next/navigation";

import { useBillingProfileById } from "hooks/billings-profiles/use-billing-profile/use-billing-profile";

function InformationsPage() {
  const { id } = useParams<{ id: string }>();
  const { profile } = useBillingProfileById({ id });
  return <div>InformationsPage, {profile?.data?.name}</div>;
}

export default InformationsPage;
