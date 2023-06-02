import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { ContributionCountFragment } from "src/__generated/graphql";
import { useIntl } from "src/hooks/useIntl";

type Props = {
  active?: boolean;
  payload?: { payload: ContributionCountFragment }[];
};

export default function Tooltip({ active, payload }: Props) {
  const { T } = useIntl();

  if (active && payload && payload.length) {
    return (
      <div className="bg-greyscale-800 font-walsheim font-normal text-xs text-greyscale-50 rounded-lg px-3 py-2">
        <ReactMarkdown className="whitespace-pre" remarkPlugins={[remarkGfm]}>
          {T("contributionGraph.tooltip", {
            paidCount: payload.at(0)?.payload.paidCount.toString(),
            unpaidCount: payload.at(0)?.payload.unpaidCount.toString(),
          })}
        </ReactMarkdown>
      </div>
    );
  }

  return null;
}
