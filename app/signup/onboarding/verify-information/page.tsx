"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserReactQueryAdapter } from "core/application/react-query-adapter/user";
import { useClientBootstrapContext } from "core/bootstrap/client-bootstrap-context";
import { UserProfile } from "core/domain/user/models/user-profile-model";
import { UserProfileContactChannel } from "core/domain/user/models/user.types";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

import { AccountAlreadyExist } from "app/signup/components/account-already-exist/account-already-exist";
import { StepHeader } from "app/signup/components/step-header/step-header";
import { Title } from "app/signup/components/title/title";
import { StepGuard } from "app/signup/onboarding/components/step-guard/step-guard";
import { TVerifyInformation } from "app/signup/onboarding/verify-information/verify-information.types";

import { Avatar } from "components/atoms/avatar";
import { Button } from "components/atoms/button/variants/button-default";
import { Input } from "components/atoms/input";
import { Paper } from "components/atoms/paper";
import { Tag } from "components/atoms/tag";
import { toast } from "components/atoms/toaster";
import { Typo } from "components/atoms/typo";
import { SignupTemplate } from "components/templates/signup-template/signup-template";

import { NEXT_ROUTER } from "constants/router";

import { useIntl } from "hooks/translate/use-translate";

export default function VerifyInformationPage() {
  const { T } = useIntl();
  const router = useRouter();
  const {
    clientBootstrap: { authProvider },
  } = useClientBootstrapContext();
  const { isAuthenticated = false } = authProvider ?? {};

  const { data: userProfile, isLoading: userProfileIsLoading } = UserReactQueryAdapter.client.useGetMyProfile({
    options: {
      enabled: isAuthenticated,
    },
  });

  const { mutateAsync: setMyProfile, isPending: isPendingSetMyProfile } = UserReactQueryAdapter.client.useSetMyProfile({
    options: {
      onSuccess: () => {
        toast.default(T("v2.pages.signup.verifyInformation.toast.success"));
        router.push(NEXT_ROUTER.signup.onboarding.termsAndConditions);
      },
      onError: () => {
        toast.error(T("v2.pages.signup.verifyInformation.toast.error"));
      },
    },
  });

  const { control, handleSubmit, reset } = useForm<TVerifyInformation.form>({
    resolver: zodResolver(TVerifyInformation.validation),
    defaultValues: {
      email: userProfile?.contactEmail,
      telegram: userProfile?.getContactTelegram()?.contact,
    },
  });

  useEffect(() => {
    if (userProfile) {
      reset({
        email: userProfile.contactEmail,
        telegram: userProfile.getContactTelegram()?.contact,
      });
    }
  }, [userProfile]);

  async function handleSetMyProfile(data: TVerifyInformation.form) {
    if (!userProfile) return;

    await setMyProfile({
      contactEmail: data.email,
      contacts: [
        ...(userProfile.contacts?.filter(c => c.channel !== UserProfileContactChannel.telegram) ?? []),
        UserProfile.buildContact({
          channel: UserProfileContactChannel.telegram,
          contact: data.telegram,
          visibility: userProfile?.getContactTelegram()?.visibility,
        }),
      ],
    });
  }

  const renderFooter = useMemo(() => {
    return (
      <div className="flex justify-end gap-1">
        <Button
          type={"submit"}
          variant="primary"
          size="l"
          translate={{ token: "v2.pages.signup.verifyInformation.footer.next" }}
          endIcon={{ remixName: "ri-arrow-right-s-line" }}
          isLoading={isPendingSetMyProfile}
          isDisabled={userProfileIsLoading || isPendingSetMyProfile}
        />
      </div>
    );
  }, [handleSubmit, userProfileIsLoading, isPendingSetMyProfile]);

  return (
    <StepGuard step={"verificationInformationProvided"}>
      <form onSubmit={handleSubmit(handleSetMyProfile)} className="h-full">
        <SignupTemplate header={<AccountAlreadyExist />} footer={renderFooter}>
          <Paper size={"l"} container={"2"} classNames={{ base: "flex flex-col gap-3 min-h-full" }}>
            <StepHeader
              step={2}
              stepPath={"/signup/onboarding"}
              subStep={{ token: "v2.pages.signup.verifyInformation.title" }}
            />
            <Title
              title={{ token: "v2.pages.signup.verifyInformation.title" }}
              content={{ token: "v2.pages.signup.verifyInformation.subtitle" }}
            />
            <div className="flex flex-col gap-2">
              <Paper size={"s"} container={"transparent"} classNames={{ base: "grid gap-6" }}>
                <div className="grid gap-2">
                  <Typo
                    size={"s"}
                    weight={"medium"}
                    color={"text-1"}
                    translate={{ token: "v2.pages.signup.verifyInformation.form.githubAccount.label" }}
                  />
                  <div className="flex gap-2">
                    <Avatar size="l" shape="square" src={userProfile?.avatarUrl} />
                    <Input
                      type={"text"}
                      placeholder={T("v2.pages.signup.verifyInformation.form.contactEmail.placeholder")}
                      value={userProfile?.login ?? ""}
                      isDisabled
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Typo
                      size={"s"}
                      weight={"medium"}
                      color={"text-1"}
                      translate={{ token: "v2.pages.signup.verifyInformation.form.contactEmail.label" }}
                    />
                    <Tag
                      color="purple"
                      style="fill"
                      size="xs"
                      translate={{ token: "v2.pages.signup.verifyInformation.form.contactEmail.tag" }}
                    />
                  </div>

                  <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        placeholder={T("v2.pages.signup.verifyInformation.form.contactEmail.placeholder")}
                        isError={!!fieldState.error}
                      />
                    )}
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Typo
                      size={"s"}
                      weight={"medium"}
                      color={"text-1"}
                      translate={{ token: "v2.pages.signup.verifyInformation.form.telegram.label" }}
                    />
                    <Tag
                      color="green"
                      style="fill"
                      size="xs"
                      translate={{ token: "v2.pages.signup.verifyInformation.form.telegram.tag" }}
                    />
                  </div>

                  <Controller
                    name="telegram"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        placeholder={T("v2.pages.signup.verifyInformation.form.telegram.placeholder")}
                        isError={!!fieldState.error}
                      />
                    )}
                  />
                </div>
              </Paper>
              <Typo
                size={"xxs"}
                weight={"regular"}
                color={"text-2"}
                translate={{ token: "v2.pages.signup.verifyInformation.specialMention" }}
              />
            </div>
          </Paper>
        </SignupTemplate>
      </form>
    </StepGuard>
  );
}
