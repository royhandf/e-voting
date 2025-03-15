import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

export default function Admin() {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Welcome, {auth.user.name}!
            </h1>
        </AuthenticatedLayout>
    );
}
