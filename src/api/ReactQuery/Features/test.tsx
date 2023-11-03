import { useCreateProjectRewardMutation, useProjectRewardsByIdQuery } from "./Rewards";

const Test = () => {
  const { data } = useProjectRewardsByIdQuery({ params: { rewardId: "123", projectId: "123" } });
  const { mutate } = useCreateProjectRewardMutation({
    params: { projectId: "123" },
    options: {
      onSuccess: async (result, client) => {
        client.invalidateQueries({ queryKey: ["GetUser"] });
      },
    },
  });

  return <p onClick={() => mutate({})}>coucou</p>;
};
