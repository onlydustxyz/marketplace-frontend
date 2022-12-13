import { QueryResult } from "@apollo/client";
import LoaderFallback from "src/components/LoaderFallback";
import ErrorFallback from "../ErrorFallback";

interface PropsType extends React.PropsWithChildren {
  query: QueryResult;
}

const QueryWrapper: React.FC<React.PropsWithChildren<PropsType>> = ({ query, children }) => {
  const { loading, data, error } = query;
  if (error) {
    console.error(error);
  }
  return (
    <>
      {loading && <LoaderFallback />}
      {data && children}
      {error && <ErrorFallback />}
    </>
  );
};

export default QueryWrapper;
