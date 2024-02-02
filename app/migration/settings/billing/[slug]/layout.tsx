"use client";

import React, { PropsWithChildren } from "react";

function BillingLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <header>Header</header>
      <div>
        <div>tabs 1</div>
        <div>tabs 2</div>
        <div>tabs 3</div>
      </div>
      <section>{children}</section>
    </div>
  );
}

export default BillingLayout;
