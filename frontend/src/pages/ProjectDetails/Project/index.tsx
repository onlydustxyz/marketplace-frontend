import { PropsWithChildren } from "react";
import Card from "src/components/Card";
import ProjectInformation from "src/components/ProjectInformation";

interface ProjectProps extends PropsWithChildren {
  name: string;
  details?: {
    description: string;
    telegramLink: string;
  };
  budget?: {
    remainingAmount: number;
    initialAmount: number;
  };
}

export default function Project({ name, details, budget, children }: ProjectProps) {
  return (
    <Card>
      <div className="flex flex-col divide-white divide-solid divide-y-2 w-full items-center">
        <div className="pb-5">
          <ProjectInformation name={name} budget={budget} details={details} />
        </div>
        <div className="flex flex-row align-start pt-5 space-x-3">{children}</div>
      </div>
    </Card>
  );
}
