import { describe, expect, it } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ToasterProvider } from "src/hooks/useToaster";
import View from "src/_pages/ProjectDetails/View";
import { renderWithIntl } from "src/test/utils";
import { ImpersonationProvider } from "components/features/impersonation/impersonation.provider";

const queryClient = new QueryClient();

describe("Contributors page", () => {
  it("renders Contributors component", async () => {
    renderWithIntl(
      <MemoryRouter>
        <ImpersonationProvider>
          <ToasterProvider>
            <QueryClientProvider client={queryClient}>
              <View />
            </QueryClientProvider>
          </ToasterProvider>
        </ImpersonationProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.findByText("Contributors"));
    });
  });
});
