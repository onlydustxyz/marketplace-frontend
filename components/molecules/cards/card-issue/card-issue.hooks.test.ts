import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useCardIssue } from "components/molecules/cards/card-issue/card-issue.hooks";

describe("useCardIssue", () => {
  /********** useGithubLinkComponent **********/
  describe("useGithubLinkComponent", () => {
    it("should return githubLinkComponent when props are defined", () => {
      const { result } = renderHook(() =>
        useCardIssue.useGithubLinkComponent({ githubLink: { href: "https://github.com", label: "GithubLink" } })
      );

      const props = result.current?.props;

      expect(props.children).toEqual("GithubLink");
      expect(props.htmlProps.href).toEqual("https://github.com");
    });

    it("should return null when props are not defined", () => {
      const { result } = renderHook(() => useCardIssue.useGithubLinkComponent({ githubLink: undefined }));

      expect(result.current).toEqual(null);
    });
  });

  /********** useAssigneeComponent **********/
  describe("useAssigneeComponent", () => {
    it("should return a button link when href is defined", () => {
      const { result } = renderHook(() =>
        useCardIssue.useAssigneeComponent({ assignee: { name: "githubLogin", avatar: {}, href: "https://github.com" } })
      );

      const props = result.current?.props;

      expect(props.children).toEqual("githubLogin");
      expect(props.htmlProps.href).toEqual("https://github.com");
    });

    it("should return a button button when onClick is defined", () => {
      const { result } = renderHook(() =>
        useCardIssue.useAssigneeComponent({ assignee: { name: "githubLogin", avatar: {}, onClick: () => null } })
      );

      const props = result.current?.props;

      expect(props.children).toEqual("githubLogin");
      expect(props.onClick).toBeDefined();
    });
  });

  /********** usePrimaryActionComponent **********/
  describe("usePrimaryActionComponent", () => {
    it("Should return applyAction when state is open", () => {
      const { result } = renderHook(() =>
        useCardIssue.usePrimaryActionComponent({
          state: "open",
          applyActionProps: { children: "applyAction label" },
          viewActionProps: { children: "viewAction label" },
        })
      );

      const props = result.current?.props;

      expect(props.children).toEqual("applyAction label");
    });
    it("Should return viewAction when state is applied", () => {
      const { result } = renderHook(() =>
        useCardIssue.usePrimaryActionComponent({
          state: "applied",
          applyActionProps: { children: "applyAction label" },
          viewActionProps: { children: "viewAction label" },
        })
      );

      const props = result.current?.props;

      expect(props.children).toEqual("viewAction label");
    });
    it("Should return viewAction when state is open", () => {
      const { result } = renderHook(() =>
        useCardIssue.usePrimaryActionComponent({
          state: "assigned",
          applyActionProps: { children: "applyAction label" },
          viewActionProps: { children: "viewAction label" },
        })
      );

      expect(result.current).toEqual(null);
    });
  });
});
