import { describe, expect, it } from "vitest";
import { decodeBase64ToString } from "./stringUtils";

const BASE_64_ENCODED_TEST_STRING = "dGVzdC1zdHJpbmc=";
const BASE_64_ENCODED_TEST_STRING_WITH_EMOJI = "dGVzdC1zdHJpbmct8J+Yjg==";
const EXPECTED_DECODED_TEST_STRING = "test-string";
const EXPECTED_DECODED_TEST_STRING_WITH_EMOJI = "test-string-😎";

describe("decode base 64 string", () => {
  it("should be able to decode a simple base 64 string", () => {
    expect(decodeBase64ToString(BASE_64_ENCODED_TEST_STRING)).toEqual(EXPECTED_DECODED_TEST_STRING);
  });

  it("should be able to decode a base 64 string with an emoji", () => {
    expect(decodeBase64ToString(BASE_64_ENCODED_TEST_STRING_WITH_EMOJI)).toEqual(
      EXPECTED_DECODED_TEST_STRING_WITH_EMOJI
    );
  });
});
