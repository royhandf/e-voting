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
import { usePage, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import Button from "./Button";

function Header() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { toggleSidebar } = useContext(SidebarContext);
    const { auth } = usePage().props;

    const handleLogout = (e) => {
        e.preventDefault();
        const isDarkMode = document.documentElement.classList.contains("dark");

        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, log out!",
            background: isDarkMode ? "#1a202c" : "#fff",
            color: isDarkMode ? "#fff" : "#000",
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route("logout"));
            }
        });
    };
    return (
        <header className="z-40 py-4 bg-white shadow-sm dark:bg-gray-800">
            <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
                {/* Menu Button for Mobile */}
                <Button
                    className="p-2 rounded-md lg:hidden focus:outline-none focus:ring"
                    onClick={toggleSidebar}
                    aria-label="Menu"
                >
                    <IoMenu className="w-6 h-6" />
                </Button>

                {/* Theme Toggler */}
                <ul className="flex items-center space-x-6 ml-auto">
                    <li>
                        <Button
                            className="rounded-md focus:outline-none focus:ring"
                            onClick={toggleTheme}
                            aria-label="Toggle color mode"
                        >
                            {theme === "dark" ? (
                                <FaSun className="w-5 h-5" />
                            ) : (
                                <FaMoon className="w-5 h-5" />
                            )}
                        </Button>
                    </li>

                    {/* Profile Dropdown */}
                    <li className="relative">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <Button className="focus:outline-none">
                                    <Avatar name={auth.user.name} />
                                </Button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link
                                    className="flex items-center"
                                    href={route("profile")}
                                    method="get"
                                    as="button"
                                >
                                    <IoPersonOutline className="mr-3" />
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="text-red-600 flex items-center"
                                    onClick={handleLogout}
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
