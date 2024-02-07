import SumsubWebSdk from "@sumsub/websdk-react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { createSumsubToken } from "app/api/sumsub-token/handlers";

import { StackRoute } from "src/App/Stacks/Stacks";
import { config } from "src/App/Stacks/VerifySidePanel/VerifySidePanel.config";
import { TVerifySidePanel } from "src/App/Stacks/VerifySidePanel/VerifySidePanel.types";
import MeApi from "src/api/me";
import { IMAGES } from "src/assets/img";
import { useSubscribeStacks } from "src/libs/react-stack";

import { EmptyState } from "components/layout/placeholders/empty-state";

const options = {};

export function VerifySidePanel({ externalId, levelName }: TVerifySidePanel.Props) {
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const { open } = useSubscribeStacks(StackRoute.Verify);
  const [isPanelHasOpenedState, setIsPanelHasOpenedState] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    handleTokenCreation();
  }, []);

  async function handleTokenCreation() {
    try {
      const { token } = await createSumsubToken({ externalId, levelName });
      setToken(token);
    } catch (error) {
      handleError();
      console.error(error);
    }
  }

  useEffect(() => {
    if (open && !isPanelHasOpenedState) {
      setIsPanelHasOpenedState(true);
    } else if (!open && isPanelHasOpenedState) {
      queryClient.invalidateQueries({ queryKey: MeApi.billing.tags.anyProfile, exact: false });
      setIsPanelHasOpenedState(false);
    }
  }, [open, isPanelHasOpenedState]);

  function handleExpiration() {
    setToken("");
    handleTokenCreation();
  }

  function handleError() {
    setError(true);
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <EmptyState
          illustrationSrc={IMAGES.icons.emptyState}
          title={{ token: "v2.features.verify.error.title" }}
          description={{ token: "v2.features.verify.error.description" }}
        />
      </div>
    );
  }

  if (token) {
    return (
      <SumsubWebSdk
        accessToken={token}
        expirationHandler={handleExpiration}
        config={config}
        options={options}
        onError={handleError}
        className="w-full p-4"
      />
    );
  }

  return null;
}
