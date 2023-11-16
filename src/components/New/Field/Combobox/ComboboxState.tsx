import { Spinner } from "src/components/Spinner/Spinner";
import { useIntl } from "src/hooks/useIntl";
import { ItemType } from "./MultiList";

type StateProps<T> = {
  items: T[] | ItemType<T>[];
  query?: string;
  loading: boolean;
};

export function ComboboxState<T extends object>({ items, query, loading }: StateProps<T>) {
  const { T } = useIntl();
  const hasItems = items.flatMap(item => ("data" in item ? item.data : [])).length > 0 || items.length > 0;

  return (
    <>
      {loading ? (
        <div className="flex justify-center px-4 py-2 text-spacePurple-500">
          <Spinner />
        </div>
      ) : null}

      {!hasItems && !loading ? (
        <div className="select-none text-greyscale-50">
          {!query ? T("project.details.create.informations.form.fields.projectLead.startType") : null}
          {query !== "" ? T("project.details.create.informations.form.fields.projectLead.empty") : null}
        </div>
      ) : null}
    </>
  );
}
