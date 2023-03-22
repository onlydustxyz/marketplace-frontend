import { useIntl } from "src/hooks/useIntl";
import { WorkItem } from "src/components/GithubIssue";
import PullRequests from "./PullRequests";
import SidePanel from "src/components/SidePanel";

type Props = {
  projectId: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  contributorHandle: string;
  workItems: WorkItem[];
  onWorkItemAdded: (workItem: WorkItem) => void;
};

export default function WorkItemSidePanel({
  projectId,
  contributorHandle,
  workItems,
  onWorkItemAdded,
  ...props
}: Props) {
  const { T } = useIntl();

  return (
    <SidePanel {...props} title={T("payment.form.workItems.add")}>
      <PullRequests
        projectId={projectId}
        contributorHandle={contributorHandle}
        workItems={workItems}
        onWorkItemAdded={onWorkItemAdded}
      />
    </SidePanel>
  );
}
