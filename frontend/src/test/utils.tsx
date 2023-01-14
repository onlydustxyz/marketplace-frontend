import { MemoryRouter } from "react-router-dom";
import { PropsWithChildren } from "react";
import { MockedProvider } from "@apollo/client/testing";
import { AuthProvider } from "src/hooks/useAuth";
import { render, RenderOptions } from "@testing-library/react";
import { RoutePaths } from "src/App";
import { IntlProvider } from "src/hooks/useIntl";
import { TokenSetProvider } from "src/hooks/useTokenSet";
import { SessionProvider } from "src/hooks/useSession";

interface MemoryRouterProviderFactoryProps {
  route?: string;
  mocks?: any;
}

export const MemoryRouterProviderFactory =
  ({ route = RoutePaths.CatchAll, mocks }: MemoryRouterProviderFactoryProps) =>
  ({ children }: PropsWithChildren) =>
    (
      <SessionProvider>
        <TokenSetProvider>
          <MockedProvider mocks={mocks} addTypename={false}>
            <MemoryRouter initialEntries={[route]}>
              <AuthProvider>{children}</AuthProvider>
            </MemoryRouter>
          </MockedProvider>
        </TokenSetProvider>
      </SessionProvider>
    );

export const renderWithIntl = (ui: React.ReactElement, options?: RenderOptions) =>
  render(<IntlProvider>{ui}</IntlProvider>, options);
