import { IntlProvider } from "../../src/hooks/useIntl.tsx";

export default function MigrationLayout({ children }: { children: React.ReactNode }) {
  return <IntlProvider>{children}</IntlProvider>;
}
