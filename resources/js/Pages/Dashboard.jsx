import InfoCard from "@/Components/Cards/InfoCard";
import RoundIcon from "@/Components/RoundIcon";
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

            <div className="grid gap-6 mb-6 md:grid-cols-2 xl:grid-cols-4">
                <InfoCard title="Total Pemilih" value={totalPemilih}>
                    <RoundIcon
                        icon={FaUserFriends}
                        iconColorClass="text-blue-500 dark:text-blue-100"
                        bgColorClass="bg-blue-100 dark:bg-blue-500"
                        className="mr-4"
                    />
                </InfoCard>

                <InfoCard title="Total Kandidat" value={totalKandidat}>
                    <RoundIcon
                        icon={FaUserTie}
                        iconColorClass="text-purple-500 dark:text-purple-100"
                        bgColorClass="bg-purple-100 dark:bg-purple-500"
                        className="mr-4"
                    />
                </InfoCard>

                <InfoCard title="Pemilihan Aktif" value={totalPemilihanAktif}>
                    <RoundIcon
                        icon={FaPoll}
                        iconColorClass="text-green-500 dark:text-green-100"
                        bgColorClass="bg-green-100 dark:bg-green-500"
                        className="mr-4"
                    />
                </InfoCard>

                <InfoCard
                    title="Pemilihan Selesai"
                    value={totalPemilihanSelesai}
                >
                    <RoundIcon
                        icon={FaCheckSquare}
                        iconColorClass="text-red-500 dark:text-red-100"
                        bgColorClass="bg-red-100 dark:bg-red-500"
                        className="mr-4"
                    />
                </InfoCard>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mb-6">
                <ChartVote voteResults={voteResults} elections={elections} />
            </div>

            {/* <div
                className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 mb-10
            "
            >
                <p className="font-semibold text-gray-800 dark:text-gray-300 mb-4">
                    Daftar Pemilihan
                </p>
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700">
                            <th className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                                Judul
                            </th>
                            <th className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                                Jumlah Kandidat
                            </th>
                            <th className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                                Deadline
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {elections.map((election) => (
                            <tr
                                key={election.id}
                                className="border-b text-center"
                            >
                                <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                                    {election.title}
                                </td>
                                <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                                    {election.candidates_count}
                                </td>
                                <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                                    {new Date(
                                        election.end_date
                                    ).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> */}
            
        </AuthenticatedLayout>
    );
}
