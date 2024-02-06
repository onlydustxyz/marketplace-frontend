import axios, { type InternalAxiosRequestConfig } from "axios";
import * as crypto from "crypto";

import { SUMSUB_CONST } from "app/api/sumsub-token/constants";
import { TSumsub } from "app/api/sumsub-token/types";

const config: TSumsub.Config = { baseURL: SUMSUB_CONST.BASE_URL };

const validLevelNames = [SUMSUB_CONST.KYC_LEVEL, SUMSUB_CONST.KYB_LEVEL];

axios.interceptors.request.use(createSignature, function (error) {
  return Promise.reject(error);
});

// https://developers.sumsub.com/api-reference/#app-tokens
function createSignature(config: InternalAxiosRequestConfig<TSumsub.Config>) {
  const ts = String(Math.floor(Date.now() / 1000));
  const method = config.method?.toUpperCase() ?? "";

  const signature = crypto.createHmac("sha256", SUMSUB_CONST.SECRET_KEY);
  signature.update(ts + method + config.url);

  if (config.headers) {
    config.headers["X-App-Access-Ts"] = ts;
    config.headers["X-App-Access-Sig"] = signature.digest("hex");
  }

  return config;
}

// https://developers.sumsub.com/api-reference/#access-tokens-for-sdks
function createAccessToken(externalId: string, levelName: TSumsub.LevelName, ttlInSecs = 600) {
  config.method = "post";

  config.url =
    "/resources/accessTokens?userId=" +
    encodeURIComponent(externalId) +
    "&ttlInSecs=" +
    ttlInSecs +
    "&levelName=" +
    encodeURIComponent(levelName);

  config.headers = {
    Accept: "application/json",
    "X-App-Token": SUMSUB_CONST.APP_TOKEN,
  };

  return config;
}

export async function POST(request: Request) {
  const { externalId, levelName = SUMSUB_CONST.DEFAULT_LEVEL } = await request.json();

  if (!externalId) {
    return new Response("externalId is required.", {
      status: 400,
    });
  }

  if (!validLevelNames.includes(levelName)) {
    return new Response("Invalid levelName.", {
      status: 400,
    });
  }

  const response = await axios<{ token: string; userId: string }>(createAccessToken(externalId, levelName, 1200))
    .then(function (response) {
      if (response.status !== 200) {
        throw new Error("Failed to fetch access token.");
      }

      return response;
    })
    .catch(function (error) {
      console.error("Error:\n", error.response.data);
    });

  const json = JSON.stringify(response?.data);

  if (!json) {
    return new Response("Failed to parse access token.", {
      status: 500,
    });
  }

  return new Response(json);
}
