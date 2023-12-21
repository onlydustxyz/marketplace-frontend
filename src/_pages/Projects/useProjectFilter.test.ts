import { renderHook } from "@testing-library/react";
import { Ownership, ProjectFilterProvider, useProjectFilter } from "./useProjectFilter";

const render = () => renderHook(() => useProjectFilter(), { wrapper: ProjectFilterProvider });

describe("useProjectFilter", () => {
  it("should provide default filters", () => {
    const { result } = render();
    expect(result.current.projectFilter.ownership).toEqual(Ownership.All);
  });
});
