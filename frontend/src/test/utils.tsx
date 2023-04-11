import { MemoryRouter, Outlet, Route, Routes } from "react-router-dom";
import { PropsWithChildren } from "react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { AuthProvider } from "src/hooks/useAuth";
import { render, RenderOptions } from "@testing-library/react";
import { IntlProvider } from "src/hooks/useIntl";
import { TokenSetProvider } from "src/hooks/useTokenSet";
import { SessionProvider } from "src/hooks/useSession";
import { ToasterProvider } from "src/hooks/useToaster";
import { Toaster } from "src/components/Toaster";
import { viewportConfig } from "src/config";
import { SuspenseCache } from "@apollo/client";
import { ImpersonationClaimsProvider } from "src/hooks/useImpersonationClaims";

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
      <ToasterProvider>
        <SessionProvider>
          <TokenSetProvider>
            <ImpersonationClaimsProvider>
              <MockedProvider mocks={mocks} addTypename={false} suspenseCache={suspenseCache}>
                <MemoryRouter initialEntries={[route]}>
                  {context ? (
                    <Routes>
                      <Route path="/" element={<Outlet context={context} />}>
                        <Route index element={<AuthProvider>{children}</AuthProvider>} />
                      </Route>
                    </Routes>
                  ) : (
                    <AuthProvider>{children}</AuthProvider>
                  )}
                </MemoryRouter>
              </MockedProvider>
            </ImpersonationClaimsProvider>
          </TokenSetProvider>
        </SessionProvider>
        <Toaster />
      </ToasterProvider>
    );

export const renderWithIntl = (ui: React.ReactElement, options?: RenderOptions) =>
  render(<IntlProvider>{ui}</IntlProvider>, options);

export const responsiveChromatic = {
  chromatic: {
    viewports: [viewportConfig.breakpoints.sm, viewportConfig.breakpoints.lg, viewportConfig.breakpoints.xl],
  },
};
