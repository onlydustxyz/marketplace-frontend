import { PropsWithChildren, ReactElement } from "react";
import Card from "src/components/Card";

type ProfileContentProps = {
  title?: string;
  isCard?: boolean;
} & PropsWithChildren;

export default function ProfileContent({ title, isCard, children }: ProfileContentProps): ReactElement {
  return isCard ? (
    <>
      {title && <div className="mb-2 text-sm font-medium tracking-tight text-greyscale-300">{title}</div>}
      <Card padded={false} className="mb-6 p-4" withBg={false}>
        {children}
      </Card>
    </>
  ) : (
    <>{children}</>
  );
}
