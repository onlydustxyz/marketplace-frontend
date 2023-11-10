import { useContext } from "react";
import { EditPanelContext } from "./context";

export const EditPanelRepositories = () => {
  const { project } = useContext(EditPanelContext);
  return <div>edit panel repositories {project?.name}</div>;
};
