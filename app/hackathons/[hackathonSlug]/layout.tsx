import { PropsWithChildren } from "react";

import { Container } from "components/layout/container/container";
import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";

export default function HackathonLayout({ children }: PropsWithChildren) {
  return (
    <ScrollView className="overflow-x-hidden">
      <Container>{children}</Container>
    </ScrollView>
  );
}
