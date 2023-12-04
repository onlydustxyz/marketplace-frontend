import { useQuery } from "@tanstack/react-query";

type GithubStatusResponse = {
  page: {
    id: string;
    name: "GitHub";
    url: "https://www.githubstatus.com";
    updated_at: Date;
  };
  status: {
    description: string;
    indicator: "none" | "minor" | "major" | "critical";
  };
};

const GITHUB_STATUS_URL = "https://www.githubstatus.com/api/v2/status.json";

const useGithubStatus = () => {
  return useQuery<GithubStatusResponse>({
    queryKey: ["github-status"],
    queryFn: async () => {
      const response = await fetch(GITHUB_STATUS_URL);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    },
    refetchInterval: 1000 * 60 * 10, // 10 minutes
  });
};

export default { useGithubStatus };
