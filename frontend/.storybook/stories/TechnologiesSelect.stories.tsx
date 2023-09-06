import { LanguageMap } from "src/types";
import TechnologiesSelect from "src/components/TechnologiesSelect";
import withToasterProvider from "../decorators/withToasterProvider";
import withMockedProvider from "../decorators/withMockedProvider";

export default {
  title: "TechnologiesSelect",
  component: TechnologiesSelect,
  decorators: [withToasterProvider, withMockedProvider()],
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
      <TechnologiesSelect technologies={technologies} setTechnologies={setTechnologies} />
    </div>
  ),
};
