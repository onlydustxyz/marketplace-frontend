import { useIntl } from "src/hooks/useIntl";

export default function ResponsivityFallback() {
  const { T } = useIntl();

  return (
    <div className="min-h-screen flex-grow flex flex-col items-center justify-center text-center">
      <div className="p-5 mb-8 text-4xl text-red-400/70">{T("state.notResponsive")}</div>
    </div>
  );
}
