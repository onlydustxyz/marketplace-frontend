import { LanguageMap } from "src/types";
import EditTechnologiesCard from ".";

export default {
  title: "EditTechnologiesCard",
  component: EditTechnologiesCard,
};

const technologies: LanguageMap = {
  Rust: 100,
  Go: 20,
  JavaScript: 3,
  Python: 3,
};

const setTechnologies = () => {
  //do nothing
};

export const Default = {
  render: () => (
    <div className="w-5/12 bg-greyscale-900 p-6">
      <EditTechnologiesCard technologies={technologies} setTechnologies={setTechnologies} />
    </div>
  ),
};
