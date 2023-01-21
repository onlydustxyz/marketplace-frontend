import Card from "src/components/Card";
import ProjectInformation from "src/components/ProjectInformation";
import { useIntl } from "src/hooks/useIntl";
import { Project } from "src/pages/Projects";

type ProjectCardProps = Project;

export default function ProjectCard({
  pendingInvitations,
  name,
  projectDetails,
  githubRepo,
  projectLeads,
  totalSpentAmountInUsd,
}: ProjectCardProps) {
  const { T } = useIntl();
  return (
    <Card
      selectable={true}
      className={`bg-noise-light hover:bg-right ${
        pendingInvitations?.length > 0 ? "bg-amber-700/20" : "bg-white/[0.02] hover:bg-white/[0.04]"
      } `}
      dataTestId="project-card"
    >
      <div className="flex flex-col gap-5">
        <ProjectInformation
          name={name}
          details={{
            description: projectDetails?.description,
            telegramLink: projectDetails?.telegramLink,
            logoUrl: projectDetails?.logoUrl || githubRepo?.content?.logoUrl,
          }}
          lead={projectLeads?.[0]?.user}
          githubRepoInfo={{
            owner: githubRepo?.owner,
            name: githubRepo?.name,
            contributors: githubRepo?.content?.contributors,
            languages: githubRepo?.languages,
          }}
          totalSpentAmountInUsd={totalSpentAmountInUsd}
        />
        {pendingInvitations?.length > 0 && (
          <div className="flex flex-row justify-between items-center font-medium p-5 text-lg rounded-xl bg-amber-700/30">
            <div>{T("project.projectLeadInvitation.prompt")}</div>
            <div className="w-fit rounded-xl bg-neutral-100 shadow-inner shadow-neutral-100 py-2 px-5 text-chineseBlack">
              {T("project.projectLeadInvitation.view")}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
