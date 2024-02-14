import SumsubWebSdk from "@sumsub/websdk-react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { createSumsubToken } from "app/api/sumsub-token/handlers";

import { StackRoute } from "src/App/Stacks/Stacks";
import { TVerifySidePanel } from "src/App/Stacks/VerifySidePanel/VerifySidePanel.types";
import MeApi from "src/api/me";
import { useSubscribeStacks } from "src/libs/react-stack";

import { Typography } from "components/layout/typography/typography";

const config = {
  lang: "en",
  uiConf: {
    customCssStr: `
      html, body {
        font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
      }
    `,
  },
};
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
        <div className="grid gap-1 p-6 text-center">
          <Typography
            variant="title-l"
            className="font-belwe text-greyscale-800"
            translate={{ token: "v2.features.verify.error.title" }}
          />
          <Typography
            variant="body-s"
            className="font-walsheim text-spaceBlue-400"
            translate={{ token: "v2.features.verify.error.description" }}
          />
        </div>
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
        className="w-full px-6 py-12"
      />
    );
  }

  return null;
}
