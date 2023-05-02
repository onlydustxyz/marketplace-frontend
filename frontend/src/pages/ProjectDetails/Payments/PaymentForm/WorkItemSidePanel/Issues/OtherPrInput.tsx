import { useMemo } from "react";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { useIntl } from "src/hooks/useIntl";
import Input from "src/components/FormInput";
import { WorkItem } from "src/components/GithubIssue";
import { useFetchIssueLazyQuery } from "src/__generated/graphql";
import { useFormContext, useFormState } from "react-hook-form";
import { parsePullRequestLink, REGEX_VALID_GITHUB_PULL_REQUEST_URL } from "src/utils/github";
import Link from "src/icons/Link";
import classNames from "classnames";
import { issueToWorkItem } from ".";

type Props = {
  projectId: string;
  onWorkItemAdded: (workItem: WorkItem) => void;
};

const INPUT_NAME = "otherPrLink";

export default function OtherPrInput({ projectId, onWorkItemAdded }: Props) {
  const { T } = useIntl();

  const [fetchIssue] = useFetchIssueLazyQuery({
    onCompleted: data => {
      if (data.fetchIssue) {
        onWorkItemAdded(issueToWorkItem(data.fetchIssue, projectId));
        resetField(INPUT_NAME);
      } else {
        setError(INPUT_NAME, {
          type: "validate",
          message: T("payment.form.workItems.pullRequests.addOther.invalidPrLink"),
        });
      }
    },
    onError: () =>
      setError(INPUT_NAME, {
        type: "validate",
        message: T("payment.form.workItems.pullRequests.addOther.invalidPrLink"),
      }),
    context: {
      graphqlErrorDisplay: "none",
    },
  });

  const { watch, setError, resetField } = useFormContext();
  const { errors } = useFormState({ name: INPUT_NAME });
  const otherPrLink = watch(INPUT_NAME);
  const otherPrLinkError = errors[INPUT_NAME];

  const { repoOwner, repoName, prNumber } = useMemo(() => parsePullRequestLink(otherPrLink), [otherPrLink]);

  const validateOtherPR = () =>
    fetchIssue({
      variables: {
        repoOwner,
        repoName,
        issueNumber: prNumber,
      },
    });

  return (
    <div className="p-4 flex flex-col gap-2 border border-greyscale-50/12 rounded-lg">
      <div className="font-walsheim font-medium text-base text-greyscale-50">
        {T("payment.form.workItems.pullRequests.addOther.label")}
      </div>
      <Input
        name={INPUT_NAME}
        placeholder={T("payment.form.workItems.pullRequests.addOther.placeholder")}
        withMargin={false}
        options={{
          pattern: {
            value: REGEX_VALID_GITHUB_PULL_REQUEST_URL,
            message: T("payment.form.workItems.pullRequests.addOther.notALink"),
          },
        }}
        inputClassName="pl-10"
        onKeyDown={event => event.key === "Enter" && validateOtherPR()}
        prefixComponent={
          <div className="mt-0.5">
            <Link
              className={classNames("text-xl", {
                "text-spaceBlue-200": !otherPrLink,
                "text-greyscale-50": otherPrLink && !otherPrLinkError,
                "text-orange-500": otherPrLinkError,
              })}
            />
          </div>
        }
        inputProps={{ autoFocus: true }}
      >
        <div onClick={validateOtherPR} data-testid="add-other-pr-btn">
          <Button
            size={ButtonSize.LgLowHeight}
            type={ButtonType.Secondary}
            disabled={!otherPrLink || !!otherPrLinkError}
          >
            {T("payment.form.workItems.add")}
          </Button>
        </div>
      </Input>
    </div>
  );
}
