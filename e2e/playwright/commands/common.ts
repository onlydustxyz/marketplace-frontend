import {
  ApolloClient,
  DefaultContext,
  HttpLink,
  InMemoryCache,
  MutationOptions,
  NormalizedCacheObject,
  OperationVariables,
  QueryOptions,
} from "@apollo/client/core";
import { expect } from "@playwright/test";
import { Kind, OperationDefinitionNode } from "graphql";

export const waitEvents = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
};

export const getEnv = (key: string) => {
  const value = process.env[key];
  if (value !== undefined) {
    return value;
  }
  throw new Error(`Environment variable '${key}' is not defined`);
};

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const retry = async <T>(
  callback: () => Promise<T>,
  test: (value: T) => boolean,
  delay = 1000,
  maxRetries = 60
) => {
  let value: T;
  do {
    await sleep(delay);
    value = await callback();
  } while (!test(value) && maxRetries-- > 0);
  return value;
};

const apolloClientAnonymous = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:8080/v1/graphql",
    fetch,
    credentials: "same-origin",
  }),
  cache: new InMemoryCache(),
});

const apolloClientAdmin = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:8080/v1/graphql",
    fetch,
    headers: {
      "X-Hasura-Admin-Secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET || "",
    },
    credentials: "same-origin",
  }),
  cache: new InMemoryCache(),
});

const apolloClientRegisteredUser = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:8080/v1/graphql",
    fetch,
    headers: {
      "X-Hasura-Role": "registered_user",
    },
    credentials: "same-origin",
  }),
  cache: new InMemoryCache(),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mutateAsAnonymous = async <TData = any, TVariables = OperationVariables, TContext = DefaultContext>(
  options: MutationOptions<TData, TVariables, TContext>,
  expectError = false
) => mutateAs(apolloClientAnonymous, options, expectError);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mutateAsAdmin = async <TData = any, TVariables = OperationVariables, TContext = DefaultContext>(
  options: MutationOptions<TData, TVariables, TContext>,
  expectError = false
) => mutateAs(apolloClientAdmin, options, expectError);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mutateAsRegisteredUser = async <TData = any, TVariables = OperationVariables, TContext = DefaultContext>(
  accessToken: string,
  options: MutationOptions<TData, TVariables, TContext>,
  expectError = false
) => {
  return mutateAs(
    apolloClientRegisteredUser,
    {
      mutation: options.mutation,
      variables: options.variables,
      context: { ...options.context, headers: { Authorization: `Bearer ${accessToken}` } },
    },
    expectError
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mutateAs = async <TData = any, TVariables = OperationVariables, TEContext = DefaultContext>(
  client: ApolloClient<NormalizedCacheObject>,
  options: MutationOptions<TData, TVariables, TEContext>,
  expectError: boolean
) => {
  try {
    const response = await client.mutate({
      mutation: options.mutation,
      variables: options.variables,
      context: options.context,
      fetchPolicy: "network-only",
    });
    if (expectError) {
      expect(response.errors).toBeDefined();
    } else {
      expect(response.errors).toBeUndefined();
    }
    return response;
  } catch (e) {
    console.log(
      "Mutation error:",
      JSON.stringify(
        options.mutation.definitions
          .filter(def => def.kind === Kind.OPERATION_DEFINITION)
          .map(def => (def as OperationDefinitionNode).name?.value)
      ),
      options.variables
    );
    throw e;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const queryAsAnonymous = async <T = any, TVariables = OperationVariables>(
  options: QueryOptions<TVariables, T>,
  expectError = false
) => queryAs(apolloClientAnonymous, options, expectError);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const queryAsAdmin = async <T = any, TVariables = OperationVariables>(
  options: QueryOptions<TVariables, T>,
  expectError = false
) => queryAs(apolloClientAdmin, options, expectError);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const queryAsRegisteredUser = async <T = any, TVariables = OperationVariables>(
  accessToken: string,
  options: QueryOptions<TVariables, T>,
  expectError = false
) => {
  return queryAs(
    apolloClientRegisteredUser,
    {
      query: options.query,
      variables: options.variables,
      context: { ...options.context, headers: { Authorization: `Bearer ${accessToken}` } },
    },
    expectError
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const queryAs = async <T = any, TVariables = OperationVariables>(
  client: ApolloClient<NormalizedCacheObject>,
  options: QueryOptions<TVariables, T>,
  expectError: boolean
) => {
  try {
    const response = await client.query({
      query: options.query,
      variables: options.variables,
      context: options.context,
      fetchPolicy: "network-only",
    });
    if (expectError) {
      expect(response.errors).toBeDefined();
    } else {
      expect(response.errors).toBeUndefined();
    }
    return response;
  } catch (e) {
    console.log(
      "Query error:",
      JSON.stringify(
        options.query.definitions
          .filter(def => def.kind === Kind.OPERATION_DEFINITION)
          .map(def => (def as OperationDefinitionNode).name?.value)
      ),
      options.variables
    );
    throw e;
  }
};

export const fetchAsAdmin = async <T>(path: string, method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE", args: T) =>
  fetch(`http://127.0.0.1:8000/api/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "playwright",
      "Api-Key": getEnv("BACKEND_GRAPHQL_API_KEY"),
    },
    body: JSON.stringify(args),
  })
    .then(response => response.json())
    .catch(err => console.error(err));
