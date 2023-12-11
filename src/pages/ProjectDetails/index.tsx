import { matchPath, useLocation } from "react-router-dom";
import { ProjectRoutePaths, RoutePaths } from "src/App";
import View from "./View";

export default function ProjectDetails() {
  const { pathname } = useLocation();
  const isProjectEdition = !!matchPath(`${RoutePaths.ProjectDetails}/${ProjectRoutePaths.Edit}`, pathname);

  return <View padded={!isProjectEdition} />;
}
