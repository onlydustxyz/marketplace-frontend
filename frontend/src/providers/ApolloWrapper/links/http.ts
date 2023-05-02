import { createHttpLink } from "@apollo/client";
import config from "src/config";

export default function useHttpLink() {
  return createHttpLink({
    uri: `${config.HASURA_BASE_URL}/v1/graphql`,
  });
}
