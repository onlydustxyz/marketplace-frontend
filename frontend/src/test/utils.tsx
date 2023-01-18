import { MemoryRouter } from "react-router-dom";
import { PropsWithChildren } from "react";
import { MockedProvider } from "@apollo/client/testing";
import { AuthProvider } from "src/hooks/useAuth";
import { render, RenderOptions } from "@testing-library/react";
import { RoutePaths } from "src/App";
import { IntlProvider } from "src/hooks/useIntl";
import { TokenSetProvider } from "src/hooks/useTokenSet";
import { SessionProvider } from "src/hooks/useSession";
import { ToasterProvider } from "src/hooks/useToaster/useToaster";
import { Toaster } from "src/components/Toaster";

interface MemoryRouterProviderFactoryProps {
  route?: string;
  mocks?: any;
}

export const MemoryRouterProviderFactory =
  ({ route = RoutePaths.CatchAll, mocks }: MemoryRouterProviderFactoryProps) =>
  ({ children }: PropsWithChildren) =>
    (
      <ToasterProvider>
        <SessionProvider>
          <TokenSetProvider>
            <MockedProvider mocks={mocks} addTypename={false}>
              <MemoryRouter initialEntries={[route]}>
                <AuthProvider>
                  {children}
                  <Toaster />
                </AuthProvider>
              </MemoryRouter>
            </MockedProvider>
          </TokenSetProvider>
        </SessionProvider>
      </ToasterProvider>
    );

export const renderWithIntl = (ui: React.ReactElement, options?: RenderOptions) =>
  render(<IntlProvider>{ui}</IntlProvider>, options);
