import SampleApi from ".";
import UseMutationAlert from "src/api/ReactQuery/useMutationAlert";
import UseQueriesError from "src/api/ReactQuery/useQueriesError";

const Test = () => {
  //   const { data } = SampleApi.sub.queries.useSubSampleByIdQuery({ params: { rewardId: "123", projectId: "123" } });
  const { data, ...query } = SampleApi.queries.useProjectSampleByIdQuery({
    params: { rewardId: "123", projectId: "123" },
  });
  const { mutate, ...rest } = SampleApi.mutations.useCreateProjectRewardMutation({
    params: { projectId: "123" },
    options: {
      onSuccess: async (result, client) => {
        // we can use the client directly in the callback if needed ( ex : client.invalidateQueries({ queryKey: ["GetUser"] }) )
        // make something on the result in the callback ( ex : console.log(result)))
      },
    },
  });

  UseMutationAlert({ mutation: rest, success: { message: "sucess" }, error: { message: "error" } });

  const errorFallback = UseQueriesError({ queries: query });

  if (errorFallback) {
    return errorFallback;
  }

  return <p onClick={() => mutate({})}>Sample button, {data?.sample}</p>;
};
