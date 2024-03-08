import { franc } from "franc";

interface FontInfo {
  url: string;
  name: string;
}

async function fetchFontInfo(url: string): Promise<FontInfo> {
  try {
    const response = await fetch(url);
    const cssContent = await response.text();

    const fontFamilyMatch = cssContent.match(/font-family: '(.+?)';/);
    const srcMatch = cssContent.match(/src: url\((.+?)\)/);

    if (fontFamilyMatch && srcMatch) {
      return {
        name: fontFamilyMatch[1],
        url: srcMatch[1],
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
  ["default"]: "https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap",
};

export async function detectLanguageAndGetFontDynamically(text: string): Promise<FontInfo> {
  const languageCode = franc(text);

  const fontCssUrl = urlMapping[languageCode] || urlMapping["default"];

  return await fetchFontInfo(fontCssUrl);
}
