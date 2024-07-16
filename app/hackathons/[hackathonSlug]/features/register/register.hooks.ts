import { zodResolver } from "@hookform/resolvers/zod";
import { UserReactQueryAdapter } from "core/application/react-query-adapter/user";
import { useClientBootstrapContext } from "core/bootstrap/client-bootstrap-context";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { TRegister } from "app/hackathons/[hackathonSlug]/features/register/register.types";

import useMutationAlert from "src/api/useMutationAlert";

// import { usePosthog } from "src/hooks/usePosthog";
import { useIntl } from "hooks/translate/use-translate";

export function useRegister({ hackathonId, hackathonSlug }: TRegister.HookProps) {
  const { T } = useIntl();
  const [isOpen, setIsOpen] = useState(false);
  // const { capture } = usePosthog();

  const {
    clientBootstrap: { authProvider },
  } = useClientBootstrapContext();

  const { mutate: register, ...restMutation } = UserReactQueryAdapter.client.useRegisterToHackathon({
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

  // const { data } = hackathonsApiClient.queries.useGetHackathonBySlug(hackathonSlug);
  // const hasRegistered = data?.me?.hasRegistered;

  useMutationAlert({
    mutation: restMutation,
    success: {
      message: T("v2.pages.hackathons.details.application.confirmationToaster"),
    },
    error: {
      default: true,
    },
  });

  const { control, handleSubmit } = useForm<TRegister.form>({
    resolver: zodResolver(TRegister.validation),
    defaultValues: {
      telegram: "",
    },
  });

  function handleFormSubmit(data: TRegister.form) {
    console.log({ data });
    // TODO @hayden submit

    // register();
    // capture("hackathon_registration", { hackathon_id: hackathonId });
  }

  return {
    authProvider,
    modal: {
      isOpen,
      setIsOpen,
    },
    mutation: restMutation,
    form: {
      control,
      handleSubmit: handleSubmit(handleFormSubmit),
    },
  };
}
