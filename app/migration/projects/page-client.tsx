"use client";
import React, { PropsWithChildren } from "react";
import SearchBar from "./components/search-bar/search-bar.tsx";
import { useFilterContext } from "../../../actions/context/Filters/filters.context.tsx";

function PageClient({ children }: PropsWithChildren) {
  const { filteredChildren } = useFilterContext();
  return (
    <div className="flex grow flex-col gap-5">
      <SearchBar />
      {filteredChildren ? filteredChildren : children}
    </div>
  );
}

export default PageClient;
