import { issuesApiClient } from "api-client/resources/issues";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import githubGrantPermissionImage from "public/images/banners/github-grant-permission-banner.png";
import { useEffect, useState } from "react";

import { Spinner } from "src/components/Spinner/Spinner";
import { usePooling, usePoolingFeedback } from "src/hooks/usePooling/usePooling";
import { cn } from "src/utils/cn";

import { Button } from "components/atoms/button/variants/button-default";
import { Paper } from "components/atoms/paper";
import { Typo } from "components/atoms/typo/variants/typo-default";
import { TPublicRepoScopePermissionModal } from "components/features/grant-permission/components/public-repo-scope-permission-modal/public-repo-scope-permission-modal.types";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Modal } from "components/molecules/modal";

import { NEXT_ROUTER } from "constants/router";

import { useIntl } from "hooks/translate/use-translate";

export function ReadWriteIssuePermissionModal(_: TPublicRepoScopePermissionModal.Props) {
  const { T } = useIntl();
  const router = useRouter();
  const [enablePooling, setEnablePooling] = useState(false);
  const { slug = "", contributionId = "" } = useParams<{ slug?: string; contributionId?: string }>();

  const { refetchOnWindowFocus, refetchInterval, onRefetching, onForcePooling } = usePooling({
    limites: 20,
    delays: 3000,
    enabled: enablePooling,
  });
  const {
    data: issueData,
    isLoading,
    isRefetching,
    refetch,
  } = issuesApiClient.queries.useGetIssueById({
    pathParams: {
      issueId: Number(contributionId),
    },
    options: { enabled: !!contributionId, refetchOnWindowFocus, refetchInterval },
  });

  const PoolingFeedback = usePoolingFeedback({
    onForcePooling,
    isLoading,
    isRefetching,
    fetch: refetch,
    ui: {
      label: T("v2.features.githubPermissions.readWriteIssue.modals.permissions.footerButtons.syncOganizations"),
    },
  });

  useEffect(() => {
    onRefetching(isRefetching);
  }, [isRefetching]);

  useEffect(() => {
    if (issueData?.githubAppInstallationStatus === "COMPLETE") {
      setEnablePooling(false);
      return;
    }
  }, [issueData]);

  function handleRedirectToGithubFlow() {
    setEnablePooling(true);
    if (issueData?.githubAppInstallationPermissionsUpdateUrl) {
      window.open(issueData?.githubAppInstallationPermissionsUpdateUrl, "_blank");
    }
  }

  return (
    <Modal
      titleProps={{
        translate: { token: "v2.features.githubPermissions.readWriteIssue.modals.permissions.title" },
      }}
      classNames={{
        backdrop: "bg-transparent",
      }}
      isOpen={issueData?.githubAppInstallationStatus !== "COMPLETE"}
      onOpenChange={isModalOpen =>
        !isModalOpen ? router.push(NEXT_ROUTER.projects.details.applications.root(slug)) : null
      }
      footer={{
        endContent: (
          <div className="flex gap-4">
            <Button
              variant="secondary-light"
              size="l"
              onClick={() => router.push(NEXT_ROUTER.projects.details.applications.root(slug))}
              translate={{
                token: "v2.features.githubPermissions.readWriteIssue.modals.permissions.footerButtons.moreInfo",
              }}
            />

            <Button
              variant="primary"
              size="l"
              onClick={handleRedirectToGithubFlow}
              startContent={isRefetching ? <Spinner className="h-4 w-4" /> : <Icon remixName="ri-github-line" />}
            >
              <Translate
                as="span"
                token="v2.features.githubPermissions.readWriteIssue.modals.permissions.footerButtons.grantPermissions"
                className={cn({ "text-label-purple": isRefetching })}
              />
            </Button>
          </div>
        ),
      }}
    >
      <div className="flex flex-col gap-4">
        <Image
          src={githubGrantPermissionImage}
          alt="github grant permission"
          className="h-full w-full object-cover object-center"
          loading={"lazy"}
          width={320}
          height={50}
        />
        <div className="flex flex-col">
          <Typo
            variant="default"
            size="s"
            translate={{
              token: "v2.features.githubPermissions.readWriteIssue.modals.permissions.description",
            }}
          />
        </div>
        <Paper container="3" border="none">
          <Typo
            variant="default"
            size="xs"
            translate={{
              token: "v2.features.githubPermissions.readWriteIssue.modals.permissions.claims.write",
            }}
          />
        </Paper>
      </div>
    </Modal>
  );
}
