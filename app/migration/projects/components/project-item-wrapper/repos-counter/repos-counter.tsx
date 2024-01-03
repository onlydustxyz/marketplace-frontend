import GitRepositoryLine from "../../../../../../src/icons/GitRepositoryLine.tsx";
import Tag from "@/components/ds/tag/tag.tsx";
import Translate from "@/components/layout/translate/translate.tsx";

type Props = {
  count: number;
};
export default function ReposCounter({ count }: Props) {
  if (!count) {
    return null;
  }
  return (
    <Tag size="small">
      <GitRepositoryLine />
      <span className="hidden xl:inline">
        <Translate token="project.details.githubRepos.count" params={{ count: count }} />
      </span>
      <span className="xl:hidden">{count}</span>
    </Tag>
  );
}
