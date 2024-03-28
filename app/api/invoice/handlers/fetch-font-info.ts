import { franc } from "franc";

interface Font {
  src: string;
  fontWeight?: number;
  format?: string;
}
interface FontInfo {
  family: string;
  fonts: Font[];
}

const defaultFont = {
  family: "GT Walsheim",
  fonts: [
    { src: `${process.env.NEXT_PUBLIC_METADATA_ASSETS_S3_BUCKET}/GT-Walsheim-Pro-Thin.ttf`, fontWeight: 100 },
    { src: `${process.env.NEXT_PUBLIC_METADATA_ASSETS_S3_BUCKET}/GT-Walsheim-Pro-Ultra-Light.ttf`, fontWeight: 200 },
    { src: `${process.env.NEXT_PUBLIC_METADATA_ASSETS_S3_BUCKET}/GT-Walsheim-Pro-Light.ttf`, fontWeight: 300 },
    { src: `${process.env.NEXT_PUBLIC_METADATA_ASSETS_S3_BUCKET}/GT-Walsheim-Pro-Regular.ttf`, fontWeight: 400 },
    { src: `${process.env.NEXT_PUBLIC_METADATA_ASSETS_S3_BUCKET}/GT-Walsheim-Pro-Medium.ttf`, fontWeight: 500 },
    { src: `${process.env.NEXT_PUBLIC_METADATA_ASSETS_S3_BUCKET}/GT-Walsheim-Pro-Bold.ttf`, fontWeight: 700 },
    { src: `${process.env.NEXT_PUBLIC_METADATA_ASSETS_S3_BUCKET}/GT-Walsheim-Pro-Ultra-Bold.ttf`, fontWeight: 800 },
    { src: `${process.env.NEXT_PUBLIC_METADATA_ASSETS_S3_BUCKET}/GT-Walsheim-Pro-Black.ttf`, fontWeight: 900 },
  ],
};

async function fetchFontInfo(url: string): Promise<FontInfo> {
  try {
    const response = await fetch(url);
    const cssContent = await response.text();

    const fontFamilyMatch = cssContent.match(/font-family: '(.+?)';/);
    const srcMatch = cssContent.match(/src: url\((.+?)\)/);

    if (fontFamilyMatch && srcMatch) {
      return {
        family: fontFamilyMatch[1],
        fonts: [{ src: srcMatch[1], format: "truetype" }],
      };
    }

    throw new Error("Font information not found");
  } catch (error) {
    console.error("Failed to fetch font info:", error);
    throw error;
  }
}

const urlMapping: { [key: string]: string } = {
  ["cmn"]: "https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap",
  ["hin"]: "https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari&display=swap",
  ["tha"]: "https://fonts.googleapis.com/css2?family=Noto+Sans+Thai&display=swap",
  ["arb"]: "https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic&display=swap",
  ["ell"]: "https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap",
  ["chn"]: "https://fonts.googleapis.com/css2?family=Noto+Sans+SC&display=swap",
  ["rus"]: "https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap",
  ["jpn"]: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap",
  ["grc"]: "https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap",
  ["kor"]: "https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap",
  ["sau"]: "https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic&display=swap",
  ["irn"]: "https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic&display=swap",
  ["egy"]: "https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic&display=swap",
  ["ind"]: "https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari&display=swap",
  ["isr"]: "https://fonts.googleapis.com/css2?family=Noto+Sans+Hebrew&display=swap",
  ["arm"]: "https://fonts.googleapis.com/css2?family=Noto+Sans+Armenian&display=swap",
  ["geo"]: "https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian&display=swap",
  ["ukr"]: "https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap",
  ["srb"]: "https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap",
  ["blr"]: "https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap",
  ["bgr"]: "https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap",
  ["kaz"]: "https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap",
  ["mmr"]: "https://fonts.googleapis.com/css2?family=Noto+Sans+Myanmar&display=swap",
  ["khm"]: "https://fonts.googleapis.com/css2?family=Noto+Sans+Khmer&display=swap",
  ["lao"]: "https://fonts.googleapis.com/css2?family=Noto+Sans+Lao&display=swap",
  ["vnm"]: "https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap",
};

const latinScriptCountries = [
  "arg", // Argentina
  "aus", // Australia
  "aut", // Austria
  "bel", // Belgium
  "bra", // Brazil
  "can", // Canada
  "che", // Switzerland
  "chl", // Chile
  "col", // Colombia
  "cri", // Costa Rica
  "cze", // Czech Republic
  "deu", // Germany
  "dnk", // Denmark
  "esp", // Spain
  "fin", // Finland
  "fra", // France
  "gbr", // United Kingdom
  "grc", // Greece
  "hun", // Hungary
  "irl", // Ireland
  "ita", // Italy
  "mex", // Mexico
  "nld", // Netherlands
  "nor", // Norway
  "nzl", // New Zealand
  "pol", // Poland
  "prt", // Portugal
  "rou", // Romania
  "swe", // Sweden
  "usa", // United States
  "ury", // Uruguay
];

export async function detectLanguageAndGetFontDynamically(text: string): Promise<FontInfo> {
  const languageCode = franc(text);
  console.info("Detected language :", { languageCode, text });

  if (languageCode) {
    if (languageCode === "und" || latinScriptCountries.includes(languageCode)) {
      return defaultFont;
    } else if (Object.keys(urlMapping)?.includes(languageCode)) {
      return await fetchFontInfo(urlMapping[languageCode]);
    }
  }

  return defaultFont;
}
