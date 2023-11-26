import UseStackContext from "./useStackContext";

export interface UseControllerProps {
  name: string;
}

const UseController = ({ name }: UseControllerProps) => {
  const {
    stackMethods: { open, close },
  } = UseStackContext();

  const handleOpen = (params?: any) => {
    open(name, params);
  };

  const handleClose = () => {
    close(name);
  };

  return { open: handleOpen, close: handleClose };
};

export default UseController;
