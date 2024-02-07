import { Tab } from "./tab/tab";
import { TTabs } from "./tabs.types";

// with border
// mobile version
export function Tabs({ tabs, tab }: TTabs.Props) {
  return (
    <div>
      {tabs.map((t, key) => (
        <Tab key={key} {...(tab || {})} {...t} />
      ))}
    </div>
  );
}
