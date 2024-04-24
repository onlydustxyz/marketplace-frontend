"use client";

import { useState } from "react";

import { TrackProject } from "app/h/[slug]/components/track-project/track-project";

import ArrowDownSLine from "src/icons/ArrowDownSLine";

import { Link } from "components/ds/link/link";
import { Translate } from "components/layout/translate/translate";

import { TTrackShowMoreProject } from "./track-show-more-project.types";

export function TrackShowMoreProject({ projects }: TTrackShowMoreProject.Props) {
  const [isShowMore, setIsShowMore] = useState(false);

  const onShowMore = () => setIsShowMore(true);

  if (isShowMore) {
    return (
      <>
        {projects.map(project => (
          <TrackProject project={project} key={project.name} />
        ))}
      </>
    );
  }

  return (
    <div className="flex w-full flex-row items-center justify-center">
      <Link.Button onClick={onShowMore}>
        <ArrowDownSLine className="text-base" />
        <Translate token={"showMore"} as={"span"} />
      </Link.Button>
    </div>
  );
}
