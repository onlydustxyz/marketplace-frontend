interface SearchLinkProps {
  type?:
    | "code"
    | "repositories"
    | "issues"
    | "pullrequests"
    | "discussions"
    | "users"
    | "commits"
    | "registrypackages"
    | "wikis"
    | "topics"
    | "marketplace";
  state?: "open" | "closed";
  query?: string;
}

const baseUrl = "https://github.com/search";

export function getSearchLink({ type, state, query }: SearchLinkProps) {
  let url = baseUrl;

  if (type) url += `?type=${type}`;
  if (state) url += `&state=${state}`;
  if (query) url += `&q=${query}`;

  return url;
}
