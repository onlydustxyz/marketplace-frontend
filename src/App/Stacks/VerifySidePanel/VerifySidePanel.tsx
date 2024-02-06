import SumsubWebSdk from "@sumsub/websdk-react";
import { useEffect, useState } from "react";

import { createSumsubToken } from "app/api/sumsub-token/handlers";

import { TVerifySidePanel } from "src/App/Stacks/VerifySidePanel/VerifySidePanel.types";
import { IMAGES } from "src/assets/img";

import { EmptyState } from "components/layout/placeholders/empty-state";

const config = {
  uiConf: {
    customCssStr: `
      :root {
        --greyscale-900: #181818;
        --greyscale-800: #313030;
        --greyscale-700: #494847;
        --greyscale-600: #61605F;
        --greyscale-200: #C2C0BE;
        --greyscale-100: #DBD8D6;

        --spacePurple-400 : #BE33FF;
        --spacePurple-500 : #AE00FF;

        --white-color: var(--greyscale-800);
        --primary-color: var(--greyscale-100);
        --red-color: #E84E4D;
        --dark-red-color: #360000;
        --blue-color: #333AC9;
        --dark-blue-color: var(--greyscale-100);
        --orange-color: #FF9000;
        --gray-color: #cacce3;
        --disabled-gray-color: #c9d0d6;
        --light-grey-color: #f1f3f9;
        --extra-light-grey-color: #d1d6e1;
        --extra-grey-color: #7f8bb2;
        --success-color: var(--spacePurple-400);
        --section-shadow-color: rgba(0,0,0,0.5);
        --lang-selector-shadow-color: rgba(0,0,0,0.3);
        --bullet-shadow-color: #dedede;
        --step-mobile: #d9deeb;
        --facebook-color: #3b5998;
        --google-color: #dd4b39;
        --textarea-background-color: rgba(0,0,0,0.02);
        --continue-gray: #d9dfe2;
        --continue-vaiolet: #4b55a5;
        --green-color: #6ace8a;
        --additional-green-color: #4fa7a3
      }

      html, body {
        background-color: var(--greyscale-900);
        font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
      }

      a {
        color: var(--spacePurple-400);
      }

      a:hover {
        border-bottom-color: var(--spacePurple-400);
      }

      .list,
      .country-selector .list {
        background-color: var(--greyscale-700) !important;
      }

      .list li.active,
      .list li:hover,
      .country-selector .list li.active,
      .country-selector .list li:hover {
        background-color: var(--greyscale-800) !important;
      }

      .country-selector .show-hide .ss-icon {
        color: var(--spacePurple-400);
      }

      button.submit, button[type=submit],
      button.submit:active:not(:disabled),
      button.submit:hover:not(:disabled):not(.disabled):not(:active),
      button[type=submit]:active:not(:disabled),
      button[type=submit]:hover:not(:disabled):not(.disabled):not(:active) {
        background-image: none;
      }

      .upload-item,
      .upload-payment-item .upload-item,
      .mobile-button {
        box-shadow: 0px 8px 64px 0px rgba(0, 0, 0, 0.32);
      }

      .mobile-button:hover {
        background-color: var(--white-color);
      }

      .line-form .line-form-item>span {
        color: var(--success-color);
        font-weight: 600;
      }

      .status-text {
        color: var(--greyscale-100) !important;
      }

      .subitem-text {
        color: var(--greyscale-200) !important;
      }

      input,
      select,
      textarea {
        border-bottom-color: var(--greyscale-200);
      }

      input::placeholder,
      textarea::placeholder {
        color: var(--greyscale-200);
      }

      .sub-steps .sub-step {
        border-color: var(--greyscale-100);
      }

      .phone-input>input {
        box-shadow: none !important
      }

      .identity-item {
        background-color: transparent
      }

      .identity-item-button,
      .identity-item-button.white {
        background-color: var(--light-grey-color);
        color: var(--white-color);
      }

      button.identity-item-text-button {
        color: var(--spacePurple-400);
        background-color: transparent;
      }

      button.identity-item-text-button.isActive,
      button.identity-item-text-button:hover:not(:disabled):not(.disabled):not(:active) {
        color: var(--spacePurple-500);
      }

      button.identity-item-text-button.isActive .identity-item-text-button-icon,
      button.identity-item-text-button:hover .identity-item-text-button-icon {
        fill: currentColor
      }

      .payment-method-data {
        background-color: transparent;
      }
   `,
  },
};
const options = {};

export function VerifySidePanel({ externalId, levelName }: TVerifySidePanel.Props) {
  const [token, setToken] = useState("");
  const [error, setError] = useState(true);

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
        <EmptyState
          illustrationSrc={IMAGES.icons.emptyState}
          title={{ token: "v2.pages.settings.billing.sumsub.error.title" }}
          description={{ token: "v2.pages.settings.billing.sumsub.error.description" }}
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
