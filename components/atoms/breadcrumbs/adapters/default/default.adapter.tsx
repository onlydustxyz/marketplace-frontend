"use client";

import { Fragment } from "react";

import { cn } from "src/utils/cn";

import { Typo } from "components/atoms/typo";
import { BaseLink } from "components/layout/base-link/base-link";
import { Icon } from "components/layout/icon/icon";

import { BreadcrumbsPort, Item } from "../../breadcrumbs.types";
import { BreadcrumbsDefaultVariants } from "./default.variants";

function Segment({ label, href, onClick, className }: Item) {
  const styles = cn("text-inherit hover:underline", className);

  if (href) {
    return (
      <BaseLink href={href} className={styles}>
        {label}
      </BaseLink>
    );
  }

  if (onClick) {
    return (
      <button type={"button"} onClick={onClick} className={styles}>
        {label}
      </button>
    );
  }

  return <span className={styles}>{label}</span>;
}

function Breadcrumbs({ items }: { items: Item[] }) {
  return items.map((item, index) => {
    if (index === items.length - 1) {
      return <Segment key={item.id} {...item} className={"text-text-1 hover:no-underline"} />;
    }

    return (
      <Fragment key={item.id}>
        <Segment {...item} />
        <Icon remixName={"ri-arrow-right-s-line"} />
      </Fragment>
    );
  });
}

export function BreadcrumbsDefaultAdapter({ classNames, items }: BreadcrumbsPort) {
  const slots = BreadcrumbsDefaultVariants();

  return (
    <Typo as={"div"} size={"m"} color={"text-3"} classNames={{ base: cn(slots.base(), classNames?.base) }}>
      <Breadcrumbs items={items} />
    </Typo>
  );
}
