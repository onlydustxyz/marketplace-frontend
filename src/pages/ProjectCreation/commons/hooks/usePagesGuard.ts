import { useNavigate } from "react-router-dom";
import { useInformationSession, useOrganizationSession } from "./useProjectCreationSession";
import { RoutePaths } from "src/App";
import { useEffect } from "react";

type pageSteps = "organization" | "information" | "repository";

export const usePagesGuard = (page: pageSteps) => {
  const { storedValue, status, removeValue: removeOrganization } = useOrganizationSession();
  const { removeValue: removeFormData } = useInformationSession();
  const navigate = useNavigate();

  useEffect(() => {
    if ((page === "information" || page === "repository" || page === "organization") && status === "getted") {
      if (storedValue?.length === 0) {
        removeOrganization();
        removeFormData();
        navigate(RoutePaths.ProjectCreation);
      } else if (
        page === "information" &&
        storedValue.filter(organization => (organization.repos || []).find(repo => repo.selected)).length == 0
      ) {
        removeFormData();
        navigate(`${RoutePaths.ProjectCreation}/repository`);
      }
    }
  }, [storedValue, status]);
};
