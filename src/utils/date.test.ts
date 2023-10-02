import { formatDate } from "./date";

describe("formatDate", () => {
  it("should format the date", () => {
    expect(formatDate(new Date("2023-03-13T17:20:21.198113"))).toEqual("Mar 13, 2023");
  });
});
