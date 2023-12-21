import { FC } from "react";

const ErrorTrigger: FC = () => {
  throw new Error("This is an error that was triggered by navigating to /error");
};

export default ErrorTrigger;
