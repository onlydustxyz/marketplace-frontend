import MigrationProviders from "./Providers.tsx";

export default function MigrationLayout({ children }: { children: React.ReactNode }) {
  return <MigrationProviders>{children}</MigrationProviders>;
}
