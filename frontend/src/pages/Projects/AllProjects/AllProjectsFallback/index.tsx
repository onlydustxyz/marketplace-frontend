import Card from "src/components/Card";
import categories from "src/assets/img/categories.png";
import { useIntl } from "src/hooks/useIntl";
import Button from "src/components/Button";

type Props = {
  clearFilters: () => void;
};

export default function AllProjectsFallback({ clearFilters }: Props) {
  const { T } = useIntl();

  return (
    <Card padded={false} className="py-20 flex flex-col items-center gap-8">
      <img src={categories} />
      <div className="flex flex-col gap-2 items-center">
        <span className="text-greyscale-50 font-belwe font-normal text-2xl">{T("projects.fallback.title")}</span>
        <span className="text-spaceBlue-200 font-walsheim font-normal text-base">
          {T("projects.fallback.subTitle")}
        </span>
      </div>
      <div onClick={clearFilters}>
        <Button>{T("projects.fallback.clearFiltersButton")}</Button>
      </div>
    </Card>
  );
}
