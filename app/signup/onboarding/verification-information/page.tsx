"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserReactQueryAdapter } from "core/application/react-query-adapter/user";
import { useClientBootstrapContext } from "core/bootstrap/client-bootstrap-context";
import React, { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

import { AccountAlreadyExist } from "app/signup/components/account-already-exist/account-already-exist";
import { StepHeader } from "app/signup/components/step-header/step-header";
import { Title } from "app/signup/components/title/title";
import { TVerificationInformation } from "app/signup/onboarding/verification-information/verification-information.types";

import { Avatar } from "components/atoms/avatar";
import { Button } from "components/atoms/button/variants/button-default";
import { Input } from "components/atoms/input";
import { Paper } from "components/atoms/paper";
import { Tag } from "components/atoms/tag";
import { toast } from "components/atoms/toaster";
import { Typo } from "components/atoms/typo";
import { SignupTemplate } from "components/templates/signup-template/signup-template";

import { useIntl } from "hooks/translate/use-translate";

export default function VerificationInformationPage() {
  const { T } = useIntl();
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
        toast.default(T("v2.pages.signup.verificationInformation.toast.success"));
        // TODO @Mehdi add redirection to Terms and condition
      },
      onError: () => {
        toast.error(T("v2.pages.signup.verificationInformation.toast.error"));
      },
    },
  });

  const { control, handleSubmit, reset } = useForm<TVerificationInformation.form>({
    resolver: zodResolver(TVerificationInformation.validation),
    defaultValues: {
      email: userProfile?.contacts?.find(contact => contact.channel === "EMAIL")?.contact,
      telegram: userProfile?.contacts?.find(contact => contact.channel === "TELEGRAM")?.contact,
    },
  });

  useEffect(() => {
    if (userProfile) {
      reset({
        email: userProfile?.contacts?.find(contact => contact.channel === "EMAIL")?.contact,
        telegram: userProfile?.contacts?.find(contact => contact.channel === "TELEGRAM")?.contact,
      });
    }
  }, [userProfile]);

  async function handleSetMyProfile(data: TVerificationInformation.form) {
    await setMyProfile({
      contacts: [
        {
          channel: "EMAIL",
          contact: data.email,
          visibility: userProfile?.contacts?.find(contact => contact.channel === "EMAIL")?.visibility ?? "public",
        },
        {
          channel: "TELEGRAM",
          contact: data.telegram,
          visibility: userProfile?.contacts?.find(contact => contact.channel === "TELEGRAM")?.visibility ?? "public",
        },
      ],
    });
  }

  const renderFooter = useMemo(() => {
    return (
      <div className="flex justify-end gap-1">
        <Button
          variant="secondary-light"
          size="l"
          translate={{ token: "v2.pages.signup.verificationInformation.footer.back" }}
          startIcon={{ remixName: "ri-arrow-left-s-line" }}
          // TODO @Mehdi add back redirection to step 1
          isDisabled={userProfileIsLoading || isPendingSetMyProfile}
        />
        <Button
          type={"submit"}
          variant="primary"
          size="l"
          translate={{ token: "v2.pages.signup.verificationInformation.footer.next" }}
          endIcon={{ remixName: "ri-arrow-right-s-line" }}
          isLoading={isPendingSetMyProfile}
          isDisabled={userProfileIsLoading || isPendingSetMyProfile}
        />
      </div>
    );
  }, [handleSubmit, userProfileIsLoading, isPendingSetMyProfile]);

  return (
    <form onSubmit={handleSubmit(handleSetMyProfile)} className="h-full">
      <SignupTemplate header={<AccountAlreadyExist showDisconnectButton />} footer={renderFooter}>
        <Paper size={"l"} container={"3"} classNames={{ base: "flex flex-col gap-3 min-h-full" }}>
          <StepHeader
            step={2}
            stepPath={"/signup/onboarding"}
            subStep={{ token: "v2.pages.signup.verificationInformation.title" }}
          />
          <Title
            title={{ token: "v2.pages.signup.verificationInformation.title" }}
            content={{ token: "v2.pages.signup.verificationInformation.subtitle" }}
          />
          <div className="flex flex-col gap-2">
            <Paper size={"s"} container={"transparent"} classNames={{ base: "grid gap-6" }}>
              <div className="grid gap-2">
                <Typo
                  size={"s"}
                  weight={"medium"}
                  color={"text-1"}
                  translate={{ token: "v2.pages.signup.verificationInformation.form.githubAccount.label" }}
                />
                <div className="flex gap-2">
                  <Avatar size="l" shape="square" src={userProfile?.avatarUrl} />
                  <Input
                    type={"text"}
                    placeholder={T("v2.pages.signup.verificationInformation.form.contactEmail.placeholder")}
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
                    translate={{ token: "v2.pages.signup.verificationInformation.form.contactEmail.label" }}
                  />
                  <Tag
                    color="purple"
                    style="fill"
                    size="xs"
                    translate={{ token: "v2.pages.signup.verificationInformation.form.contactEmail.tag" }}
                  />
                </div>

                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      placeholder={T("v2.pages.signup.verificationInformation.form.contactEmail.placeholder")}
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
                    translate={{ token: "v2.pages.signup.verificationInformation.form.telegram.label" }}
                  />
                  <Tag
                    color="pink"
                    style="fill"
                    size="xs"
                    translate={{ token: "v2.pages.signup.verificationInformation.form.telegram.tag" }}
                  />
                </div>

                <Controller
                  name="telegram"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      placeholder={T("v2.pages.signup.verificationInformation.form.telegram.placeholder")}
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
              translate={{ token: "v2.pages.signup.verificationInformation.specialMention" }}
            />
          </div>
        </Paper>
      </SignupTemplate>
    </form>
  );
}
