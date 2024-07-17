import { zodResolver } from "@hookform/resolvers/zod";
import { HackathonReactQueryAdapter } from "core/application/react-query-adapter/hackathon";
import { UserReactQueryAdapter } from "core/application/react-query-adapter/user";
import { useClientBootstrapContext } from "core/bootstrap/client-bootstrap-context";
import { UserProfileContactChannel } from "core/domain/user/models/user-profile-model";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { TRegister } from "app/hackathons/[hackathonSlug]/features/register/register.types";

import useMutationAlert from "src/api/useMutationAlert";
import { usePosthog } from "src/hooks/usePosthog";

import { useIntl } from "hooks/translate/use-translate";

export function useRegister({ hackathonId, hackathonSlug }: TRegister.HookProps) {
  const { T } = useIntl();
  const [isOpen, setIsOpen] = useState(false);
  const { capture } = usePosthog();

  const {
    clientBootstrap: { authProvider },
  } = useClientBootstrapContext();
  const { isAuthenticated = false, loginWithRedirect } = authProvider ?? {};

  const { data: userProfile } = UserReactQueryAdapter.client.useGetMyProfile({
    options: {
      enabled: isAuthenticated,
    },
  });

  const { data: hackathon } = HackathonReactQueryAdapter.client.useGetHackathonBySlug({
    pathParams: { hackathonSlug },
    options: {
      enabled: isAuthenticated,
    },
  });

  const { mutateAsync: register, ...restRegister } = UserReactQueryAdapter.client.useRegisterToHackathon({
    pathParams: {
      hackathonId,
    },
    invalidateTagParams: {
      getHackathonBySlug: {
        pathParams: {
          hackathonSlug,
        },
      },
    },
  });

  useMutationAlert({
    mutation: restRegister,
    success: {
      message: T("v2.pages.hackathons.details.application.confirmationToaster"),
    },
    error: {
      default: true,
    },
  });

  const { mutateAsync: setMyProfile, ...restSetMyProfile } = UserReactQueryAdapter.client.useSetMyProfile();

  useMutationAlert({
    mutation: restSetMyProfile,
    error: {
      default: true,
    },
  });

  const { control, handleSubmit, reset } = useForm<TRegister.form>({
    resolver: zodResolver(TRegister.validation),
    defaultValues: {
      telegram: "",
    },
  });

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        reset();
      }, 500);
    }
  }, [isOpen]);

  async function registerForHackathon() {
    await register({});
    capture("hackathon_registration", { hackathon_id: hackathonId });
  }

  async function handleTelegramSubmit(data: TRegister.form) {
    if (!userProfile) return;

    const currentUserProfileTelegram = userProfile.getContact(UserProfileContactChannel.Telegram);

    userProfile.setContact({
      channel: UserProfileContactChannel.Telegram,
      contact: data.telegram,
      visibility: currentUserProfileTelegram?.visibility,
    });

    await setMyProfile({
      avatarUrl: userProfile.avatarUrl,
      location: userProfile.location,
      bio: userProfile.bio,
      website: userProfile.website,
      technologies: userProfile.technologies,
      contacts: userProfile.contacts,
      allocatedTimeToContribute: userProfile.allocatedTimeToContribute,
      isLookingForAJob: userProfile.isLookingForAJob,
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
    });

    await registerForHackathon();

    setIsOpen(false);
  }

  return {
    modal: {
      isOpen,
      setIsOpen,
    },
    form: {
      control,
      handleSubmit: handleSubmit(handleTelegramSubmit),
    },
    isAuthenticated,
    loginWithRedirect,
    registerForHackathon,
    isPending: restRegister.isPending || restSetMyProfile.isPending,
    hasTelegram: userProfile?.hasContact(UserProfileContactChannel.Telegram),
    hasRegistered: hackathon?.me.hasRegistered,
  };
}
