import { useNavigate } from "react-router-dom";
import { useOrganizationSession } from "./useProjectCreationSession";
import { RoutePaths } from "src/App";
import { useEffect } from "react";

type pageSteps = "organization" | "information" | "repository";

export const usePagesControl = (page: pageSteps) => {
  const [savedOrgsData, _, savedOrgsDataStatus] = useOrganizationSession();
  const navigate = useNavigate();

  useEffect(() => {
    if ((page === "information" || page === "repository") && savedOrgsDataStatus === "getted") {
      if (savedOrgsData?.length === 0) {
        navigate(RoutePaths.ProjectCreation);
      } else if (
        page === "information" &&
        savedOrgsData.filter(organization => (organization.repos || []).find(repo => repo.selected)).length == 0
      ) {
        navigate(`${RoutePaths.ProjectCreation}/repository`);
      }
    }
  }, [savedOrgsData, savedOrgsDataStatus]);
};
