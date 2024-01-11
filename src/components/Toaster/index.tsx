import { useToaster } from "src/hooks/useToaster";
import View from "./View";

export const Toaster = () => {
  const { message, visible, isError, setVisible } = useToaster();

  return <View {...{ message, visible, isError, setVisible }} />;
};
