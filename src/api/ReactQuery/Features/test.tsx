import { useCreateProjectRewardMutation, useProjectRewardsByIdQuery } from "./Rewards";

const Test = () => {
  const { data } = useProjectRewardsByIdQuery({ params: { rewardId: "123", projectId: "123" } });
  const { mutate } = useCreateProjectRewardMutation({
    params: { projectId: "123" },
    options: {
      onSuccess: async (result, client) => {
        // we can use the client directly in the callback if needed ( ex : client.invalidateQueries({ queryKey: ["GetUser"] }) )
        // make something on the result in the callback ( ex : console.log(result)))
      },
    },
  });

  return <p onClick={() => mutate({})}>coucou</p>;
};
