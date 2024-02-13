"use client";

import React from "react";

import { useStackMandate } from "src/App/Stacks/Stacks";

function Page() {
  const [open] = useStackMandate();
  return <button onClick={open}>test</button>;
}

export default Page;
