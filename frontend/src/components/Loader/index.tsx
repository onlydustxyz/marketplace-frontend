import { useIntl } from "src/hooks/useIntl";

const Loader: React.FC = () => {
  const { T } = useIntl();
  return <div className="flex justify-center mt-10 text-2xl">{T("state.loading")}</div>;
};

export default Loader;
