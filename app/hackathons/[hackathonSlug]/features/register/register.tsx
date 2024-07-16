"use client";

import Image from "next/image";
import githubGrantPermissionImage from "public/images/banners/github-grant-permission-banner.png";
import { Controller } from "react-hook-form";

import { Button } from "components/atoms/button/variants/button-default";
import { Input } from "components/atoms/input";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Modal } from "components/molecules/modal";

import { useIntl } from "hooks/translate/use-translate";

import { useRegister } from "./register.hooks";
import { TRegister } from "./register.types";

export function Register({ hackathonId, hackathonSlug }: TRegister.Props) {
  const { T } = useIntl();
  const { modal, mutation, form } = useRegister({ hackathonId, hackathonSlug });

  return (
    <>
      <button type={"button"} onClick={() => modal.setIsOpen(true)}>
        Register
      </button>

      <Modal
        as={"form"}
        htmlProps={{
          onSubmit: form.handleSubmit,
        }}
        titleProps={{
          translate: { token: "v2.pages.hackathons.details.registerModal.title" },
        }}
        isOpen={modal.isOpen}
        onOpenChange={modal.setIsOpen}
        footer={{
          endContent: (
            <Button type={"submit"} variant="primary" size="l" isLoading={mutation.isPending}>
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
            control={form.control}
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
