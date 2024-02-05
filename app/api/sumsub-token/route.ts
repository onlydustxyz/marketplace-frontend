import axios from "axios";
import * as crypto from "crypto";
import FormData from "form-data";

const SUMSUB_APP_TOKEN = process.env.SUMSUB_APP_TOKEN ?? "";
const SUMSUB_SECRET_KEY = process.env.SUMSUB_SECRET_KEY ?? "";
const SUMSUB_BASE_URL = "https://api.sumsub.com";

const config = { baseURL: SUMSUB_BASE_URL };

const validLevelNames = ["basic-kyc-level", "basic-kyb-level"];

axios.interceptors.request.use(createSignature, function (error) {
  return Promise.reject(error);
});

// This function creates signature for the request as described here: https://developers.sumsub.com/api-reference/#app-tokens
function createSignature(config) {
  const ts = Math.floor(Date.now() / 1000);
  const signature = crypto.createHmac("sha256", SUMSUB_SECRET_KEY);
  signature.update(ts + config.method.toUpperCase() + config.url);

  if (config.data instanceof FormData) {
    signature.update(config.data.getBuffer());
  } else if (config.data) {
    signature.update(config.data);
  }

  config.headers["X-App-Access-Ts"] = ts;
  config.headers["X-App-Access-Sig"] = signature.digest("hex");

  return config;
}

// https://developers.sumsub.com/api-reference/#access-tokens-for-sdks
function createAccessToken(externalUserId, levelName = "basic-kyc-level", ttlInSecs = 600) {
  const method = "post";
  const url =
    "/resources/accessTokens?userId=" +
    encodeURIComponent(externalUserId) +
    "&ttlInSecs=" +
    ttlInSecs +
    "&levelName=" +
    encodeURIComponent(levelName);

  const headers = {
    Accept: "application/json",
    "X-App-Token": SUMSUB_APP_TOKEN,
  };

  config.method = method;
  config.url = url;
  config.headers = headers;
  config.data = null;

  return config;
}

export async function POST(request: Request) {
  const { externalId, levelName = "basic-kyc-level" } = await request.json();

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
