import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DropDown({ title, deleteFunc, editFunc, className }) {
  return (
    <Menu as="div" className="relative inline-block text-left pl-4">
      <div>
        <Menu.Button className="inline-flex w-full justify-center">
          {/* dropdown name */}
          {title}
          <svg
            className={`w-5 h-5 ${className}`}
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
          </svg>
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={deleteFunc}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Remove
                </a>
              )}
            </Menu.Item>
            {/* <Menu.Item>
              {({ active }) => (
                <a
                  onClick={editFunc}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Edit
                </a>
              )}
            </Menu.Item> */}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
