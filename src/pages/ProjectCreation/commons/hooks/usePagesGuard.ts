import { useNavigate } from "react-router-dom";
import { useInformationSession, useOrganizationSession, useResetSession } from "./useProjectCreationSession";
import { RoutePaths } from "src/App";
import { useEffect } from "react";

const STEP_ORGANIZATION = "organization";
const STEP_INFORMATION = "information";
const STEP_REPOSITORY = "repository";

type pageSteps = typeof STEP_ORGANIZATION | typeof STEP_INFORMATION | typeof STEP_REPOSITORY;

export const usePagesGuard = (page: pageSteps) => {
  const { storedValue, status } = useOrganizationSession();
  const { removeValue: removeFormData } = useInformationSession();
  const { reset } = useResetSession();
  const navigate = useNavigate();

  useEffect(() => {
    if ((page === STEP_INFORMATION || page === STEP_REPOSITORY || page === STEP_ORGANIZATION) && status === "getted") {
      if (storedValue?.length === 0) {
        reset();
        navigate(RoutePaths.ProjectCreation);
      } else if (
        page === STEP_INFORMATION &&
        storedValue.filter(organization => (organization.repos || []).find(repo => repo.selected)).length == 0
      ) {
        removeFormData();
        navigate(`${RoutePaths.ProjectCreation}/repository`);
      }
    }
  }, [storedValue, status]);
};
