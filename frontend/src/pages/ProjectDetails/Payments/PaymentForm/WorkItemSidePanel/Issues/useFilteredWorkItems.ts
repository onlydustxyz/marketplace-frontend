import { escapeRegExp, filter } from "lodash";
import { WorkItem } from "src/components/GithubIssue";

type Props = {
  pattern?: string;
  workItems: WorkItem[];
};

export default function useFilteredWorkItems({ pattern = "", workItems }: Props) {
  const searchRegExps = pattern
    .split(" ")
    .map(str => str.trim())
    .filter(str => str.length > 0)
    .map(str => new RegExp(escapeRegExp(str), "i"));

  return filter(workItems, (workItem: WorkItem) => {
    const workItemFullText = workItem.number.toString() + " " + workItem.title;
    return searchRegExps.filter(regexp => !regexp.test(workItemFullText)).length === 0;
  });
}
