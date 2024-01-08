export type SortOption = { id: string; label?: string };
export interface SortProps {
  label: string;
  options: SortOption[];
  value: string;
  onChange(value: string): void;
}
