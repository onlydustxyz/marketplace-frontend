import { PropsWithChildren } from "react";

export default function V2Layout({ children }: PropsWithChildren) {
  return (
    <main>
      <nav>TEXT NAV</nav>
      {children}
    </main>
  );
}
