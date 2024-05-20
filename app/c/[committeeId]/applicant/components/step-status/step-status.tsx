import IssueDraft from "src/assets/icons/IssueDraft";
import IssueOpen from "src/assets/icons/IssueOpen";
import { cn } from "src/utils/cn";

import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { Key } from "hooks/translate/use-translate";

interface Props {
  status: "completed" | "active" | "pending";
  token: Key;
}

export function StepStatus({ status, token }: Props) {
  function renderIcon() {
    if (status === "completed") {
      return <Icon remixName={"ri-checkbox-circle-line"} size={16} className={"text-github-green"} />;
    }

    if (status === "active") {
      return <IssueOpen className={"h-3.5 w-3.5 fill-github-purple"} />;
    }

    if (status === "pending") {
      return <IssueDraft className={"h-3.5 w-3.5 fill-greyscale-500"} />;
    }

    return null;
  }

  return (
    <div
      className={cn("flex items-center gap-1 rounded-full px-1 py-0.5", {
        "border border-github-purple": status === "active",
      })}
    >
      {renderIcon()}
      <Typography
        variant={"body-s"}
        translate={{ token }}
        className={cn("leading-none", {
          "text-github-green-light": status === "completed",
          "text-github-purple-light": status === "active",
          "text-greyscale-400": status === "pending",
        })}
      />
    </div>
  );
}
