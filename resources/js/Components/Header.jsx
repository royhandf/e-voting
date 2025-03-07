import React, { useContext } from "react";
import { SidebarContext } from "../context/SidebarContext";
import { ThemeContext } from "../context/ThemeContext";
import { FaSearch, FaMoon, FaSun } from "react-icons/fa";
import {
    IoMenu,
    IoPersonOutline,
    IoCogOutline,
    IoLogOut,
} from "react-icons/io5";
import { Avatar, Input } from "@windmill/react-ui";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/Dropdown/DropdownMenu";

function Header() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { toggleSidebar } = useContext(SidebarContext);

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
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="rounded-full focus:shadow-outline-purple focus:outline-none">
                                    <Avatar
                                        className="align-middle h-8 w-8"
                                        src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
                                        alt="User Avatar"
                                        aria-hidden="true"
                                    />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <IoPersonOutline className="w-4 h-4 mr-3" />
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <IoCogOutline className="w-4 h-4 mr-3" />
                                    Settings
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => alert("Log out!")}
                                    className="text-red-600"
                                >
                                    <IoLogOut className="w-4 h-4 mr-3" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Header;
