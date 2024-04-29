import { useRouter } from "next/navigation";

import ErrorFallback from "src/ErrorFallback";
import Button from "src/components/Button";

import { NEXT_ROUTER } from "constants/router";

import { useIntl } from "hooks/translate/use-translate";

import { FetchError } from "./query.type";
import { HttpStatusStrings } from "./query.utils";

interface Props {
  queries: {
    isError?: boolean;
    error?: FetchError;
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

/**
 * Custom hook for handling query errors with specific behaviors based on error types.
 *
 * This hook is designed to handle errors for React Query queries. It checks if an error occurred,
 * and based on the error type, it returns different React elements to handle these errors.
 * This includes rendering a custom error component, a navigation redirect, or a default error fallback.
 *
 * @param {Props} props - The hook's props.
 * @param {object} props.queries - An object containing query-related information.
 * @param {string} [props.errorLabel] - A label for the retry button if a custom error component is not provided.
 * @param {function} [props.errorComponent] - An optional custom error component for rendering the error state.
 *
 * @returns {React.ReactElement | null} - A React element to render based on the error type, or null if no error.
 */
function useQueriesErrorBehavior({ queries }: Props): React.ReactElement | null {
  const router = useRouter();
  if (queries.isError) {
    const isErrorTyped = queries.error instanceof Error && "errorType" in queries.error;
    const typedError = isErrorTyped ? (queries.error as FetchError) : null;

    // Navigate to NotFound page for HttpStatusStrings.NOT_FOUND
    if (
      typedError?.errorType === HttpStatusStrings.NOT_FOUND ||
      typedError?.errorType === HttpStatusStrings.FORBIDDEN
    ) {
      router.push(NEXT_ROUTER.notFound);
      return null;
    } else if (typedError) {
      // Return a generic ErrorFallback for other types of errors
      return <ErrorFallback />;
    }

    return <ErrorFallback />;
  }

  return null;
}

export { UseQueriesError, useQueriesErrorBehavior };
