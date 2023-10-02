import { RetryLink } from "@apollo/client/link/retry";

export default function useRetryLink() {
  return new RetryLink();
}
