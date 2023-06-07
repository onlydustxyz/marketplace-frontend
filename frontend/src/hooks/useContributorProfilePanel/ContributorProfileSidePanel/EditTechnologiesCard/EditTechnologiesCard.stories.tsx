import { LanguageMap } from "src/types";
import EditTechnologiesCard from ".";

export default {
  title: "EditTechnologiesCard",
  component: EditTechnologiesCard,
};

const languages: LanguageMap = {
  Rust: 100,
  Go: 20,
  JavaScript: 3,
  Python: 3,
};

export const Default = {
  render: () => (
    <div className="w-5/12">
      <EditTechnologiesCard languages={languages} />
    </div>
  ),
};
