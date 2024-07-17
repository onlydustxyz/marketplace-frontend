"use client";

import { Auth0ClientAdapter } from "core/application/auth0-client-adapter";
import { UserProfileContactChannel } from "core/domain/user/models/user-profile-model";
import { cloneElement } from "react";
import { Controller } from "react-hook-form";

import { Button } from "components/atoms/button/variants/button-default";
import { Input } from "components/atoms/input";
import { HackathonCardMini } from "components/features/hackathons/hackathon-card/hackathon-card.mini";
import { getHackathonBackground } from "components/features/hackathons/hackathon-card/hackathon-card.utils";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Modal } from "components/molecules/modal";

import { useIntl } from "hooks/translate/use-translate";

import { useRegister } from "./register.hooks";
import { TRegister } from "./register.types";

export function Register({ hackathonId, hackathonSlug, hackathonTitle, hackathonIndex, button }: TRegister.Props) {
  const { T } = useIntl();
  const { userProfile, authProvider, modal, form, registerForHackathon, isPending } = useRegister({
    hackathonId,
    hackathonSlug,
  });
  const { isAuthenticated = false, loginWithRedirect } = authProvider ?? {};

  function renderButton() {
    if (!isAuthenticated) {
      return cloneElement(
        button,
        {
          type: "button",
          onClick: () =>
            loginWithRedirect ? Auth0ClientAdapter.helpers.handleLoginWithRedirect(loginWithRedirect) : undefined,
        },
        <Translate token={"v2.pages.hackathons.details.info.connectToRegister"} />
      );
    }

    if (!userProfile?.hasContact(UserProfileContactChannel.Telegram)) {
      return cloneElement(
        button,
        {
          type: "button",
          onClick: () => modal.setIsOpen(true),
        },
        <Translate token={"v2.pages.hackathons.details.info.register"} />
      );
    }

    return cloneElement(
      button,
      { type: "button", onClick: registerForHackathon, isLoading: isPending },
      <Translate token={"v2.pages.hackathons.details.info.register"} />
    );
  }

  return (
    <>
      {renderButton()}

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
            <Button type={"submit"} variant="primary" size="l" isLoading={isPending}>
              <Translate token="v2.pages.hackathons.details.registerModal.submit" />
            </Button>
          ),
        }}
      >
        <div className="grid gap-4">
          <HackathonCardMini title={hackathonTitle} backgroundImage={getHackathonBackground(hackathonIndex)} />

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
