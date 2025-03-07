import React from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    IoHomeOutline,
    IoPeopleOutline,
    IoPersonAddOutline,
    IoSettingsOutline,
    IoDocumentTextOutline,
} from "react-icons/io5";

export const adminRoutes = [
    { name: "Dashboard", path: "/dashboard", icon: IoHomeOutline },
    {
        name: "Kelola Pengguna",
        path: "/dashboard/users",
        icon: IoPeopleOutline,
    },
    {
        name: "Kelola Kandidat",
        path: "/dashboard/candidates",
        icon: IoPersonAddOutline,
    },
    {
        name: "Kelola Pemilihan",
        path: "/dashboard/votes",
        icon: IoSettingsOutline,
    },
    {
        name: "Laporan dan Hasil",
        path: "/dashboard/reports",
        icon: IoDocumentTextOutline,
    },
];

const userRoutes = [
    { name: "Dashboard", path: "/dashboard", icon: IoHomeOutline },
    { name: "Pemilihan", path: "/dashboard/voting", icon: IoSettingsOutline },
    {
        name: "Hasil Pemilihan",
        path: "/dashboard/vote-result",
        icon: IoDocumentTextOutline,
    },
];

function SidebarContent() {
    const { auth } = usePage().props;
    const { url } = usePage();

    const routes = auth.user.role === "admin" ? adminRoutes : userRoutes;

    return (
        <div className="py-4 text-gray-500 dark:text-gray-400">
            <a
                className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
                href="#"
            >
                Windmill
            </a>
            <ul className="mt-6">
                {routes.map((route) => {
                    const isActive = url.startsWith(route.path);
                    const IconComponent = route.icon;

                    return (
                        <li className="relative px-6 py-3" key={route.name}>
                            {isActive && (
                                <span
                                    className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                    aria-hidden="true"
                                ></span>
                            )}
                            <Link
                                href={route.path}
                                className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 ${
                                    isActive
                                        ? "text-gray-800 dark:text-gray-200"
                                        : "hover:text-gray-800 dark:hover:text-gray-200"
                                }`}
                            >
                                {IconComponent && (
                                    <IconComponent className="w-5 h-5 mr-3" />
                                )}
                                <span className="ml-4">{route.name}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default SidebarContent;
