import { formatDate, parseDateString, parseDateRangeString } from "./date";

describe("formatDate", () => {
  it("should format the date", () => {
    expect(formatDate(new Date("2023-03-13T17:20:21.198113"))).toEqual("Mar 13, 2023");
  });
});

describe("parseDateString", () => {
  it("should return undefined if date is not provided", () => {
    expect(parseDateString()).toBeUndefined();
  });

  it("should return the same date if it is already a Date object", () => {
    const date = new Date("2011-10-05T14:48:00.000Z");
    expect(parseDateString(date)).toEqual(date);
  });

  it("should parse the date string and return a Date object", () => {
    const dateString = "2011-10-05T14:48:00.000Z";
    const expected = new Date(dateString);
    expect(parseDateString(dateString)).toEqual(expected);
  });
});

describe("parseDateRangeString", () => {
  it("should return undefined if dateRange is not provided", () => {
    expect(parseDateRangeString()).toBeUndefined();
  });

  it("should parse the date range string", () => {
    const dateRange = {
      from: "2011-10-05T14:48:00.000Z",
      to: "2011-10-07T14:48:00.000Z",
    };
    const expected = {
      from: new Date(dateRange.from),
      to: new Date(dateRange.to),
    };
    expect(parseDateRangeString(dateRange)).toEqual(expected);
  });

  it("should parse the date range string with missing 'from' or 'to'", () => {
    const dateRange = {
      from: "2011-10-05T14:48:00.000Z",
    };
    const expected = {
      from: new Date(dateRange.from),
      to: undefined,
    };
    expect(parseDateRangeString(dateRange)).toEqual(expected);
  });
});
