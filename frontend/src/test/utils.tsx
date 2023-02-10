import { MemoryRouter, Outlet, Route, Routes } from "react-router-dom";
import { PropsWithChildren } from "react";
import { MockedProvider } from "@apollo/client/testing";
import { AuthProvider } from "src/hooks/useAuth";
import { render, RenderOptions } from "@testing-library/react";
import { RoutePaths } from "src/App";
import { IntlProvider } from "src/hooks/useIntl";
import { TokenSetProvider } from "src/hooks/useTokenSet";
import { SessionProvider } from "src/hooks/useSession";
import { ToasterProvider } from "src/hooks/useToaster";
import { Toaster } from "src/components/Toaster";

interface MemoryRouterProviderFactoryProps<M = any, C = any> {
  route?: string;
  mocks?: M;
  context?: C;
}

export const MemoryRouterProviderFactory =
  ({ route = "/", mocks, context }: MemoryRouterProviderFactoryProps) =>
  ({ children }: PropsWithChildren) =>
    (
      <ToasterProvider>
        <SessionProvider>
          <TokenSetProvider>
            <MockedProvider mocks={mocks} addTypename={false}>
              <MemoryRouter initialEntries={[route]}>
                <Routes>
                  <Route path="/" element={<Outlet context={context} />}>
                    <Route index element={<AuthProvider>{children}</AuthProvider>} />
                  </Route>
                </Routes>
              </MemoryRouter>
            </MockedProvider>
          </TokenSetProvider>
        </SessionProvider>
        <Toaster />
      </ToasterProvider>
    );

export const renderWithIntl = (ui: React.ReactElement, options?: RenderOptions) =>
  render(<IntlProvider>{ui}</IntlProvider>, options);
