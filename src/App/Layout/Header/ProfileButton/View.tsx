import { Menu, Transition } from "@headlessui/react";
import { Fragment, PropsWithChildren, useState } from "react";
import { NavLink } from "react-router-dom";

import { withTooltip } from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";
import { useSidePanel } from "src/hooks/useSidePanel";
import ErrorWarningLine from "src/icons/ErrorWarningLine";
import { cn } from "src/utils/cn";

import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { UseMenuReturn } from "hooks/menu/useMenu";

import { useLogout } from "./Logout.hooks";

interface MenuItemProps extends PropsWithChildren {
  onClick?: () => void;
  isProfile?: boolean;
}

const MenuItem = ({ onClick, isProfile, children, ...rest }: MenuItemProps) => (
  <Menu.Item
    {...rest}
    as="div"
    className={cn(
      "flex cursor-pointer flex-row items-center gap-3 rounded-md px-4 py-2 font-walsheim text-sm ui-active:bg-white/4",
      {
        "gap-2 px-3": isProfile,
      }
    )}
    onClick={onClick}
  >
    {children}
  </Menu.Item>
);

interface Props extends UseMenuReturn {
  avatarUrl: string | null;
  login: string;
  githubUserId?: number;
  hideProfileItems?: boolean;
  openFeedback: () => void;
}

export function View({
  avatarUrl,
  login,
  hideProfileItems,
  openFeedback,
  color,
  labelToken,
  redirection,
  error,
}: Props) {
  const { T } = useIntl();

  const [menuItemsVisible, setMenuItemsVisible] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const { openFullTermsAndConditions, openPrivacyPolicy } = useSidePanel();

  const { handleLogout } = useLogout();

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
                "outline-greyscale-50/12": color === "DEFAULT",
                "outline-orange-500": color === "WARNING",
                "outline-github-red": color === "ERROR",
              }
            )}
            data-testid="profile-button"
            {...withTooltip(T("v2.features.menu.tooltip.unableToReceiveRewards"), {
              visible: error !== undefined && tooltipVisible && !menuItemsVisible,
            })}
          >
            {avatarUrl && <img className="h-8 w-8 rounded-full" src={avatarUrl} loading="lazy" alt={login} />}

            <Typography variant="title-s" className={cn("text-sm leading-4", { "mr-1": !error })}>
              {login}
            </Typography>

            {error && (
              <ErrorWarningLine
                className={cn("text-xl", {
                  "text-spaceBlue-200": color === "DEFAULT",
                  "text-orange-500": color === "WARNING",
                  "text-github-red": color === "ERROR",
                })}
              />
            )}
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
            className="absolute right-0 z-20 mt-3 w-72 origin-top-right
						overflow-hidden rounded-md bg-whiteFakeOpacity-5 p-3 shadow-lg ring-1
						ring-greyscale-50/8 focus:outline-none"
          >
            {!hideProfileItems && (
              <div>
                <NavLink to={redirection}>
                  <MenuItem isProfile>
                    {avatarUrl ? (
                      <img className="h-7 w-7 rounded-full" src={avatarUrl} loading="lazy" alt={login} />
                    ) : null}

                    <Flex direction="col" alignItems="start">
                      <Typography variant="title-s" className="text-sm leading-4">
                        {login}
                      </Typography>

                      <Typography
                        variant="body-s"
                        translate={{
                          token: labelToken,
                        }}
                        className={cn({
                          "text-spaceBlue-200": color === "DEFAULT",
                          "text-orange-500": color === "WARNING",
                          "text-github-red": color === "ERROR",
                        })}
                      />
                    </Flex>
                  </MenuItem>
                </NavLink>

                <span className="my-1 block h-px bg-greyscale-50/8" />
              </div>
            )}

            <div>
              <MenuItem onClick={openFeedback}>
                <Icon remixName="ri-discuss-line" size={20} />
                <div className="grow">{T("v2.features.menu.feedback")}</div>
              </MenuItem>

              <MenuItem onClick={openFullTermsAndConditions}>
                <Icon remixName="ri-bill-line" size={20} />
                <div className="grow">{T("v2.features.menu.terms")}</div>
              </MenuItem>

              <MenuItem onClick={openPrivacyPolicy}>
                <Icon remixName="ri-lock-line" size={20} />
                <div className="grow">{T("v2.features.menu.privacy")}</div>
              </MenuItem>

              <span className="my-1 block h-px bg-greyscale-50/8" />
            </div>

            <div>
              <MenuItem onClick={handleLogout}>
                <Icon remixName="ri-logout-box-r-line" size={20} />
                <div className="grow">{T("v2.features.menu.logout")}</div>
              </MenuItem>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
