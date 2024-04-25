import { debounce } from "lodash";
import { Key, useCallback, useEffect, useMemo, useState } from "react";

import ProjectApi from "src/api/Project";
import { useIntl } from "src/hooks/useIntl";
import { ProjectPageItemResponse } from "src/types";

import { TUseSearchProjects } from "components/features/search-projects/hooks/use-search-projects.types";
import { SelectableProjectItem } from "components/features/search-projects/selectable-item/selectable-item";
import { Icon } from "components/layout/icon/icon";

export function useSearchProjects({
  onSelectProjects,
  initialValue,
  isMultiple,
}: TUseSearchProjects.Props): TUseSearchProjects.Return {
  const { T } = useIntl();
  const [debounceQuery, setDebounceQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [openListbox, setOpenListbox] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(new Set());
  const [selectedProjects, setSelectedProjects] = useState<TUseSearchProjects.Project[]>([]);

  useEffect(() => {
    // Need to set initial value inside an effect because the value may come from a deferred source (ex: a request)
    if (initialValue) {
      setSelectedProjects([initialValue]);
      setSelectedKeys(new Set([`${initialValue.id}`]));
    }
  }, [initialValue]);

  const { data, ...query } = ProjectApi.queries.useInfiniteList({
    queryParams: {
      search: debounceQuery,
    },
  });

  const allProjects = useMemo(() => data?.pages?.flatMap(({ projects }) => projects) ?? [], [data]);

  const handleDebounceQuery = useCallback(
    debounce((query: string) => {
      setDebounceQuery(query);
    }, 300),
    []
  );

  function handleQuery(query: string) {
    handleDebounceQuery(query);
    setSearchQuery(query);
  }

  function handleClickOutside() {
    setOpenListbox(false);
    setDebounceQuery("");
    setSearchQuery("");
  }

  function onSelectElement(selectedId: "all" | Set<Key>) {
    if (selectedId === "all") {
      return;
    }

    const selectedProject = Array.from(selectedId)
      .map(singleSelectedId => allProjects?.find(({ id }) => `${id}` === singleSelectedId) ?? [])
      .filter(Boolean) as ProjectPageItemResponse[];

    if (selectedProject) {
      setSelectedProjects(selectedProject);
      setSelectedKeys(selectedId);
      setDebounceQuery("");
      setSearchQuery("");

      if (!isMultiple) {
        setOpenListbox(false);
      }

      onSelectProjects(selectedProject);
    }
  }

  const selectedProjectsItems = useMemo(() => {
    if (selectedProjects.length) {
      return [
        {
          name: T("v2.features.filters.projects.selected"),
          items: selectedProjects,
          showDivider: true,
        },
      ];
    }
    return [];
  }, [selectedProjects]);

  const otherProjects = useMemo(() => {
    if (allProjects?.length) {
      return [
        {
          name: T("v2.features.filters.projects.projects"),
          items: allProjects.filter(p => !selectedProjects.find(s => s.id === p.id)) || [],
          showDivider: false,
        },
      ];
    }

    return [];
  }, [allProjects, selectedProjects]);

  const projects = useMemo(() => {
    return [...selectedProjectsItems, ...otherProjects];
  }, [selectedProjectsItems, otherProjects]);

  const renderValue = useMemo(() => {
    if (selectedProjects.length && !openListbox) {
      return selectedProjects.map(project => (
        <SelectableProjectItem key={project.id} logoUrl={project.logoUrl} name={project.name} />
      ));
    }
    return <Icon remixName="ri-folder-3-line" className="pointer-events-none" />;
  }, [selectedProjects, openListbox]);

  return {
    searchQuery,
    query,
    openListbox,
    selectedKeys,
    projects,
    renderValue,
    handleQuery,
    handleClickOutside,
    onSelectElement,
    setOpenListbox,
  };
}
