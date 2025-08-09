import React, { useState, useMemo, useEffect, useRef } from "react";
import { Head, usePage, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Chart } from "chart.js/auto";

// Impor komponen eksternal yang kompleks
import InfoCard from "@/Components/Cards/InfoCard";
import ChartVote from "@/Components/Charts/ChartVote";

// Impor semua ikon yang dibutuhkan
import {
    FaUserTie,
    FaUserFriends,
    FaPoll,
    FaCheckSquare,
    FaRegClock,
    FaTrophy,
    FaExternalLinkAlt,
} from "react-icons/fa";

// ===================================================================
// KOMPONEN-KOMPONEN INTERNAL (Tidak ada perubahan di sini)
// ===================================================================

function VoterParticipationDonut({ totalVoters, votesCasted }) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [isDarkMode] = useState(() =>
        document.documentElement.classList.contains("dark")
    );

    useEffect(() => {
        if (!chartRef.current) return;
        if (chartInstance.current) chartInstance.current.destroy();
        const notVoted = totalVoters - votesCasted;
        chartInstance.current = new Chart(chartRef.current, {
            type: "doughnut",
            data: {
                labels: ["Sudah Memilih", "Belum Memilih"],
                datasets: [
                    {
                        data: [votesCasted, notVoted],
                        backgroundColor: [
                            "#4f46e5",
                            isDarkMode ? "#4b5563" : "#e5e7eb",
                        ],
                        borderColor: isDarkMode ? "#1f2937" : "#ffffff",
                        borderWidth: 4,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: "80%",
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false },
                },
            },
        });
        return () => chartInstance.current?.destroy();
    }, [totalVoters, votesCasted, isDarkMode]);

    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
                Partisipasi Pemilih
            </h3>
            <div className="relative flex-grow flex items-center justify-center h-48">
                <canvas ref={chartRef}></canvas>
                <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                        {(
                            (totalVoters > 0 ? votesCasted / totalVoters : 0) *
                            100
                        ).toFixed(0)}
                        %
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        Telah Memilih
                    </span>
                </div>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                {votesCasted} dari {totalVoters} pemilih telah menggunakan hak
                suaranya.
            </p>
        </div>
    );
}

function ActivityFeed({ activities }) {
    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
                Aktivitas Terbaru
            </h3>
            <ul className="space-y-4">
                {activities && activities.length > 0 ? (
                    activities.map((activity, index) => (
                        <li key={index} className="flex items-center space-x-3">
                            <div className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-full p-2">
                                <FaRegClock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-800 dark:text-gray-200">
                                    <span className="font-semibold">
                                        {activity.user_name}
                                    </span>{" "}
                                    baru saja memilih.
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {activity.time}
                                </p>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Belum ada aktivitas terbaru.
                    </p>
                )}
            </ul>
        </div>
    );
}

function LastWinnerCard({ winner }) {
    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
                Hasil Terakhir
            </h3>
            {winner ? (
                <div className="flex flex-col items-center text-center">
                    <FaTrophy className="w-10 h-10 text-yellow-400 mb-3" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Pemenang {winner.election_title}:
                    </p>
                    <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
                        {winner.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        dengan {winner.votes} suara
                    </p>
                </div>
            ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center pt-8">
                    Belum ada pemilihan yang selesai.
                </p>
            )}
        </div>
    );
}

function ActiveElectionsTable({ elections }) {
    const activeElections = elections.filter((e) => e.status === "active");

    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
                Pemilihan Sedang Berlangsung
            </h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Nama Pemilihan
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Kandidat
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {activeElections.length > 0 ? (
                            activeElections.map((election) => (
                                <tr
                                    key={election.id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {election.title}
                                    </th>
                                    <td className="px-6 py-4">
                                        {election.candidates_count}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link
                                            href={`/elections/${election.id}`}
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        >
                                            <FaExternalLinkAlt />
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="3"
                                    className="px-6 py-4 text-center"
                                >
                                    Tidak ada pemilihan yang sedang aktif.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ===================================================================
// KOMPONEN UTAMA: Dashboard
// ===================================================================
export default function Dashboard() {
    const {
        auth,
        totalPemilih,
        totalKandidat,
        totalPemilihanAktif,
        totalPemilihanSelesai,
        elections,
        voteResults,
        voterParticipation,
        recentActivities,
        lastElectionWinner,
    } = usePage().props;

    const [selectedElectionId, setSelectedElectionId] = useState(() => {
        const activeElection = elections.find((e) => e.status === "active");
        return activeElection
            ? activeElection.id
            : elections.length > 0
            ? elections[0].id
            : null;
    });

    const currentParticipation = useMemo(() => {
        if (!selectedElectionId || !voterParticipation) return 0;
        return voterParticipation[selectedElectionId] || 0;
    }, [selectedElectionId, voterParticipation]);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="container mx-auto px-6 py-8">
                <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                    Welcome, {auth.user.name}!
                </h1>

                {/* Bagian 1: Info Cards */}
                <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                    <InfoCard
                        title="Total Pemilih"
                        value={totalPemilih}
                        icon={FaUserFriends}
                        iconColorClass="text-blue-500"
                        bgColorClass="bg-blue-100"
                    />
                    <InfoCard
                        title="Total Kandidat"
                        value={totalKandidat}
                        icon={FaUserTie}
                        iconColorClass="text-purple-500"
                        bgColorClass="bg-purple-100"
                    />
                    <InfoCard
                        title="Pemilihan Aktif"
                        value={totalPemilihanAktif}
                        icon={FaPoll}
                        iconColorClass="text-green-500"
                        bgColorClass="bg-green-100"
                    />
                    <InfoCard
                        title="Pemilihan Selesai"
                        value={totalPemilihanSelesai}
                        icon={FaCheckSquare}
                        iconColorClass="text-red-500"
                        bgColorClass="bg-red-100"
                    />
                </div>

                {/* Bagian 2: Grafik Hasil Suara Utama (DIPERBAIKI) */}
                <div className="relative z-0 bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 sm:p-6 mb-8 overflow-hidden">
                    <ChartVote
                        voteResults={voteResults}
                        elections={elections}
                        selectedElection={selectedElectionId}
                        setSelectedElection={setSelectedElectionId}
                    />
                </div>

                {/* Bagian 3: Layout Grid Dua Kolom (2x2) */}
                <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
                    {/* Kolom Kiri (lebih lebar) */}
                    <div className="lg:col-span-2 space-y-8">
                        <ActiveElectionsTable elections={elections} />
                        <ActivityFeed activities={recentActivities} />
                    </div>

                    {/* Kolom Kanan (lebih sempit) */}
                    <div className="space-y-8">
                        <VoterParticipationDonut
                            totalVoters={totalPemilih}
                            votesCasted={currentParticipation}
                        />
                        <LastWinnerCard winner={lastElectionWinner} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
