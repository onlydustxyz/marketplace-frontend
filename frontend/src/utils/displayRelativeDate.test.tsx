import displayRelativeDate from "./displayRelativeDate";
import { describe, expect, it, vi } from "vitest";

describe("Display relative data", () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  it("should display a few seconds for now", () => {
    expect(displayRelativeDate(new Date())).toEqual("a few seconds ago");
  });

  it("should display the right number of elapsed days", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2023-01-15"));
    expect(displayRelativeDate(new Date("2023-01-01"))).toEqual("14 days ago");
  });

  it("should display the right number of elapsed months after 1 month", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2023-02-15"));
    expect(displayRelativeDate(new Date("2023-01-01"))).toEqual("a month ago");
  });
});
