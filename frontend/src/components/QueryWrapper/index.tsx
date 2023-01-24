import { QueryResult } from "@apollo/client";
import LoaderFallback from "src/components/Loader";
import ErrorFallback from "../ErrorFallback";

interface PropsType<T> extends React.PropsWithChildren {
  query: QueryResult<T>;
}

const QueryWrapper = <T,>({ query, children }: PropsType<T>) => {
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
