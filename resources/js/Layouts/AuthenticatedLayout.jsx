import React, { Suspense, useContext, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import Header from "@/Components/Header";
import Sidebar from "@/Components/Sidebar";
import ThemedSuspense from "@/Components/ThemedSuspense";
import { SidebarContext } from "@/Context/SidebarContext";

export default function AuthenticatedLayout({ children }) {
    const user = usePage().props.auth.user;
    const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);

    useEffect(() => {
        closeSidebar();
    }, []);

    return (
        <div
            className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${
                isSidebarOpen && "overflow-hidden"
            }`}
        >
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex flex-col flex-1 w-full">
                <Header />
                <main className="h-full overflow-y-auto">
                    <div className="container grid px-6 mx-auto">
                        <Suspense fallback={<ThemedSuspense />}>
                            {children}
                        </Suspense>
                    </div>
                </main>
            </div>
        </div>
    );
}
