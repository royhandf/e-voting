import React, { useContext, useState } from "react";
import { SidebarContext } from "../context/SidebarContext";
import { ThemeContext } from "../context/ThemeContext";
import { FaSearch, FaMoon, FaSun } from "react-icons/fa";
import {
    IoMenu,
    IoPersonOutline,
    IoCogOutline,
    IoLogOut,
} from "react-icons/io5";
import Dropdown from "./Dropdown";

function Header() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { toggleSidebar } = useContext(SidebarContext);
    const [search, setSearch] = useState("");

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

                {/* Search Input */}
                <div className="flex justify-center flex-1 lg:mr-32">
                    <div className="relative w-full max-w-xl">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <FaSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="w-full pl-10 pr-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:ring focus:ring-purple-300 dark:bg-gray-700 dark:text-white"
                            placeholder="Search for projects..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Icons & Profile */}
                <ul className="flex items-center space-x-6">
                    {/* Theme Toggler */}
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
                                <button className="rounded-full focus:outline-none">
                                    <img
                                        className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600"
                                        src="https://ui-avatars.com/api/?name=User&background=random"
                                        alt="User Avatar"
                                    />
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
