import Button from "src/components/Button";
import { useIntl } from "src/hooks/useIntl";
import { FetchError } from "./query.type";
import { Navigate } from "react-router-dom";
import { RoutePaths } from "src/App";
import { HttpStatusStrings } from "./query.utils";
import ErrorFallback from "src/ErrorFallback";

interface Props {
  queries: {
    isError?: boolean;
    error?: Error | FetchError;
    refetch: () => void;
  };
  errorLabel?: string;
  errorComponent?: (props: { refetch?: () => void }) => React.ReactElement;
}

/**
 * A component for handling errors in React Query queries.
 *
 * This component is designed to be used in conjunction with React Query to handle
 * error states in asynchronous queries. It allows you to display an error message
 * or trigger a refetch of the query when an error occurs.
 *
 * @param {Props} props - The component's props.
 * @param {object} props.queries - An object containing query-related information.
 * @param {boolean} [props.queries.isError] - A flag indicating whether an error has occurred.
 * @param {function} props.queries.refetch - A function to manually trigger a query refetch.
 * @param {string} [props.errorLabel] - A label to display on the error button (default: "Retry").
 * @param {function} [props.errorComponent] - An optional custom error component that
 *   receives a `refetch` function prop to allow custom error rendering.
 *
 * @returns {React.ReactElement | null} - The rendered component or null if there's no error.
 */
const UseQueriesError = ({ queries, errorComponent, errorLabel }: Props) => {
  const { T } = useIntl();

  if (!queries?.isError) return null;

  if (errorComponent) return errorComponent({ refetch: queries.refetch });

  return <Button onClick={queries.refetch}>{errorLabel || T("common.retry")}</Button>;
};

function useQueriesErrorBehavior({ queries, errorLabel, errorComponent }: Props): React.ReactElement | null {
  const { T } = useIntl();

  if (queries.isError) {
    const isErrorTyped = queries.error instanceof Error && "errorType" in queries.error;
    const typedError = isErrorTyped ? (queries.error as FetchError) : null;

    if (typedError?.errorType === HttpStatusStrings.NOT_FOUND) {
      return <Navigate to={RoutePaths.NotFound} />;
    } else if (typedError) {
      return <ErrorFallback />;
    }

    if (errorComponent) {
      return errorComponent({ refetch: queries.refetch });
    }
    return <Button onClick={queries.refetch}>{errorLabel || T("common.retry")}</Button>;
  }

  return null;
}

export { UseQueriesError, useQueriesErrorBehavior };
