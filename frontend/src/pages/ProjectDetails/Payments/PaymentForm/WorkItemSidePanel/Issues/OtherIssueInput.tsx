import { useMemo } from "react";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { useIntl } from "src/hooks/useIntl";
import Input from "src/components/FormInput";
import { WorkItem } from "src/components/GithubIssue";
import { FetchIssueDocument, FetchIssueQuery } from "src/__generated/graphql";
import { useHasuraLazyQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import { useFormContext, useFormState } from "react-hook-form";
import { parseIssueLink, REGEX_VALID_GITHUB_ISSUE_URL } from "src/utils/github";
import Link from "src/icons/Link";
import classNames from "classnames";
import { issueToWorkItem } from ".";

type Props = {
  projectId: string;
  onWorkItemAdded: (workItem: WorkItem) => void;
};

const INPUT_NAME = "otherIssueLink";

export default function OtherIssueInput({ projectId, onWorkItemAdded }: Props) {
  const { T } = useIntl();

  const [fetchIssue] = useHasuraLazyQuery<FetchIssueQuery>(FetchIssueDocument, HasuraUserRole.RegisteredUser, {
    onCompleted: data => {
      if (data.fetchIssue) {
        onWorkItemAdded(issueToWorkItem(projectId, data.fetchIssue));
        resetField(INPUT_NAME);
      } else {
        setError(INPUT_NAME, {
          type: "validate",
          message: T("payment.form.workItems.issues.addOther.invalidIssueLink"),
        });
      }
    },
    onError: () =>
      setError(INPUT_NAME, {
        type: "validate",
        message: T("payment.form.workItems.issues.addOther.invalidIssueLink"),
      }),
    context: {
      graphqlErrorDisplay: "none",
    },
  });

  const { watch, setError, resetField } = useFormContext();
  const { errors } = useFormState({ name: INPUT_NAME });
  const otherIssueLink = watch(INPUT_NAME);
  const otherIssueLinkError = errors[INPUT_NAME];

  const { repoOwner, repoName, issueNumber } = useMemo(() => parseIssueLink(otherIssueLink), [otherIssueLink]);

  const validateOtherIssue = () =>
    fetchIssue({
      variables: {
        repoOwner,
        repoName,
        issueNumber,
      },
    });

  return (
    <div className="p-4 flex flex-col gap-2 border border-greyscale-50/12 rounded-lg">
      <div className="font-walsheim font-medium text-base text-greyscale-50">
        {T("payment.form.workItems.issues.addOther.label")}
      </div>
      <Input
        name={INPUT_NAME}
        placeholder={T("payment.form.workItems.issues.addOther.placeholder")}
        withMargin={false}
        options={{
          pattern: {
            value: REGEX_VALID_GITHUB_ISSUE_URL,
            message: T("payment.form.workItems.issues.addOther.notALink"),
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
      >
        <div onClick={validateOtherIssue} data-testid="add-other-issue-btn">
          <Button
            size={ButtonSize.LgLowHeight}
            type={ButtonType.Secondary}
            disabled={!otherIssueLink || !!otherIssueLinkError}
          >
            {T("payment.form.workItems.add")}
          </Button>
        </div>
      </Input>
    </div>
  );
}
