import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { RoutePaths } from "src/App";
import { useIntl } from "src/hooks/useIntl";

type Props = {
  avatarUrl: string | null;
  displayName: string;
  logout: () => void;
};

const View = ({ avatarUrl, displayName, logout }: Props) => {
  const location = useLocation();
  const { T } = useIntl();
  return (
    <div className="relative">
      <Menu as="div" className="relative inline-block">
        <div>
          <Menu.Button
            className="flex gap-2 m-0.5 justify-center outline outline-1 outline-greyscale-50/12 px-2 py-1.5 items-center rounded-full text-sm font-belwe hover:bg-noise-medium hover:outline-2 ui-open:bg-noise-medium ui-open:outline-2"
            data-testid="profile-button"
          >
            {avatarUrl && <img className="w-8 rounded-full" src={avatarUrl} />}
            <div className="mr-1">{displayName}</div>
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
            className="
							absolute right-0 mt-3 w-56 origin-top-right
							divide-y divide-stone-100/8 rounded-md bg-white/2 backdrop-blur-4xl shadow-lg ring-1 ring-stone-100/8
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
                    } group flex w-full items-center p-3 text-sm cursor-pointer text-greyscale-50`}
                  >
                    {T("profile.edit")}
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
                    } group flex w-full items-center p-3 text-sm text-greyscale-50`}
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
