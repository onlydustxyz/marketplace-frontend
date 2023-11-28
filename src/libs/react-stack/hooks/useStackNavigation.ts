import UseStackContext from "./useStackContext";

export interface UseControllerProps {
  name: string;
}

const UseStackNavigation = () => {
  const {
    stackMethods: { open, close },
  } = UseStackContext();

  return <P extends object>(name: string, params: P) => {
    open(name, params);
  };
};

export default UseStackNavigation;
