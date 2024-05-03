"use client";

import { hackathonsApiClient } from "api-client/resources/hackathons";
import { useUpdateHackathonsRegistrations } from "api-client/resources/me/mutations/use-update-hackathons-registrations";

import useMutationAlert from "src/api/useMutationAlert";

import { ApplyCallout } from "components/features/apply-callout/apply-callout";

import { useIntl } from "hooks/translate/use-translate";

import { TRegistrationWrapper } from "./registration-wrapper.types";

export function RegistrationWrapper({ hackathonId, hackathonSlug }: TRegistrationWrapper.Props) {
  const { T } = useIntl();

  const { mutate: register, ...restRegister } = useUpdateHackathonsRegistrations({
    hackathonId,
    hackathonSlug,
  });

  const { data } = hackathonsApiClient.queries.useGetHackathonBySlug(hackathonSlug);

  const hasRegistered = data?.me?.hasRegistered;

  async function handleApply() {
    register();
  }

  useMutationAlert({
    mutation: restRegister,
    success: {
      message: T("v2.pages.hackathons.details.application.confirmationToaster"),
    },
    error: {
      default: true,
    },
  });

  return (
    <ApplyCallout
      icon={{ remixName: "ri-user-3-line" }}
      title="v2.pages.hackathons.details.application.title"
      formDescription="v2.pages.hackathons.details.application.description"
      buttonNotConnected="v2.pages.hackathons.details.application.button.connectToApply"
      buttonConnected={
        hasRegistered
          ? "v2.pages.hackathons.details.application.button.alreadyApplied"
          : "v2.pages.hackathons.details.application.button.apply"
      }
      onApply={handleApply}
      alreadyApplied={hasRegistered}
    />
  );
}
