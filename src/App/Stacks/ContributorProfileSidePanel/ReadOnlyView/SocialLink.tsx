import { useShowToaster } from "src/hooks/useToaster";
import { copyClickHandlerFactory } from "src/utils/clickHandler";

import { Button } from "components/ds/button/button";

import { useIntl } from "hooks/translate/use-translate";

interface SocialLinkProps extends React.PropsWithChildren {
  link?: string;
  copyableValue?: string;
  copyableValueName?: string;
  testId?: string;
}

export default function SocialLink({ link, copyableValue, copyableValueName, testId, children }: SocialLinkProps) {
  const showToaster = useShowToaster();
  const { T } = useIntl();

  const Component = link ? "a" : "button";

  const linkProps = { href: link, target: "_blank", rel: "noreferrer" };
  const copyProps = {
    onClick: copyClickHandlerFactory(copyableValue || "", () => {
      showToaster(T("profile.valueCopiedToClipboard", { valueName: copyableValueName }));
    }),
  };

  const props = link ? linkProps : copyProps;
  return (
    <>
      <Button
        as={Component}
        size="m"
        variant="secondary"
        iconOnly
        className="h-10 w-10 border-transparent bg-noise-light p-0 text-greyscale-200 hover:border"
        data-testid={testId}
        {...props}
      >
        {children}
      </Button>
    </>
  );
}
