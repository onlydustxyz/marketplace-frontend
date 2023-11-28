import View from "./View";
import { ComponentProps } from "react";

export default function FilterPanel(props: ComponentProps<typeof View>) {
  return <View {...props} />;
}
