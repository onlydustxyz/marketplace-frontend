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
    <Card padded={false} className="flex flex-col items-center gap-8 py-20">
      <img src={categories} />
      <div className="flex flex-col items-center gap-2">
        <span className="font-belwe text-2xl font-normal text-greyscale-50">{T("projects.fallback.title")}</span>
        <span className="font-walsheim text-base font-normal text-spaceBlue-200">
          {T("projects.fallback.subTitle")}
        </span>
      </div>
      <div onClick={clearFilters}>
        <Button>{T("projects.fallback.clearFiltersButton")}</Button>
      </div>
    </Card>
  );
}
