import { useState, useMemo } from "react";
import { QueryParams } from "src/utils/getEndpointUrl";

interface RewardableItemsQueryParamsProps {
  type?: string;
  githubUserId?: number;
  includeIgnoredItems?: boolean;
}

export default function useRewardableItemsQueryParams(props: RewardableItemsQueryParamsProps) {
  const [type, setType] = useState<string>(props.type || "");
  const [search, setSearch] = useState<string>("");
  const [includeIgnoredItems, setIncludeIgnoredItems] = useState<boolean>(props.includeIgnoredItems || false);

  const queryParams: QueryParams = useMemo(() => {
    const params: Record<string, string> = {};

    if (type) params["type"] = type;
    if (search) params["search"] = search;
    if (includeIgnoredItems || includeIgnoredItems === false)
      params["include_ignored_items"] = includeIgnoredItems.toString();
    if (props.githubUserId !== undefined) params["githubUserId"] = props.githubUserId.toString();

    return params;
  }, [type, search, includeIgnoredItems, props.githubUserId]);

  return {
    queryParams,
    setType,
    setSearch,
    setIncludeIgnoredItems,
  };
}
