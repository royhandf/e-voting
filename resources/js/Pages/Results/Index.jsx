import InfoCard from "@/Components/Cards/InfoCard";
import RoundIcon from "@/Components/RoundIcon";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
import { Head, usePage } from "@inertiajs/react";
import {
    FaUserTie,
    FaUserFriends,
    FaPoll,
    FaCheckSquare,
} from "react-icons/fa";
import ChartVote from "@/Components/Charts/ChartVote";


export default function Results() {
    const {
        auth,
        totalPemilih,
        totalKandidat,
        totalPemilihanAktif,
        totalPemilihanSelesai,
        elections,
        candidates,
        voteResults,
        votes, voteLogs
    } = usePage().props;

    // Fungsi untuk mendapatkan kandidat dengan suara terbanyak berdasarkan election_id
    const getTopCandidate = (electionId) => {
        if (!voteResults || !Array.isArray(voteResults)) return <p>Data tidak tersedia</p>;

    const candidatesInElection = voteResults.filter(result => result.election_id === electionId);
    if (candidatesInElection.length === 0) return <p>Belum ada suara</p>;

    const sortedCandidates = [...candidatesInElection].sort((a, b) => b.votes - a.votes);
    const topCandidate = sortedCandidates[0];
    const otherCandidates = sortedCandidates.slice(1);
    
    return (
        <div className="text-left">
            <p className="font-semibold">🏆 {topCandidate.candidate_name} ({topCandidate.votes} suara)</p>
            {otherCandidates.length > 0 && (
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Kandidat Lain:
                    <ul className="list-disc list-inside">
                        {otherCandidates.map((candidate) => (
                            <li key={candidate.candidate_id}>
                                {candidate.candidate_name} ({candidate.votes} suara)
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
    };


    const getCandidatesList = (electionId) => {
        if (!candidates || !Array.isArray(candidates)) return "Data tidak tersedia";

        const candidatesInElection = candidates.filter(candidate => candidate.election_id === electionId);

        if (candidatesInElection.length === 0) return "Tidak ada kandidat";

        const names = candidatesInElection.map(candidate => candidate.name);

        return `Total ${names.length} orang: ${names.join(", ")}`;
    };

    const handleExportCSV = () => {
        if (!elections || !Array.isArray(elections)) {
            alert("Data pemilihan tidak tersedia!");
            return;
        }

        const headers = ["Kategori Pemilihan", "Jumlah Kandidat", "Vote Terbanyak", "Status"];
        const rows = elections.map(election => [
            election.title,
            getCandidatesList(election.id),
            getTopCandidate(election.id),
            election.status
        ]);

        let csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(row => row.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "Hasil_Pemilihan.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    console.log(voteResults);
    console.log(votes);
    console.log(voteLogs);


    return (
        <AuthenticatedLayout>
            <Head title="Hasil Pemilihan" />
            <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Pengumuman Hasil Pemilihan.
            </h1>

            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 mb-10">
                <p className="font-semibold text-gray-800 dark:text-gray-300 mb-4">
                    Daftar Pemilihan
                </p>
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700">
                            <th className="px-4 py-2">
                                Kategori Pemilihan
                            </th>
                            <th className="px-4 py-2">
                                Jumlah Kandidat
                            </th>
                            <th className="px-4 py-2">
                                Vote Terbanyak
                            </th>
                            <th className="px-4 py-2">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {elections.map((election) => (
                            <tr key={election.id} className="border-b text-center">
                                <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                                    {election.title}
                                </td>
                                <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                                    {election.candidates_count}
                                </td>
                                <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                                    {getTopCandidate(election.id)}
                                </td>
                                <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                                    {election.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 mb-10">
                <p className="font-semibold text-gray-800 dark:text-gray-300 mb-4">
                    Log Aktivitas Vote
                </p>
                <table className="w-full table-auto border mt-2">
                    <thead>
                        <tr className="bg-gray-200 dark:bg-gray-700">
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">User</th>
                            <th className="px-4 py-2">Vote ke</th>
                            <th className="px-4 py-2">Waktu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {votes.map((vote) => (
                            <tr key={vote.id}>
                                <td className="px-4 py-2 border">{vote.id}</td>
                                <td className="px-4 py-2 border">{vote.user?.name}</td>
                                <td className="px-4 py-2 border">{vote.candidate?.name}</td>
                                <td className="px-4 py-2 border">{new Date(vote.vote_time).toLocaleString()}</td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>

            </div>

            <div className="flex justify-end mb-4">

                <button
                    onClick={handleExportCSV}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Export to CSV
                </button>
            </div>


        </AuthenticatedLayout>
    );
}
