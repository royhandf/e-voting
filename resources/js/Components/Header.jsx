import React, { useContext } from "react";
import { SidebarContext } from "../context/SidebarContext";
import { ThemeContext } from "../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";
import {
    IoMenu,
    IoPersonOutline,
    IoCogOutline,
    IoLogOut,
} from "react-icons/io5";
import Dropdown from "./Dropdown";
import Avatar from "./Avatar";
import { usePage } from "@inertiajs/react";

function Header() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { toggleSidebar } = useContext(SidebarContext);
    const { auth } = usePage().props;

    return (
        <header className="z-40 py-4 bg-white shadow-sm dark:bg-gray-800">
            <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
                {/* Menu Button for Mobile */}
                <button
                    className="p-2 rounded-md lg:hidden focus:outline-none focus:ring"
                    onClick={toggleSidebar}
                    aria-label="Menu"
                >
                    <IoMenu className="w-6 h-6" />
                </button>

                {/* Theme Toggler */}
                <ul className="flex items-center space-x-6 ml-auto">
                    <li>
                        <button
                            className="rounded-md focus:outline-none focus:ring"
                            onClick={toggleTheme}
                            aria-label="Toggle color mode"
                        >
                            {theme === "dark" ? (
                                <FaSun className="w-5 h-5" />
                            ) : (
                                <FaMoon className="w-5 h-5" />
                            )}
                        </button>
                    </li>

                    {/* Profile Dropdown */}
                    <li className="relative">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="focus:outline-none">
                                    <Avatar name={auth.user.name} />
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link
                                    href={route("profile.edit")}
                                    className="flex items-center"
                                >
                                    <IoPersonOutline className="mr-3" />
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href="#"
                                    className="flex items-center"
                                >
                                    <IoCogOutline className="mr-3" />
                                    Settings
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="text-red-600 flex items-center"
                                >
                                    <IoLogOut className="mr-3" />
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Header;
