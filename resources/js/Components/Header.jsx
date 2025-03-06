import React, { useContext, useState } from "react";
import { SidebarContext } from "../context/SidebarContext";
import { ThemeContext } from "../context/ThemeContext"; // Ubah ini!
import { FaSearch, FaMoon, FaSun } from "react-icons/fa";
import {
    IoMenu,
    IoPersonOutline,
    IoCogOutline,
    IoLogOut,
} from "react-icons/io5";
import {
    Avatar,
    Badge,
    Input,
    Dropdown,
    DropdownItem,
} from "@windmill/react-ui";

function Header() {
    const { theme, toggleTheme } = useContext(ThemeContext); // Ganti WindmillContext ke ThemeContext
    const { toggleSidebar } = useContext(SidebarContext);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    function handleProfileClick() {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    }

    return (
        <header className="z-40 py-4 bg-white shadow-sm dark:bg-gray-800">
            <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
                <button
                    className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
                    onClick={toggleSidebar}
                    aria-label="Menu"
                >
                    <IoMenu className="w-6 h-6" aria-hidden="true" />
                </button>
                <div className="flex justify-center flex-1 lg:mr-32">
                    <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
                        <div className="absolute inset-y-0 flex items-center pl-2">
                            <FaSearch className="w-4 h-4" aria-hidden="true" />
                        </div>
                        <Input
                            className="pl-8 text-gray-700"
                            placeholder="Search for projects"
                            aria-label="Search"
                        />
                    </div>
                </div>
                <ul className="flex items-center flex-shrink-0 space-x-6">
                    {/* <!-- Theme toggler --> */}
                    <li className="flex">
                        <button
                            className="rounded-md focus:outline-none focus:shadow-outline-purple"
                            onClick={() => {
                                console.log("Toggling mode...", theme);
                                toggleTheme();
                            }}
                            aria-label="Toggle color mode"
                        >
                            {theme === "dark" ? (
                                <FaSun className="w-5 h-5" aria-hidden="true" />
                            ) : (
                                <FaMoon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                />
                            )}
                        </button>
                    </li>

                    {/* <!-- Profile menu --> */}
                    <li className="relative">
                        <button
                            className="rounded-full focus:shadow-outline-purple focus:outline-none"
                            onClick={handleProfileClick}
                            aria-label="Account"
                            aria-haspopup="true"
                        >
                            <Avatar
                                className="align-middle h-8 w-8"
                                src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
                                alt=""
                                aria-hidden="true"
                            />
                        </button>
                        <Dropdown
                            align="right"
                            isOpen={isProfileMenuOpen}
                            onClose={() => setIsProfileMenuOpen(false)}
                        >
                            <DropdownItem tag="a" href="#">
                                <IoPersonOutline
                                    className="w-4 h-4 mr-3"
                                    aria-hidden="true"
                                />
                                <span>Profile</span>
                            </DropdownItem>
                            <DropdownItem tag="a" href="#">
                                <IoCogOutline
                                    className="w-4 h-4 mr-3"
                                    aria-hidden="true"
                                />
                                <span>Settings</span>
                            </DropdownItem>
                            <DropdownItem onClick={() => alert("Log out!")}>
                                <IoLogOut
                                    className="w-4 h-4 mr-3"
                                    aria-hidden="true"
                                />
                                <span>Log out</span>
                            </DropdownItem>
                        </Dropdown>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Header;
