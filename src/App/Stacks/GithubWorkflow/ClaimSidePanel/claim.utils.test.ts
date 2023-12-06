import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import { ClaimUtils } from "./claim.utils";
import { UseGithubOrganizationsResponse } from "src/api/me/queries";

describe("ClaimUtils", () => {
  describe("canDisplay", () => {
    it("should return true if project is provided and has no leaders or invited leaders", () => {
      const result = ClaimUtils.canDisplay({
        project: {
          leaders: [],
          invitedLeaders: [],
        } as unknown as UseGetProjectBySlugResponse,
      });
      expect(result).toBe(true);
    });

    it("should return false if project has leaders or invited leaders", () => {
      const result = ClaimUtils.canDisplay({
        project: {
          leaders: [{ githubUserId: 1, id: "1", login: "login1" }],
          invitedLeaders: [{ githubUserId: 2, id: "2", login: "login2" }],
        } as unknown as UseGetProjectBySlugResponse,
      });
      expect(result).toBe(false);
    });

    it("should return false if project is not provided", () => {
      const result = ClaimUtils.canDisplay({});
      expect(result).toBe(false);
    });
  });

  describe("canSubmit", () => {
    it("should return false if canDisplay is false", () => {
      const result = ClaimUtils.canSubmit({});
      expect(result).toBe(false);
    });

    it("should return false if not all organizations are installed", () => {
      const result = ClaimUtils.canSubmit({
        project: {
          leaders: [],
          invitedLeaders: [],
          organizations: [
            { githubUserId: 1, installed: true },
            { githubUserId: 2, installed: false },
          ],
        } as unknown as UseGetProjectBySlugResponse,
        organizations: [{ githubUserId: 1, installed: true }] as unknown as UseGithubOrganizationsResponse[],
      });
      expect(result).toBe(false);
    });

    it("should return true if all organizations are installed", () => {
      const result = ClaimUtils.canSubmit({
        project: {
          leaders: [],
          invitedLeaders: [],
          organizations: [
            { githubUserId: 1, installed: true },
            { githubUserId: 2, installed: true },
          ],
        } as unknown as UseGetProjectBySlugResponse,
        organizations: [
          { githubUserId: 1, installed: true },
          { githubUserId: 2, installed: true },
        ] as unknown as UseGithubOrganizationsResponse[],
      });
      expect(result).toBe(true);
    });
  });
});
