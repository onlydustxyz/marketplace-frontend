import { StacksParams } from "../types/Stack";
import useStackContext from "./useStackContext";

export interface UseStackControllerProps {
  name: string;
}

/**
 * Custom hook that provides a stack controller for managing the opening and closing of stacks.
 * @param {UseStackControllerProps} options - The options for the stack controller.
 * @returns {Object} - An object containing the open and close functions for the stack controller.
 */
export const useStackController = ({ name }: UseStackControllerProps) => {
  const {
    stackMethods: { open, close },
  } = useStackContext();

  /**
   * Opens a stack with the specified name and optional parameters.
   * @param {StacksParams} params - The optional parameters for the stack.
   */
  const handleOpen = (params?: StacksParams) => {
    open(name, params);
  };

  /**
   * Closes a stack with the specified ID.
   * @param {string} id - The ID of the stack to close.
   */
  const handleClose = (id: string) => {
    close(name, id);
  };

  return { open: handleOpen, close: handleClose };
};

export default useStackController;
