import { SettingsHeader } from "app/migration/settings/components/settings-header/settings-header";

export default function InvoicesPage() {
  return (
    <div className="flex flex-col gap-6">
      <SettingsHeader title="v2.pages.settings.invoices.title" subtitle="v2.pages.settings.invoices.subtitle" />
    </div>
  );
}
