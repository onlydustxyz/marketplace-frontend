import { MemoryRouter } from "react-router-dom";
import { PropsWithChildren } from "react";
import { MockedProvider } from "@apollo/client/testing";
import { AuthProvider } from "src/hooks/useAuth";
import { render, RenderOptions } from "@testing-library/react";
import { RoutePaths } from "src/App";
import { IntlProvider } from "src/hooks/useIntl";

interface MemoryRouterProviderFactoryProps {
  route?: string;
  mocks?: any;
}

export const MemoryRouterProviderFactory =
  ({ route = RoutePaths.CatchAll, mocks }: MemoryRouterProviderFactoryProps) =>
  ({ children }: PropsWithChildren) =>
    (
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={[route]}>
          <AuthProvider>{children}</AuthProvider>
        </MemoryRouter>
      </MockedProvider>
    );

interface CheckLocalStorageValueProps<T> {
  key: string;
  expectedValue?: T;
  expectNotToExist?: boolean;
  expectedIncludedObject?: Record<string, unknown>;
}

export function checkLocalStorageValue<T>({
  key,
  expectedValue,
  expectedIncludedObject,
  expectNotToExist,
}: CheckLocalStorageValueProps<T>) {
  const localStorageValue = window.localStorage.getItem(key);
  if (expectNotToExist) {
    expect(localStorageValue).toBeNull();
  } else if (expectedIncludedObject) {
    const parsedObject = JSON.parse(localStorageValue ?? "");
    expect(parsedObject).toMatchObject(expectedIncludedObject);
  } else {
    expect(localStorageValue).toEqual(expectedValue);
  }
}

export const renderWithIntl = (ui: React.ReactElement, options?: RenderOptions) =>
  render(<IntlProvider>{ui}</IntlProvider>, options);
