import React from "react";
import { Link } from "@inertiajs/react";
import routes from "../../Routes/sidebar";
import SidebarSubmenu from "./SidebarSubmenu";
import { Button } from "@windmill/react-ui";

function SidebarContent() {
    return (
        <div className="py-4 text-gray-500 dark:text-gray-400">
            <a
                className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
                href="#"
            >
                Windmill
            </a>
            <ul className="mt-6">
                {routes.map((route) =>
                    route.routes ? (
                        <SidebarSubmenu route={route} key={route.name} />
                    ) : (
                        <li className="relative px-6 py-3" key={route.name}>
                            <Link
                                href={route.path}
                                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                            >
                                <span
                                    className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                    aria-hidden="true"
                                ></span>
                                {/* icon */}
                                <span className="ml-4">{route.name}</span>
                            </Link>
                        </li>
                    )
                )}
            </ul>
            <div className="px-6 my-6">
                <Button>
                    Create account
                    <span className="ml-2" aria-hidden="true">
                        +
                    </span>
                </Button>
            </div>
        </div>
    );
}

export default SidebarContent;
