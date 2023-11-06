// const showToaster = useShowToaster();
// showToaster(T("profile.form.success"));
import { useEffect } from "react";
// import useToaster from "api/UseToaster";
import { useShowToaster } from "src/hooks/useToaster";

interface Props {
  mutation?: {
    isError?: boolean;
    isSuccess?: boolean;
  };
  //   mutation?: UseMutationResult;
  error?: {
    message: string;
  };
  success: {
    message: string;
  };
}

/**
 * A component for displaying toasts/alerts based on the state of a mutation.
 *
 * This component is designed to be used in conjunction with React Query's mutation functions.
 * It allows you to display toasts or alerts for success or error states of a mutation.
 *
 * @param {Props} props - The component's props.
 * @param {object} [props.mutation] - An object containing mutation-related information.
 * @param {boolean} [props.mutation.isError] - A flag indicating whether the mutation resulted in an error.
 * @param {boolean} [props.mutation.isSuccess] - A flag indicating whether the mutation was successful.
 * @param {object} [props.error] - An object containing error-related information.
 * @param {string} props.error.message - The error message to display in the toast.
 * @param {object} props.success - An object containing success-related information.
 * @param {string} props.success.message - The success message to display in the toast.
 */
export const UseMutationAlert = ({ mutation, error, success }: Props) => {
  const showToaster = useShowToaster();
  const setToaster = async () => {
    if (mutation?.isError) {
      if (error?.message) {
        showToaster(error.message, { isError: true });
      }
    }
    if (mutation?.isSuccess) {
      if (success?.message) {
        showToaster(success.message);
      }
    }
  };
  useEffect(() => {
    setToaster();
  }, [mutation?.isError, mutation?.isSuccess]);
};

export default UseMutationAlert;
