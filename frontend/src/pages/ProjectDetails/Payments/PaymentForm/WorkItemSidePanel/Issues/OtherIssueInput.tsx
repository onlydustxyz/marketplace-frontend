import { useMemo } from "react";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { useIntl } from "src/hooks/useIntl";
import Input from "src/components/FormInput";
import { WorkItem } from "src/components/GithubIssue";
import { Type, useFetchIssueLazyQuery } from "src/__generated/graphql";
import { useFormContext, useFormState } from "react-hook-form";
import {
  parseIssueLink,
  REGEX_VALID_GITHUB_ISSUE_URL,
  parsePullRequestLink,
  REGEX_VALID_GITHUB_PULL_REQUEST_URL,
} from "src/utils/github";
import Link from "src/icons/Link";
import classNames from "classnames";
import { issueToWorkItem } from ".";

type Props = {
  projectId: string;
  type: Type;
  onWorkItemAdded: (workItem: WorkItem) => void;
};

export default function OtherIssueInput({ projectId, type, onWorkItemAdded }: Props) {
  const { T } = useIntl();
  const inputName = type === Type.Issue ? "otherIssueLink" : "otherPullRequestLink";
  const tKey = type === Type.Issue ? "issues" : "pullRequests";

  const [fetchIssue] = useFetchIssueLazyQuery({
    onCompleted: data => {
      if (data.fetchIssue) {
        onWorkItemAdded(issueToWorkItem(data.fetchIssue, projectId));
        resetField(inputName);
      } else {
        setError(inputName, {
          type: "validate",
          message: T(`reward.form.workItems.${tKey}.addOther.invalidLink`),
        });
      }
    },
    onError: () =>
      setError(inputName, {
        type: "validate",
        message: T(`reward.form.workItems.${tKey}.addOther.invalidLink`),
      }),
    context: {
      graphqlErrorDisplay: "none",
    },
  });

  const { watch, setError, resetField } = useFormContext();
  const { errors } = useFormState({ name: inputName });
  const otherIssueLink = watch(inputName);
  const otherIssueLinkError = errors[inputName];

  const { repoOwner, repoName, issueNumber } = useMemo(
    () => (type === Type.Issue ? parseIssueLink(otherIssueLink) : parsePullRequestLink(otherIssueLink)),
    [otherIssueLink]
  );

  const validateOtherIssue = () =>
    fetchIssue({
      variables: {
        repoOwner,
        repoName,
        issueNumber,
      },
    });

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-greyscale-50/12 p-4">
      <div className="font-walsheim text-base font-medium text-greyscale-50">
        {T(`reward.form.workItems.${tKey}.addOther.label`)}
      </div>
      <Input
        name={inputName}
        placeholder={T(`reward.form.workItems.${tKey}.addOther.placeholder`)}
        withMargin={false}
        options={{
          pattern: {
            value: type === Type.Issue ? REGEX_VALID_GITHUB_ISSUE_URL : REGEX_VALID_GITHUB_PULL_REQUEST_URL,
            message: T(`reward.form.workItems.${tKey}.addOther.notALink`),
          },
        }}
        inputClassName="pl-10"
        onKeyDown={event => event.key === "Enter" && validateOtherIssue()}
        prefixComponent={
          <div className="mt-0.5">
            <Link
              className={classNames("text-xl", {
                "text-spaceBlue-200": !otherIssueLink,
                "text-greyscale-50": otherIssueLink && !otherIssueLinkError,
                "text-orange-500": otherIssueLinkError,
              })}
            />
          </div>
        }
        inputProps={{ autoFocus: true }}
      >
        <div onClick={validateOtherIssue} data-testid={`add-other-${tKey}-btn`}>
          <Button
            size={ButtonSize.LgLowHeight}
            type={ButtonType.Secondary}
            disabled={!otherIssueLink || !!otherIssueLinkError}
          >
            {T("reward.form.workItems.add")}
          </Button>
        </div>
      </Input>
    </div>
  );
}
