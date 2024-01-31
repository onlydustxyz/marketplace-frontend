import { ComponentProps } from "react";

import View from "./View";

export default function FilterPanel(props: ComponentProps<typeof View>) {
  return <View {...props} />;
}
