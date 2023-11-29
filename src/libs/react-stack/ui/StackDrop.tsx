import { Transition } from "@headlessui/react";
import { debounce } from "lodash";
import { Fragment, useCallback, useEffect, useState } from "react";

export const StackDrop = ({ show }: { show: boolean }) => {
  const [debouncedShow, setDebouncedShow] = useState(false);

  const debounceShow = useCallback(
    debounce(newShow => {
      setDebouncedShow(newShow);
    }, 10),
    []
  );

  useEffect(() => {
    debounceShow(show);
  }, [show]);

  return (
    <Transition
      show={debouncedShow}
      as={Fragment}
      enter="transition-opacity ease-in duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity ease-in duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="pointer-events-none absolute left-0 top-0 h-screen w-full bg-black/40 backdrop-blur-[2px]"></div>
    </Transition>
  );
};
