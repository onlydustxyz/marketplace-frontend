import { StacksParams } from "../types/Stack";
import useStackContext from "./useStackContext";

export interface UseStackControllerProps {
  name: string;
}

const useStackController = ({ name }: UseStackControllerProps) => {
  const {
    stackMethods: { open, close },
  } = useStackContext();

  const handleOpen = (params?: StacksParams) => {
    open(name, params);
  };

  const handleClose = () => {
    close(name);
  };

  return { open: handleOpen, close: handleClose };
};

export default useStackController;
