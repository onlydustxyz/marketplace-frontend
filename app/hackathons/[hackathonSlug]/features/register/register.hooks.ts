import { zodResolver } from "@hookform/resolvers/zod";
import { HackathonReactQueryAdapter } from "core/application/react-query-adapter/hackathon";
import { UserReactQueryAdapter } from "core/application/react-query-adapter/user";
import { useClientBootstrapContext } from "core/bootstrap/client-bootstrap-context";
import { UserProfile } from "core/domain/user/models/user-profile-model";
import { UserProfileContactChannel } from "core/domain/user/models/user.types";
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
  const { isAuthenticated = false } = authProvider ?? {};

  const { data: userProfile, isLoading: userProfileIsLoading } = UserReactQueryAdapter.client.useGetMyProfile({
    options: {
      enabled: isAuthenticated,
    },
  });

  const { data: hackathon, isLoading: hackathonIsLoading } = HackathonReactQueryAdapter.client.useGetHackathonBySlug({
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
      message: T("v2.pages.hackathons.details.registerModal.success"),
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

    const currentUserProfileTelegram = userProfile.getContactTelegram();

    await setMyProfile({
      contacts: [
        ...(userProfile.contacts?.filter(c => c.channel !== UserProfileContactChannel.telegram) ?? []),
        UserProfile.buildContact({
          channel: UserProfileContactChannel.telegram,
          contact: data.telegram,
          visibility: currentUserProfileTelegram?.visibility,
        }),
      ],
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
    registerForHackathon,
    isLoading: userProfileIsLoading || hackathonIsLoading,
    isPending: restRegister.isPending || restSetMyProfile.isPending,
    hasTelegram: userProfile?.hasContact(UserProfileContactChannel.telegram),
    hasRegistered: hackathon?.me.hasRegistered,
  };
}
