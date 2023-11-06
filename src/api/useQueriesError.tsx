import Button from "src/components/Button";

interface Props {
  queries: {
    isError?: boolean;
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
export const UseQueriesError = ({ queries, errorComponent, errorLabel }: Props) => {
  if (!queries?.isError) return null;

  if (errorComponent) return errorComponent({ refetch: queries.refetch });

  return <Button onClick={queries.refetch}>{errorLabel || "Retry"}</Button>;
};

export default UseQueriesError;
