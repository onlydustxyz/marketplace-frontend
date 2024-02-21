import SumsubWebSdk from "@sumsub/websdk-react";
import { useEffect, useState } from "react";

import { createSumsubToken } from "app/api/sumsub-token/handlers";

import { TVerifySidePanel } from "src/App/Stacks/VerifySidePanel/VerifySidePanel.types";

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
