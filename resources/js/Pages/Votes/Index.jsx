import React, { useState } from "react";
import { usePage, router, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { IoCheckmarkCircle } from "react-icons/io5";
import Swal from "sweetalert2";
import Button from "@/Components/Button";

export default function Index() {
    const { elections, candidates, userVotes } = usePage().props;
    const [selectedCandidates, setSelectedCandidates] = useState({});

    const availableElections = elections.filter(
        (election) => !userVotes.includes(election.id)
    );

    const handleVote = (electionId) => {
        if (!selectedCandidates[electionId]) {
            const isDarkMode =
                document.documentElement.classList.contains("dark");

            Swal.fire({
                title: "Pilih Kandidat",
                text: "Pilih kandidat terlebih dahulu.",
                icon: "warning",
                confirmButtonText: "OK",
                background: isDarkMode ? "#1a202c" : "#fff",
                color: isDarkMode ? "#fff" : "#000",
            });
            return;
        }

        router.post(
            "/vote",
            {
                candidate_id: selectedCandidates[electionId],
                election_id: electionId,
            },
            {
                onSuccess: () =>
                    Swal.fire(
                        "Berhasil!",
                        "Vote Anda telah disimpan.",
                        "success"
                    ),
                onError: () =>
                    Swal.fire(
                        "Gagal!",
                        "Terjadi kesalahan, coba lagi.",
                        "error"
                    ),
            }
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title="Pemilihan" />
            <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Pemilihan Umum
            </h1>

            {availableElections.length === 0 ? (
                <div
                    className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
                    role="alert"
                >
                    <strong className="font-bold">Peringatan!</strong>
                    <span className="block sm:inline">
                        {" "}
                        Tidak ada pemilihan yang tersisa untuk Anda.
                    </span>
                </div>
            ) : (
                availableElections.map((election) => (
                    <div
                        key={election.id}
                        className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mb-10"
                    >
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            {election.title}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                            {candidates
                                .filter((c) => c.election_id === election.id)
                                .map((candidate) => (
                                    <Button
                                        key={candidate.id}
                                        className={`p-4 border rounded-lg flex flex-col items-center justify-start transition duration-300 hover:shadow-lg 
                                                    ${
                                                        selectedCandidates[
                                                            election.id
                                                        ] === candidate.id
                                                            ? "bg-purple-200 dark:bg-purple-700"
                                                            : "bg-gray-100 dark:bg-gray-700"
                                                    }`}
                                        onClick={() =>
                                            setSelectedCandidates((prev) => ({
                                                ...prev,
                                                [election.id]: candidate.id,
                                            }))
                                        }
                                    >
                                        <img
                                            src={candidate.photo_url}
                                            alt={candidate.name}
                                            className="w-48 h-48 object-cover rounded-2xl mb-3 border-2"
                                        />
                                        <h3 className="font-semibold text-center">
                                            {candidate.name}
                                        </h3>
                                        <div className="text-sm text-start text-gray-700 dark:text-gray-300 mt-2">
                                            <strong>Visi:</strong>
                                            <div
                                                className="prose prose-sm text-gray-700 dark:text-gray-300"
                                                dangerouslySetInnerHTML={{
                                                    __html: candidate.vision,
                                                }}
                                            />
                                        </div>

                                        <div className="text-sm text-start text-gray-700 dark:text-gray-300 mt-2">
                                            <strong>Misi:</strong>
                                            <div
                                                className="prose prose-sm text-gray-700 dark:text-gray-300"
                                                dangerouslySetInnerHTML={{
                                                    __html: candidate.mission,
                                                }}
                                            />
                                        </div>

                                        {selectedCandidates[election.id] ===
                                            candidate.id && (
                                            <IoCheckmarkCircle
                                                size={24}
                                                className="mt-2 text-purple-600 dark:text-purple-400"
                                            />
                                        )}
                                    </Button>
                                ))}
                        </div>

                        <Button
                            className="mt-4 w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                            onClick={() => handleVote(election.id)}
                        >
                            Vote Sekarang
                        </Button>
                    </div>
                ))
            )}
        </AuthenticatedLayout>
    );
}
