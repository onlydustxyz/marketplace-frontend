import { QueryResult } from "@apollo/client";
import Loader from "src/components/Loader";
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
      {loading && <Loader />}
      {data && children}
      {error && <ErrorFallback />}
    </>
  );
};

export default QueryWrapper;
