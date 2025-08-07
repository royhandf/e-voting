import React from "react";
import { Head, router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SelectInput from "@/Components/SelectInput";
import ChartResult from "@/Components/Charts/ChartResult";
import {
    IoDocumentTextOutline,
    IoPeopleOutline,
    IoStatsChartOutline,
} from "react-icons/io5";

export default function Index() {
    const { elections, selectedElection, stats, results, winner, selectedId } =
        usePage().props;

    const handleElectionChange = (e) => {
        const electionId = e.target.value;
        router.get(
            route("results.index"),
            { election_id: electionId },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title="Laporan dan Hasil" />
            <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Laporan dan Hasil Pemilihan
            </h1>

            <div className="flex justify-between items-center mb-6">
                <div className="w-full max-w-sm">
                    <SelectInput
                        id="election_id"
                        value={selectedId || ""}
                        onChange={handleElectionChange}
                        className="w-full"
                        options={[
                            { value: "", label: "--- Pilih Pemilihan ---" },
                            ...elections.map((e) => ({
                                value: e.id,
                                label: e.title,
                            })),
                        ]}
                    />
                </div>
                {selectedElection && (
                    <div>
                        <a
                            href={route(
                                "results.export.excel",
                                selectedElection.id
                            )}
                            className="px-2 sm:px-4 py-2 text-sm font-medium text-white bg-purple-700 rounded-md hover:bg-purple-600 transition flex items-center justify-center"
                            download
                        >
                            Ekspor Excel
                        </a>
                    </div>
                )}
            </div>

            {selectedElection ? (
                <div className="space-y-8 mb-8">
                    {winner && stats.totalVotes > 0 && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center transition hover:shadow-xl hover:-translate-y-1">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    🏆 PEMENANG
                                </p>
                                <img
                                    src={winner.photo_url}
                                    alt={winner.name}
                                    className="w-24 h-24 rounded-full mx-auto my-3 border-4 border-purple-200 dark:border-purple-800 object-cover"
                                />
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {winner.name}
                                </h3>
                                <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                                    {winner.votes_count.toLocaleString("id-ID")}{" "}
                                    Suara
                                </p>
                            </div>

                            {/* Kartu Total Suara */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center transition hover:shadow-xl hover:-translate-y-1">
                                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full mb-3">
                                    <IoStatsChartOutline className="w-8 h-8 text-blue-600 dark:text-blue-300" />
                                </div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    TOTAL SUARA MASUK
                                </p>
                                <p className="text-4xl font-bold text-gray-900 dark:text-white mt-2">
                                    {stats.totalVotes.toLocaleString("id-ID")}
                                </p>
                            </div>

                            {/* Kartu Partisipasi */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center transition hover:shadow-xl hover:-translate-y-1">
                                <div className="bg-pink-100 dark:bg-pink-900/50 p-3 rounded-full mb-3">
                                    <IoPeopleOutline className="w-8 h-8 text-pink-600 dark:text-pink-300" />
                                </div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    PARTISIPASI PEMILIH
                                </p>
                                <p className="text-4xl font-bold text-gray-900 dark:text-white mt-2">
                                    {stats.turnout}%
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="grid gap-8 md:grid-cols-5 md:items-start ">
                        <div className="md:col-span-3 overflow-x-auto bg-white shadow-md rounded-lg p-4 dark:bg-gray-800">
                            <h3 className="font-semibold mb-4 text-gray-800 dark:text-gray-200">
                                Rincian Suara per Kandidat
                            </h3>
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-gray-700 text-left text-sm text-gray-600 dark:text-gray-300">
                                        <th className="px-4 py-2 rounded-l-lg">
                                            Peringkat
                                        </th>
                                        <th className="px-4 py-2">Kandidat</th>
                                        <th className="px-4 py-2 text-center">
                                            Suara
                                        </th>
                                        <th className="px-4 py-2 text-center rounded-r-lg">
                                            %
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results && results.length > 0 ? (
                                        results.map((result, index) => (
                                            <tr
                                                key={result.id}
                                                className="border-b dark:border-gray-700"
                                            >
                                                <td className="px-4 py-3 text-center font-bold text-lg">
                                                    {index + 1}
                                                </td>
                                                <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-300">
                                                    {result.name}
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    {result.votes_count.toLocaleString(
                                                        "id-ID"
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    {stats.totalVotes > 0
                                                        ? (
                                                              (result.votes_count /
                                                                  stats.totalVotes) *
                                                              100
                                                          ).toFixed(1)
                                                        : 0}
                                                    %
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="px-4 py-8 text-center text-gray-500"
                                            >
                                                Tidak ada data suara.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="md:col-span-2 bg-white shadow-md rounded-lg p-4 dark:bg-gray-800 flex items-center justify-center min-h-[300px]">
                            {results && results.length > 0 ? (
                                <ChartResult results={results} />
                            ) : (
                                <p className="text-gray-500">
                                    Tidak ada data chart.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <IoDocumentTextOutline className="w-16 h-16 mb-4" />
                    <p className="text-lg font-medium">
                        Pilih salah satu pemilihan di atas
                    </p>
                    <p>untuk melihat laporan dan hasil akhirnya.</p>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
