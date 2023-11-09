import SampleApi from ".";
import UseMutationAlert from "src/api/useMutationAlert";
import UseQueriesError from "src/api/useQueriesError";

export const Test = () => {
  const { data, ...query } = SampleApi.queries.useProjectSampleByIdQuery({
    params: { rewardId: "123", projectId: "123" },
  });
  const { mutate, ...rest } = SampleApi.mutations.useCreateProjectRewardMutation({
    params: { projectId: "123" },
    options: {
      onSuccess: async () => {
        // we can use the client directly in the callback if needed ( ex : client.invalidateQueries({ queryKey: ["GetUser"] }) )
        // make something on the result in the callback ( ex : console.log(result)))
      },
    },
  });

  UseMutationAlert({ mutation: rest, success: { message: "sucess" }, error: { message: "error" } });

  const errorFallback = UseQueriesError({
    queries: query,
    errorComponent(props) {
      return <p onClick={props.refetch}>Sample button</p>;
    },
  });

  if (errorFallback) {
    return errorFallback;
  }

  return <p onClick={() => mutate({})}>Sample button, {data?.sample}</p>;
};
