import UseStackContext from "./useStackContext";

export interface UseControllerProps {
  name: string;
}

const UseController = ({ name }: UseControllerProps) => {
  const {
    stackMethods: { open, close },
  } = UseStackContext();

  const handleOpen = () => {
    open(name);
  };

  const handleClose = () => {
    close(name);
  };

  return { open: handleOpen, close: handleClose };
};

export default UseController;
