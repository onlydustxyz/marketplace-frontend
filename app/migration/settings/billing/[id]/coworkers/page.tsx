"use client";

import React from "react";

import { useStackBillingInviteTeamMember } from "src/App/Stacks/Stacks";

function CoworkersPage() {
  const [openStackBillingInviteTeamMember] = useStackBillingInviteTeamMember();

  function handleClick() {
    openStackBillingInviteTeamMember();
  }

  return <button onClick={handleClick}>Invite team member</button>;
}

export default CoworkersPage;
