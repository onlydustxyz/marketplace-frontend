import { useContext } from "react";
import { EditPanelContext } from "./context";

export const EditPanelRepositories = () => {
  const { project } = useContext(EditPanelContext);
  console.log("project", project);
  return <div>edit panel repositories {project?.name}</div>;
};
