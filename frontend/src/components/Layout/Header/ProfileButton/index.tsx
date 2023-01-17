import { useAuth } from "src/hooks/useAuth";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { RoutePaths } from "src/App";
import { useIntl } from "src/hooks/useIntl";

const ProfileButton = () => {
  const { user, logout } = useAuth();
  const { avatarUrl, displayName } = user ?? { avatarUrl: null, displayName: "My Account" };
  const { T } = useIntl();
  return (
    <div className="relative w-56 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className="
	      inline-flex w-full justify-center border-solid border-slate-400 border px-4 py-2 items-center
							rounded-3xl bg-black bg-opacity-20 text-sm font-medium text-white
							hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            data-testid="profile-button"
          >
            {avatarUrl && <img className="w-4 rounded-full mr-4" src={avatarUrl} />}
            {displayName}
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
							absolute right-0 mt-2 w-56 origin-top-right
							divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5
							focus:outline-none z-10"
          >
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={RoutePaths.Profile}
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
                  >
                    {T("profile.edit")}
                  </Link>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logout}
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
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

export default ProfileButton;
