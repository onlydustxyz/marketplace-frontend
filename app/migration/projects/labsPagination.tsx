"use client";
import React, { useContext } from "react";
import { InfiniteScrollContext } from "../../../actions/infinite-scroll/infinite-scroll.context.tsx";

function LabsPagination() {
  const { result } = useContext(InfiniteScrollContext);
  return <>{result}</>;
}

export default LabsPagination;
