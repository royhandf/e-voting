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


export default function Results() {
    const {
        auth,
        totalPemilih,
        totalKandidat,
        totalPemilihanAktif,
        totalPemilihanSelesai,
        elections,
        candidates,
        voteResults
    } = usePage().props;

    // Fungsi untuk mendapatkan kandidat dengan suara terbanyak berdasarkan election_id
    const getTopCandidate = (electionId) => {
        if (!voteResults || !Array.isArray(voteResults)) return "Data tidak tersedia";
    
        const candidatesInElection = voteResults.filter(result => result.election_id === electionId);
        if (candidatesInElection.length === 0) return "Belum ada suara";
    
        const topCandidate = candidatesInElection.reduce((max, candidate) => 
            candidate.votes > max.votes ? candidate : max
        );
    
        return `🏆 ${topCandidate.candidate_name} (${topCandidate.votes} suara)`;
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
                            <th className="px-0 py-2 border border-gray-300 dark:border-gray-600">
                                Kategori Pemilihan
                            </th>
                            <th className="px-0 py-2 border border-gray-300 dark:border-gray-600">
                                Jumlah Kandidat
                            </th>
                            <th className="px-0 py-2 border border-gray-300 dark:border-gray-600">
                                Vote Terbanyak
                            </th>
                            <th className="px-0 py-2 border border-gray-300 dark:border-gray-600">
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
