import { getRewardTimeWorked } from "./getRewardTimeWorked";

describe("getRewardTimeWorked", () => {
  it("should return time as hours", () => {
    expect(getRewardTimeWorked(7)).toStrictEqual({ time: 7, unit: "hours" });
  });

  it("should return the time as days", () => {
    expect(getRewardTimeWorked(8)).toStrictEqual({ time: 1, unit: "days" });
  });

  it("should return one and a half days", () => {
    expect(getRewardTimeWorked(12)).toStrictEqual({ time: 1.5, unit: "days" });
  });
});
