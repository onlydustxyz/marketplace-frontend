"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { AccountAlreadyExist } from "app/signup/components/account-already-exist/account-already-exist";
import { StepHeader } from "app/signup/components/step-header/step-header";
import { Title } from "app/signup/components/title/title";
import { TCompleteYourProfile } from "app/signup/onboarding/complete-your-profile/components/complete-your-profile.types";

import { Button } from "components/atoms/button/variants/button-default";
import { Input } from "components/atoms/input";
import { Paper } from "components/atoms/paper";
import { Textarea } from "components/atoms/textarea";
import { BaseLink } from "components/layout/base-link/base-link";
import { Translate } from "components/layout/translate/translate";
import { SignupTemplate } from "components/templates/signup-template/signup-template";

import { useIntl } from "hooks/translate/use-translate";

function Footer() {
  return (
    <div className="flex w-full flex-row justify-end gap-2">
      <Button
        variant={"secondary-light"}
        translate={{ token: "v2.pages.signup.onboarding.tunnel.actions.back" }}
        as={BaseLink}
        htmlProps={{ href: "/signup" }}
        startIcon={{ remixName: "ri-arrow-left-s-line" }}
      />
      <Button
        type={"submit"}
        isLoading={true}
        translate={{ token: "v2.pages.signup.onboarding.tunnel.actions.next" }}
        endIcon={{ remixName: "ri-arrow-right-s-line" }}
      />
    </div>
  );
}

export default function CompleteYourProfilePage() {
  const { T } = useIntl();

  const form = useForm<TCompleteYourProfile.form>({
    resolver: zodResolver(TCompleteYourProfile.validation),
    defaultValues: {
      firstName: "",
      lastName: "",
      location: "",
      bio: "",
      website: "",
    },
  });

  const { control, handleSubmit } = form;

  function handleFormSubmit(values: TCompleteYourProfile.form) {
    console.log({ values });
  }

  return (
    <form className={"h-full"} onSubmit={handleSubmit(handleFormSubmit)}>
      <SignupTemplate header={<AccountAlreadyExist />} footer={<Footer />}>
        <Paper container={"2"} classNames={{ base: "flex flex-col gap-6 min-h-full" }}>
          <div className="grid gap-3">
            <StepHeader
              step={2}
              stepPath={"/signup/onboarding"}
              subStep={{ token: "v2.pages.signup.onboarding.completeYourProfile.title" }}
            />

            <Title
              title={{ token: "v2.pages.signup.onboarding.completeYourProfile.title" }}
              content={{ token: "v2.pages.signup.onboarding.completeYourProfile.content" }}
            />
          </div>

          <Paper size={"s"} container={"transparent"} classNames={{ base: "grid grid-cols-2 gap-2" }}>
            <Controller
              name="firstName"
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  id={field.name}
                  isError={!!fieldState.error}
                  label={<Translate token={"v2.pages.signup.onboarding.completeYourProfile.form.firstName.label"} />}
                  placeholder={T("v2.pages.signup.onboarding.completeYourProfile.form.firstName.placeholder")}
                  {...field}
                />
              )}
            />

            <Controller
              name="lastName"
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  id={field.name}
                  isError={!!fieldState.error}
                  label={<Translate token={"v2.pages.signup.onboarding.completeYourProfile.form.lastName.label"} />}
                  placeholder={T("v2.pages.signup.onboarding.completeYourProfile.form.lastName.placeholder")}
                  {...field}
                />
              )}
            />

            <Controller
              name="location"
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  id={field.name}
                  isError={!!fieldState.error}
                  label={<Translate token={"v2.pages.signup.onboarding.completeYourProfile.form.location.label"} />}
                  placeholder={T("v2.pages.signup.onboarding.completeYourProfile.form.location.placeholder")}
                  classNames={{ container: "col-span-full" }}
                  {...field}
                />
              )}
            />

            <Controller
              name="bio"
              control={control}
              render={({ field, fieldState }) => (
                <Textarea
                  id={field.name}
                  isError={!!fieldState.error}
                  label={<Translate token={"v2.pages.signup.onboarding.completeYourProfile.form.bio.label"} />}
                  placeholder={T("v2.pages.signup.onboarding.completeYourProfile.form.bio.placeholder")}
                  classNames={{ base: "col-span-full" }}
                  {...field}
                />
              )}
            />

            <Controller
              name="website"
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  id={field.name}
                  isError={!!fieldState.error}
                  label={<Translate token={"v2.pages.signup.onboarding.completeYourProfile.form.website.label"} />}
                  placeholder={T("v2.pages.signup.onboarding.completeYourProfile.form.website.placeholder")}
                  classNames={{ container: "col-span-full" }}
                  {...field}
                />
              )}
            />
          </Paper>
        </Paper>
      </SignupTemplate>
    </form>
  );
}
