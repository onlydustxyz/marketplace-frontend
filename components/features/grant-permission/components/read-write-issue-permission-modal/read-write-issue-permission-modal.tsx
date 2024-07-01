import { issuesApiClient } from "api-client/resources/issues";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import githubGrantPermissionImage from "public/images/banners/github-grant-permission-banner.png";
import { useEffect, useState } from "react";

import { Spinner } from "src/components/Spinner/Spinner";
import { usePooling } from "src/hooks/usePooling/usePooling";

import { Button } from "components/atoms/button/variants/button-default";
import { Paper } from "components/atoms/paper";
import { Typo } from "components/atoms/typo/variants/typo-default";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Modal } from "components/molecules/modal";

import { NEXT_ROUTER } from "constants/router";

export function ReadWriteIssuePermissionModal() {
  const router = useRouter();
  const [enablePooling, setEnablePooling] = useState(false);
  const { slug = "", issueId = "" } = useParams<{ slug?: string; issueId?: string }>();

  const { refetchOnWindowFocus, refetchInterval, onRefetching } = usePooling({
    limites: 20,
    delays: 3000,
    enabled: enablePooling,
  });
  const {
    data: issueData,
    isRefetching,
    isLoading,
  } = issuesApiClient.queries.useGetIssueById({
    pathParams: {
      issueId: Number(issueId),
    },
    options: { enabled: !!issueId, refetchOnWindowFocus, refetchInterval },
  });

  useEffect(() => {
    onRefetching(isRefetching);
  }, [isRefetching]);

  useEffect(() => {
    if (issueData?.githubAppInstallationStatus === "COMPLETE") {
      setEnablePooling(false);
    }
  }, [issueData]);

  function handleRedirectToGithubFlow() {
    if (issueData?.githubAppInstallationPermissionsUpdateUrl) {
      setEnablePooling(true);
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
      isOpen={issueData?.githubAppInstallationStatus !== "COMPLETE" && !isLoading}
      onOpenChange={isModalOpen =>
        !isModalOpen ? router.push(NEXT_ROUTER.projects.details.applications.root(slug)) : null
      }
      footer={{
        startContent: enablePooling ? <Spinner className="h-5 w-5" /> : null,
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
              startContent={<Icon remixName="ri-github-line" />}
            >
              <Translate
                as="span"
                token="v2.features.githubPermissions.readWriteIssue.modals.permissions.footerButtons.grantPermissions"
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
