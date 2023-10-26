import { Menu, Transition } from "@headlessui/react";
import { cn } from "src/utils/cn";
import { Fragment, PropsWithChildren, useState } from "react";
import Dot from "src/assets/icons/Dot";
import { withTooltip } from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";
import ErrorWarningLine from "src/icons/ErrorWarningLine";
import LogoutBoxRLine from "src/icons/LogoutBoxRLine";
import MoneyDollarCircleLine from "src/icons/MoneyDollarCircleLine";
import PayoutInfoSidePanel from "./PayoutInfoSidePanel/PayoutInfoSidePanel";
import User3Line from "src/icons/User3Line";
import { useContributorProfilePanel } from "src/hooks/useContributorProfilePanel";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { useSidePanel } from "src/hooks/useSidePanel";

type Props = {
  avatarUrl: string | null;
  login: string;
  logout: () => void;
  isMissingPayoutSettingsInfo: boolean;
  githubUserId?: number;
  hideProfileItems?: boolean;
};

const View = ({ githubUserId, avatarUrl, login, logout, isMissingPayoutSettingsInfo, hideProfileItems }: Props) => {
  const { T } = useIntl();

  const [menuItemsVisible, setMenuItemsVisible] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [payoutInfoSidePanelOpen, setPayoutInfoSidePanelOpen] = useState(false);

  const { open: openContributorProfileSidePanel } = useContributorProfilePanel();
  const { openFullTermsAndConditions, openPrivacyPolicy } = useSidePanel();

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
            {avatarUrl && <img className="h-8 w-8 rounded-full" src={avatarUrl} />}
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
            className=" absolute right-0 z-20 mt-3 w-56 origin-top-right
						overflow-hidden rounded-md bg-whiteFakeOpacity-5 pt-2 shadow-lg ring-1
						ring-greyscale-50/8 focus:outline-none"
          >
            {!hideProfileItems && (
              <div className="border-b border-greyscale-50/8 pb-2">
                <MenuItem secondary disabled>
                  {T("navbar.profile.title").toUpperCase()}
                </MenuItem>
                <MenuItem onClick={() => githubUserId && openContributorProfileSidePanel(githubUserId)}>
                  <User3Line className="text-xl" />
                  <div className="grow">{T("navbar.profile.publicProfile")}</div>
                </MenuItem>
                <MenuItem onClick={() => setPayoutInfoSidePanelOpen(true)}>
                  <MoneyDollarCircleLine className="text-xl" />
                  <div className="grow">{T("navbar.profile.payoutInfo")}</div>
                  {isMissingPayoutSettingsInfo && <Dot className="w-1.5 fill-orange-500" />}
                </MenuItem>
              </div>
            )}
            <MenuItem secondary disabled>
              <div className="flex w-full flex-row items-center justify-between py-1">
                <div className="flex flex-row gap-1 font-walsheim text-sm font-normal text-spaceBlue-200">
                  <div className="cursor-pointer" onClick={() => openFullTermsAndConditions()}>
                    {T("navbar.termsAndConditions")}
                  </div>
                  <div>{T("navbar.separator")}</div>
                  <div className="cursor-pointer" onClick={() => openPrivacyPolicy()}>
                    {T("navbar.privacyPolicy")}
                  </div>
                </div>
                <Button type={ButtonType.Secondary} size={ButtonSize.Xs} onClick={logout} data-testid="logout-button">
                  <LogoutBoxRLine className="border-greyscale-50 text-sm" />
                  {T("navbar.logout")}
                </Button>
              </div>
            </MenuItem>
          </Menu.Items>
        </Transition>
      </Menu>
      <PayoutInfoSidePanel
        githubUserId={githubUserId}
        open={payoutInfoSidePanelOpen}
        setOpen={setPayoutInfoSidePanelOpen}
      />
    </div>
  );
};

type MenuItemProps = {
  disabled?: boolean;
  onClick?: () => void;
  secondary?: boolean;
} & PropsWithChildren;

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

export default View;
