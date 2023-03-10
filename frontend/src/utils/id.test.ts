import { pretty } from "./id";

describe("Id", () => {
  it("should be prettified", () => {
    expect(pretty("cb27f580-4ddd-4b69-90e2-00a654107727")).toBe("CB27F");
  });
});
