"use client";

import { Auth0ClientAdapter } from "core/application/auth0-client-adapter";
import { useContext } from "react";
import { Controller } from "react-hook-form";

import { Button } from "components/atoms/button/variants/button-default";
import { Input } from "components/atoms/input";
import { Tooltip } from "components/atoms/tooltip";
import { HackathonCardMini } from "components/features/hackathons/hackathon-card/hackathon-card.mini";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Modal } from "components/molecules/modal";

import { useIntl } from "hooks/translate/use-translate";

import { HackathonContext } from "../../context/hackathon.context";
import { useRegister } from "./register.hooks";
import { TRegister } from "./register.types";

export function Register({
  hackathonId,
  hackathonSlug,
  hackathonTitle,
  hackathonBackgroundImage,
  buttonProps,
  tooltipProps,
  hackathonIsLive,
}: TRegister.Props) {
  const { T } = useIntl();
  const {
    modal,
    form,
    isAuthenticated,
    loginWithRedirect,
    registerForHackathon,
    isLoading,
    isPending,
    hasTelegram,
    hasRegistered,
  } = useRegister({
    hackathonId,
    hackathonSlug,
  });

  const {
    issues: { open, isOpen },
  } = useContext(HackathonContext);

  function renderButton() {
    if (hasRegistered && hackathonIsLive) {
      return (
        <Button {...buttonProps} onClick={open} isDisabled={isOpen}>
          <Translate token={"v2.pages.hackathons.details.info.seeIssues"} />
        </Button>
      );
    }

    if (hasRegistered) {
      return (
        <Button {...buttonProps} isDisabled>
          <Translate token={"v2.pages.hackathons.details.info.registered"} />
        </Button>
      );
    }

    if (!isAuthenticated) {
      return (
        <Button
          onClick={
            loginWithRedirect ? () => Auth0ClientAdapter.helpers.handleLoginWithRedirect(loginWithRedirect) : undefined
          }
          {...buttonProps}
        >
          <Translate token={"v2.pages.hackathons.details.info.connectToRegister"} />
        </Button>
      );
    }

    if (!hasTelegram) {
      return (
        <Button onClick={() => modal.setIsOpen(true)} isLoading={isLoading || isPending} {...buttonProps}>
          <Translate token={"v2.pages.hackathons.details.info.register"} />
        </Button>
      );
    }

    return (
      <Button onClick={registerForHackathon} isLoading={isLoading || isPending} {...buttonProps}>
        <Translate token={"v2.pages.hackathons.details.info.register"} />
      </Button>
    );
  }

  return (
    <>
      <Tooltip {...tooltipProps}>{renderButton()}</Tooltip>

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
          <HackathonCardMini title={hackathonTitle} backgroundImage={hackathonBackgroundImage} />

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
