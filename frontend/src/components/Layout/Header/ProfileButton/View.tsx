import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import { Fragment, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RoutePaths } from "src/App";
import Dot from "src/assets/icons/Dot";
import Tooltip from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";
import ErrorWarningLine from "src/icons/ErrorWarningLine";

type Props = {
  avatarUrl: string | null;
  displayName: string;
  logout: () => void;
  payoutSettingsInvalid: boolean;
};

const View = ({ avatarUrl, displayName, logout, payoutSettingsInvalid }: Props) => {
  const location = useLocation();
  const { T } = useIntl();
  const [menuItemsVisible, setMenuItemsVisible] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div className="relative">
      <Menu as="div" className="relative inline-block">
        <div>
          <Menu.Button
            id="profile-button"
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
            className={classNames(
              "flex gap-2 m-0.5 justify-center outline outline-1 px-2 py-1.5 items-center rounded-full text-sm font-belwe hover:bg-noise-medium hover:outline-2 ui-open:bg-noise-medium ui-open:outline-2",
              {
                "outline-greyscale-50/12": !payoutSettingsInvalid,
                "outline-orange-500": payoutSettingsInvalid,
              }
            )}
            data-testid="profile-button"
          >
            {avatarUrl && <img className="w-8 rounded-full" src={avatarUrl} />}
            <div className={classNames({ "mr-1": !payoutSettingsInvalid })}>{displayName}</div>
            {payoutSettingsInvalid && <ErrorWarningLine className="text-xl text-orange-500" />}
          </Menu.Button>
          {payoutSettingsInvalid && (
            <Tooltip anchorId="profile-button" visible={tooltipVisible && !menuItemsVisible}>
              <div className="w-52">{T("profile.button.payoutSettingsInvalidTooltip")}</div>
            </Tooltip>
          )}
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
            className="
							absolute right-0 mt-3 w-36 origin-top-right
							divide-y divide-stone-100/8 rounded-md bg-white/2 backdrop-blur-4xl shadow-lg ring-1 ring-stone-100/8
                            text-greyscale-50 text-sm font-walsheim
							focus:outline-none z-10 overflow-hidden"
          >
            <div className="">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={RoutePaths.Profile}
                    state={{ prev: location }}
                    className={`${
                      active ? "bg-white/4" : "bg-white/2"
                    } group flex w-full items-center justify-between px-4 py-3 cursor-pointer`}
                  >
                    {T("profile.edit")}
                    {payoutSettingsInvalid && <Dot className="fill-orange-500 w-1.5" />}
                  </Link>
                )}
              </Menu.Item>
            </div>
            <div className="">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logout}
                    className={`${
                      active ? "bg-white/4" : "bg-white/2"
                    } group flex w-full items-center px-4 py-3 cursor-pointer`}
                    data-testid="logout-button"
                  >
                    {T("navbar.logout")}
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default View;
