import { Menu, Transition } from "@headlessui/react";
import { cn } from "src/utils/cn";
import { Fragment, PropsWithChildren, useState } from "react";
import Dot from "src/assets/icons/Dot";
import { withTooltip } from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";
import ErrorWarningLine from "src/icons/ErrorWarningLine";
import { useSidePanel } from "src/hooks/useSidePanel";
import { useStackContributorProfile, useStackPayoutInfo } from "src/App/Stacks/Stacks";
import { useAuth0 } from "@auth0/auth0-react";
import { handleLogout } from "components/features/auth0/handlers/handle-logout";
import { useImpersonation } from "components/features/impersonation/use-impersonation";
import { Icon } from "components/layout/icon/icon";

interface MenuItemProps extends PropsWithChildren {
  disabled?: boolean;
  onClick?: () => void;
  secondary?: boolean;
}

const MenuItem = ({ disabled = false, onClick, secondary = false, children, ...rest }: MenuItemProps) => (
  <Menu.Item
    {...rest}
    disabled={disabled}
    as="div"
    className={cn("flex flex-row items-center gap-3 px-4 py-2 font-walsheim text-sm", {
      "cursor-pointer ui-active:bg-white/4": !disabled,
      "cursor-default": disabled,
      "text-greyscale-50": !secondary,
      "text-spaceBlue-200": secondary,
    })}
    onClick={onClick}
  >
    {children}
  </Menu.Item>
);

interface Props {
  avatarUrl: string | null;
  login: string;
  isMissingPayoutSettingsInfo: boolean;
  githubUserId?: number;
  hideProfileItems?: boolean;
  openFeedback: () => void;
}

export function View({
  githubUserId,
  avatarUrl,
  login,
  isMissingPayoutSettingsInfo,
  hideProfileItems,
  openFeedback,
}: Props) {
  const { T } = useIntl();
  const { logout } = useAuth0();
  const { isImpersonating, clearImpersonateClaim } = useImpersonation();

  const [menuItemsVisible, setMenuItemsVisible] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [openPayoutInfo] = useStackPayoutInfo();

  const [openContributorProfileSidePanel] = useStackContributorProfile();
  const { openFullTermsAndConditions, openPrivacyPolicy } = useSidePanel();

  const handleLogoutClick = () => {
    handleLogout(logout, isImpersonating, clearImpersonateClaim);
  };

  return (
    <div className="relative">
      <Menu as="div" className="relative inline-block">
        <div>
          <Menu.Button
            id="profile-button"
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
            className={cn(
              "flex items-center justify-center gap-2 rounded-full px-2 py-1.5 font-belwe text-sm outline outline-1 ui-open:bg-noise-medium ui-open:outline-2 hover:bg-noise-medium hover:outline-2",
              {
                "outline-greyscale-50/12": !isMissingPayoutSettingsInfo,
                "outline-orange-500": isMissingPayoutSettingsInfo,
              }
            )}
            data-testid="profile-button"
            {...withTooltip(T("profile.button.payoutSettingsInvalidTooltip"), {
              visible: isMissingPayoutSettingsInfo && tooltipVisible && !menuItemsVisible,
            })}
          >
            {avatarUrl && (
              <img className="h-8 w-8 rounded-full" src={avatarUrl} loading="lazy" alt={T("profile.avatar")} />
            )}

            <div className={cn({ "mr-1": !isMissingPayoutSettingsInfo })}>{login}</div>

            {isMissingPayoutSettingsInfo && <ErrorWarningLine className="text-xl text-orange-500" />}
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            onFocus={() => setMenuItemsVisible(true)}
            onBlur={() => setMenuItemsVisible(false)}
            className="absolute right-0 z-20 mt-3 w-56 origin-top-right
						overflow-hidden rounded-md bg-whiteFakeOpacity-5 py-2 shadow-lg ring-1
						ring-greyscale-50/8 focus:outline-none"
          >
            {!hideProfileItems && (
              <div className="border-b border-greyscale-50/8 pb-1">
                <MenuItem secondary disabled>
                  {T("navbar.profile.title").toUpperCase()}
                </MenuItem>

                <MenuItem onClick={() => githubUserId && openContributorProfileSidePanel({ githubUserId })}>
                  <Icon remixName="ri-user-3-line" size={20} />
                  <div className="grow">{T("navbar.profile.publicProfile")}</div>
                </MenuItem>

                <MenuItem onClick={openPayoutInfo}>
                  <Icon remixName="ri-money-dollar-circle-line" size={20} />
                  <div className="grow">{T("navbar.profile.payoutInfo")}</div>
                  {isMissingPayoutSettingsInfo && <Dot className="w-1.5 fill-orange-500" />}
                </MenuItem>
              </div>
            )}

            <div className={cn("border-b border-greyscale-50/8 pb-1", { "py-1": !hideProfileItems })}>
              <MenuItem onClick={openFullTermsAndConditions}>
                <Icon remixName="ri-bill-line" size={20} />
                <div className="grow">{T("navbar.termsAndConditions")}</div>
              </MenuItem>

              <MenuItem onClick={openPrivacyPolicy}>
                <Icon remixName="ri-lock-line" size={20} />
                <div className="grow">{T("navbar.privacyPolicy")}</div>
              </MenuItem>
            </div>

            <div className="pt-1">
              <MenuItem onClick={openFeedback}>
                <Icon remixName="ri-discuss-line" size={20} />
                <div className="grow">{T("navbar.feedback.button")}</div>
              </MenuItem>

              <MenuItem onClick={handleLogoutClick}>
                <Icon remixName="ri-logout-box-r-line" size={20} />
                <div className="grow">{T("navbar.logout")}</div>
              </MenuItem>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
