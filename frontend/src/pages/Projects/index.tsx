import { useT } from "talkr";
import AllProjects from "./AllProjects";

export default function Projects() {
  const { T } = useT();

  return (
    <div className="bg-space h-full">
      <div className="container mx-auto pt-16 h-full">
        <div className="text-5xl font-belwe">{T("navbar.projects")}</div>
        <AllProjects />
      </div>
    </div>
  );
}
