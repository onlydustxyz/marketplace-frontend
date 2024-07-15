"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import githubGrantPermissionImage from "public/images/banners/github-grant-permission-banner.png";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { TRegister } from "app/hackathons/[hackathonSlug]/features/register/register.types";

import { Button } from "components/atoms/button/variants/button-default";
import { Input } from "components/atoms/input";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Modal } from "components/molecules/modal";

import { useIntl } from "hooks/translate/use-translate";

export function Register() {
  const { T } = useIntl();
  const [isOpen, setIsOpen] = useState(false);
  // const { capture } = usePosthog();

  // const {
  //   mutate: register,
  //   isPending: registerIsPending,
  //   ...restRegister
  // } = useUpdateHackathonsRegistrations({
  //   hackathonId,
  //   hackathonSlug,
  // });

  // const { data } = hackathonsApiClient.queries.useGetHackathonBySlug(hackathonSlug);
  // const hasRegistered = data?.me?.hasRegistered;

  // useMutationAlert({
  //   mutation: restRegister,
  //   success: {
  //     message: T("v2.pages.hackathons.details.application.confirmationToaster"),
  //   },
  //   error: {
  //     default: true,
  //   },
  // });

  const { control, handleSubmit } = useForm<TRegister.form>({
    resolver: zodResolver(TRegister.validation),
    defaultValues: {
      telegram: "",
    },
  });

  function handleFormSubmit(data: TRegister.form) {
    console.log({ data });
    // TODO @hayden submit

    //register(undefined);
    //capture("hackathon_registration", { hackathon_id: hackathonId });
  }

  return (
    <>
      <button type={"button"} onClick={() => setIsOpen(true)}>
        Register
      </button>

      <Modal
        as={"form"}
        htmlProps={{
          onSubmit: handleSubmit(handleFormSubmit),
        }}
        titleProps={{
          translate: { token: "v2.pages.hackathons.details.registerModal.title" },
        }}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        footer={{
          endContent: (
            <Button type={"submit"} variant="primary" size="l" isLoading={registerIsPending}>
              <Translate token="v2.pages.hackathons.details.registerModal.submit" />
            </Button>
          ),
        }}
      >
        <div className="grid gap-4">
          <Image
            src={githubGrantPermissionImage}
            alt="github grant permission"
            className="h-full w-full object-cover object-center"
            loading={"lazy"}
            width={320}
            height={50}
          />

          <Controller
            name="telegram"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                label={T("v2.pages.hackathons.details.registerModal.telegram.label")}
                placeholder={T("v2.pages.hackathons.details.registerModal.telegram.placeholder")}
                startContent={<Icon remixName={"ri-telegram-line"} />}
                isError={!!fieldState.error}
              />
            )}
          />
        </div>
      </Modal>
    </>
  );
}
