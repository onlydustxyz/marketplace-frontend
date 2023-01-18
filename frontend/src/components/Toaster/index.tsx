import { useToaster } from "src/hooks/useToaster/useToaster";
import View from "./View";

type Props = {
  className?: string;
};

export const Toaster = ({ className }: Props) => {
  const { message, isError } = useToaster();

  return <View {...{ message, isError, className }} />;
};
