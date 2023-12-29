import { Leader } from "../../types/projects.types.ts";

type Props = {
  id: string;
  name: string;
  leaders: Leader[];
  logoUrl: string;
  isPrivate: boolean;
  technologies: string[];
};
export default function Highlights({ props }: Props) {}
