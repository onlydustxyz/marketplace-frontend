"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserReactQueryAdapter } from "core/application/react-query-adapter/user";
import { useClientBootstrapContext } from "core/bootstrap/client-bootstrap-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { TCompleteYourProfile } from "app/signup/onboarding/complete-your-profile/complete-your-profile.types";

import { toast } from "components/atoms/toaster";

import { NEXT_ROUTER } from "constants/router";

import { useIntl } from "hooks/translate/use-translate";

export function useCompleteYourProfile() {
  const { T } = useIntl();
  const router = useRouter();

  const {
    clientBootstrap: { authProvider },
  } = useClientBootstrapContext();
  const { isAuthenticated = false } = authProvider ?? {};

  const { data: userProfile } = UserReactQueryAdapter.client.useGetMyProfile({
    options: {
      enabled: isAuthenticated,
    },
  });

  const { mutateAsync: setMyProfile, ...setMyProfileMutation } = UserReactQueryAdapter.client.useSetMyProfile({
    options: {
      onSuccess: () => {
        toast.default(T("v2.pages.signup.onboarding.completeYourProfile.form.toast.success"));
        router.push(NEXT_ROUTER.signup.onboarding.root);
      },
      onError: () => {
        toast.error(T("v2.pages.signup.onboarding.completeYourProfile.form.toast.error"));
      },
    },
  });

  const form = useForm<TCompleteYourProfile.form>({
    resolver: zodResolver(TCompleteYourProfile.validation),
    defaultValues: {
      firstName: "",
      lastName: "",
      location: "",
      website: "",
    },
  });

  useEffect(() => {
    if (userProfile) {
      form.reset({
        firstName: userProfile?.firstName ?? "",
        lastName: userProfile?.lastName ?? "",
        location: userProfile?.location ?? "",
        bio: userProfile?.bio ?? "",
        website: userProfile?.website ?? "",
      });
    }
  }, [userProfile]);

  async function handleFormSubmit(values: TCompleteYourProfile.form) {
    if (!userProfile) return;

    await setMyProfile({
      avatarUrl: userProfile.avatarUrl,
      location: values.location,
      bio: values.bio,
      website: values.website,
      contacts: userProfile.contacts,
      allocatedTimeToContribute: userProfile.allocatedTimeToContribute,
      isLookingForAJob: userProfile.isLookingForAJob,
      firstName: values.firstName,
      lastName: values.lastName,
    });
  }

  return {
    userProfile,
    form,
    setMyProfileMutation,
    handleFormSubmit,
  };
}
