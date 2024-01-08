export interface SearchBarProps {
  value?: string | null;
  onChange: (value: string | null) => void;
  placeholder: string;
}
