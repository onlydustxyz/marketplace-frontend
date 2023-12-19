import { ButtonProps } from "src/components/Button";

export interface ChoiceButtonOption {
  name: string;
  label: string;
  disabled?: boolean;
  onClick: () => void;
}

export interface ChoiceButtonProps extends ButtonProps {
  choices: ChoiceButtonOption[];
  defaultOption: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}
