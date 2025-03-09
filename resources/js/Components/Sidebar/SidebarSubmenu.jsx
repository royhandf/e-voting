import React, { useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { SidebarContext } from "../../Context/SidebarContext";
import SidebarContent from "./SidebarContent";

function MobileSidebar() {
    const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);

    return (
        <Transition show={isSidebarOpen} as={React.Fragment}>
            <Dialog
                as="div"
                className="relative z-50 lg:hidden"
                onClose={closeSidebar}
            >
                <Transition.Child
                    as={React.Fragment}
                    enter="transition-opacity ease-in-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-in-out duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50" />
                </Transition.Child>

                <div className="fixed inset-0 flex">
                    <Transition.Child
                        as={React.Fragment}
                        enter="transition-transform ease-in-out duration-300"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition-transform ease-in-out duration-300"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <Dialog.Panel className="relative w-64 bg-white dark:bg-gray-800 shadow-lg h-full flex flex-col">
                            <SidebarContent />
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}

export default MobileSidebar;
