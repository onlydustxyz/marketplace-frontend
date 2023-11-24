import UseStackContext from "./useStackContext";

export interface UseControllerProps {
  name: string;
}

const UseController = ({ name }: UseControllerProps) => {
  const {
    stackMethods: { update },
  } = UseStackContext();

  const open = () => {
    update(
      name,
      {
        open: true,
      },
      "open"
    );
  };

  const close = () => {
    update(
      name,
      {
        open: false,
      },
      "close"
    );
  };

  return { open, close };
};

export default UseController;
