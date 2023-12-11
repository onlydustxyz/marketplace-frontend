import IssueOpen from "src/assets/icons/IssueOpen";
import { FormOption, Size as FormOptionSize, Variant } from "src/components/FormOption/FormOption";
import { FilterField } from "src/components/New/Filter/FilterField";
import { useIntl } from "src/hooks/useIntl";
import EyeLine from "src/icons/EyeLine";
import GitMergeLine from "src/icons/GitMergeLine";
import { GithubContributionType } from "src/types";

export function FilterTypeOptions({
  selected,
  onChange,
}: {
  selected: GithubContributionType[];
  onChange: (type: GithubContributionType) => void;
}) {
  const { T } = useIntl();

  const typeOptions: { value: GithubContributionType; icon: JSX.Element; label: string }[] = [
    {
      value: GithubContributionType.PullRequest,
      icon: <GitMergeLine />,
      label: T("filter.type.pullRequest"),
    },
    {
      value: GithubContributionType.Issue,
      icon: <IssueOpen className="h-3.5 w-3.5" />,
      label: T("filter.type.issue"),
    },
    {
      value: GithubContributionType.CodeReview,
      icon: <EyeLine />,
      label: T("filter.type.codeReview"),
    },
  ];

  return (
    <FilterField label={T("filter.type.title")}>
      <div className="flex gap-2">
        {typeOptions.map(option => (
          <div className="flex" key={option.value}>
            <FormOption
              as="button"
              size={FormOptionSize.Sm}
              variant={selected.includes(option.value) ? Variant.Active : Variant.Default}
              onClick={() => {
                onChange(option.value);
              }}
            >
              <span className="text-base leading-none">{option.icon}</span>
              {option.label}
            </FormOption>
          </div>
        ))}
      </div>
    </FilterField>
  );
}
