import InfoCard from "@/Components/Cards/InfoCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import {
    FaUserTie,
    FaUserFriends,
    FaPoll,
    FaCheckSquare,
} from "react-icons/fa";
import ChartVote from "@/Components/Charts/ChartVote";

export default function Admin() {
    const {
        auth,
        totalPemilih,
        totalKandidat,
        totalPemilihanAktif,
        totalPemilihanSelesai,
        elections,
        voteResults,
    } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Welcome, {auth.user.name}!
            </h1>

            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                <InfoCard
                    title="Total Pemilih"
                    value={totalPemilih}
                    icon={FaUserFriends}
                    iconColorClass="text-blue-500 dark:text-blue-100"
                    bgColorClass="bg-blue-100 dark:bg-blue-500"
                />

                <InfoCard
                    title="Total Kandidat"
                    value={totalKandidat}
                    icon={FaUserTie}
                    iconColorClass="text-purple-500 dark:text-purple-100"
                    bgColorClass="bg-purple-100 dark:bg-purple-500"
                />

                <InfoCard
                    title="Pemilihan Aktif"
                    value={totalPemilihanAktif}
                    icon={FaPoll}
                    iconColorClass="text-green-500 dark:text-green-100"
                    bgColorClass="bg-green-100 dark:bg-green-500"
                />

                <InfoCard
                    title="Pemilihan Selesai"
                    value={totalPemilihanSelesai}
                    icon={FaCheckSquare}
                    iconColorClass="text-red-500 dark:text-red-100"
                    bgColorClass="bg-red-100 dark:bg-red-500"
                />
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mb-6">
                <ChartVote voteResults={voteResults} elections={elections} />
            </div>
        </AuthenticatedLayout>
    );
}
