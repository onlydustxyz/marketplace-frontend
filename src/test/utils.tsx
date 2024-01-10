import { MemoryRouter, Outlet, Route, Routes } from "react-router-dom";
import { PropsWithChildren, Suspense } from "react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { render, RenderOptions } from "@testing-library/react";
import { IntlProvider } from "src/hooks/useIntl";
import { TokenSetProvider } from "src/hooks/useTokenSet";
import { ToasterProvider } from "src/hooks/useToaster";
import { Toaster } from "src/components/Toaster";
import { viewportConfig } from "src/config";
import { SuspenseCache } from "@apollo/client";
import { ImpersonationClaimsProvider } from "src/hooks/useImpersonationClaims";
import { SidePanelStackProvider } from "src/hooks/useSidePanelStack";
import { SidePanelProvider } from "src/hooks/useSidePanel";
import { StackProvider } from "src/libs/react-stack";

interface MemoryRouterProviderFactoryProps {
  route?: string;
  mocks?: ReadonlyArray<MockedResponse>;
  context?: unknown;
}

const suspenseCache = new SuspenseCache();

export const MemoryRouterProviderFactory =
  ({ route = "/", mocks, context }: MemoryRouterProviderFactoryProps) =>
  // eslint-disable-next-line react/display-name
  ({ children }: PropsWithChildren) =>
    (
      <Suspense>
        <ToasterProvider>
          <TokenSetProvider>
            <ImpersonationClaimsProvider>
              <MockedProvider
                mocks={mocks}
                addTypename={false}
                suspenseCache={suspenseCache}
                defaultOptions={{
                  query: { fetchPolicy: "no-cache" },
                  watchQuery: { fetchPolicy: "no-cache" },
                }}
              >
                <MemoryRouter initialEntries={[route]}>
                  <SidePanelStackProvider>
                    <SidePanelProvider>
                      {context ? (
                        <Routes>
                          <Route path="/" element={<Outlet context={context} />}>
                            <Route index element={<StackProvider>{children}</StackProvider>} />
                          </Route>
                        </Routes>
                      ) : (
                        <StackProvider>{children}</StackProvider>
                      )}
                    </SidePanelProvider>
                  </SidePanelStackProvider>
                </MemoryRouter>
              </MockedProvider>
            </ImpersonationClaimsProvider>
          </TokenSetProvider>
          <Toaster />
        </ToasterProvider>
      </Suspense>
    );

export const renderWithIntl = (ui: React.ReactElement, options?: RenderOptions) =>
  render(<IntlProvider>{ui}</IntlProvider>, options);

export const responsiveChromatic = {
  chromatic: {
    viewports: [viewportConfig.breakpoints.sm, viewportConfig.breakpoints.lg, viewportConfig.breakpoints.xl],
  },
};
