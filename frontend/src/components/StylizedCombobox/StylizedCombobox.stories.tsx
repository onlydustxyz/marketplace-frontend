import StylizedCombobox, { Props } from ".";

export default {
  title: "StylizedCombobox",
  component: StylizedCombobox,
};

const people = ["Durward Reynolds", "Kenton Towne", "Therese Wunsch", "Benedict Kessler", "Katelyn Rohan"];

const selectedPeople = ["Durward Reynolds", "Katelyn Rohan"];

const props: Props<string> = {
  options: people,
  selectedOptions: "Durward Reynolds",
  setSelectedOptions: (value: string) => {
    console.log("Selected option", value);
  },
  optionFilter: (query: string, option: string) => option.toLowerCase().includes(query.toLowerCase()),
  placeholder: "People name",
  maxDisplayedOptions: 3,
};

export const Default = {
  render: () => (
    <div className="w-5/12">
      <StylizedCombobox {...props} />
    </div>
  ),
};

const propsMulti: Props<string> = {
  options: people,
  selectedOptions: selectedPeople,
  setSelectedOptions: (value: string[]) => {
    console.log("Selected option(s)", value);
  },
  optionFilter: (query: string, option: string) => option.toLowerCase().includes(query.toLowerCase()),
  placeholder: "People name",
  multiple: true,
  maxDisplayedOptions: 3,
};

export const Multi = {
  render: () => (
    <div className="w-5/12">
      <StylizedCombobox {...propsMulti} />
    </div>
  ),
};
