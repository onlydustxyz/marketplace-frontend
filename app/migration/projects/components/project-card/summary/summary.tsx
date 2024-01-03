import { Typography } from "@/components/layout/typography/typography.tsx";

type Props = {
  shortDescription: string;
};
export default function Summary({ shortDescription }: Props) {
  return (
    <Typography variant="body-m" className="ml-px line-clamp-2">
      {shortDescription}
    </Typography>
  );
}
