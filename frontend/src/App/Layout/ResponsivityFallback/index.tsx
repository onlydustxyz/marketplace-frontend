import { useIntl } from "src/hooks/useIntl";

export default function ResponsivityFallback() {
  const { T } = useIntl();

  return (
    <div className="flex min-h-screen flex-grow flex-col items-center justify-center text-center">
      <div className="mb-8 p-5 text-4xl text-red-400/70">{T("state.notResponsive")}</div>
    </div>
  );
}
