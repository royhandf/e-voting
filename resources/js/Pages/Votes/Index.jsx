import React, { useState } from "react";
import { usePage, router, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { IoCheckmarkCircle } from "react-icons/io5";
import Swal from "sweetalert2";
import Button from "@/Components/Button";
import Modal from "@/Components/Modal";
import BottomSheet from "@/Components/BottomSheet";
import useMediaQuery from "@/Hooks/useMediaQuery";

const CandidateDetailContent = ({ candidate, onVote }) => (
    <div>
        <div className="flex flex-col items-center text-center">
            <img
                src={candidate.photo_url}
                alt={candidate.name}
                className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white dark:border-gray-700"
            />
            <h2 className="text-2xl font-bold mt-4 text-gray-900 dark:text-gray-100">
                {candidate.name}
            </h2>
        </div>
        <div className="w-full text-left mt-6 space-y-6">
            <div>
                <h4 className="text-lg font-semibold text-purple-600 dark:text-purple-400 border-b dark:border-gray-700 pb-2 mb-2">
                    Visi
                </h4>
                <div
                    className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300"
                    dangerouslySetInnerHTML={{ __html: candidate.vision }}
                />
            </div>
            <div>
                <h4 className="text-lg font-semibold text-purple-600 dark:text-purple-400 border-b dark:border-gray-700 pb-2 mb-2">
                    Misi
                </h4>
                <div
                    className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300"
                    dangerouslySetInnerHTML={{ __html: candidate.mission }}
                />
            </div>
        </div>
        <Button
            className="w-full mt-8 py-3 text-lg font-bold bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
            onClick={() =>
                onVote(candidate.election_id, candidate.id, candidate.name)
            }
        >
            Pilih {candidate.name}
        </Button>
    </div>
);

export default function Index() {
    const { elections, candidates, userVotes } = usePage().props;
    const [selectedCandidates, setSelectedCandidates] = useState({});
    const [detailViewState, setDetailViewState] = useState({
        isOpen: false,
        candidate: null,
    });
    const isDesktop = useMediaQuery("(min-width: 1024px)");

    const handleVote = (electionId, candidateId, candidateName) => {
        setDetailViewState({ isOpen: false, candidate: null });

        Swal.fire({
            title: "Konfirmasi Pilihan Anda",
            html: `Anda akan memilih <b>${candidateName}</b>.<br/>Pilihan ini tidak dapat diubah kembali.`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#8b5cf6",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Ya, saya yakin!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(
                    "/vote",
                    {
                        candidate_id: candidateId,
                        election_id: electionId,
                    },
                    {
                        onSuccess: () =>
                            Swal.fire(
                                "Berhasil!",
                                "Pilihan Anda telah berhasil direkam.",
                                "success"
                            ),
                        onError: (errors) =>
                            Swal.fire(
                                "Gagal!",
                                errors.message ||
                                    "Terjadi kesalahan saat menyimpan pilihan Anda.",
                                "error"
                            ),
                    }
                );
            }
        });
    };

    const handleCandidateClick = (candidate) => {
        setSelectedCandidates({ [candidate.election_id]: candidate.id });
        setDetailViewState({ isOpen: true, candidate: candidate });
    };

    const availableElections = elections.filter(
        (election) => !userVotes.includes(election.id)
    );

    return (
        <AuthenticatedLayout>
            <Head title="Pemilihan" />
            <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Pemilihan Umum
            </h1>

            {availableElections.length === 0 ? (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md">
                    <p className="font-bold">Terima Kasih!</p>
                    <p>
                        Anda telah berpartisipasi dalam semua pemilihan yang
                        tersedia.
                    </p>
                </div>
            ) : (
                <div className="space-y-10">
                    {availableElections.map((election) => (
                        <div
                            key={election.id}
                            className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-4 md:p-6"
                        >
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b dark:border-gray-700 pb-4">
                                {election.title}
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
                                {candidates
                                    .filter(
                                        (c) => c.election_id === election.id
                                    )
                                    .map((candidate) => (
                                        <div
                                            key={candidate.id}
                                            onClick={() =>
                                                handleCandidateClick(candidate)
                                            }
                                            className={`rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 ${
                                                selectedCandidates[
                                                    election.id
                                                ] === candidate.id
                                                    ? "ring-4 ring-purple-500"
                                                    : "ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-purple-400 hover:shadow-xl"
                                            }`}
                                        >
                                            <div className="relative">
                                                <img
                                                    src={candidate.photo_url}
                                                    alt={candidate.name}
                                                    className="w-full aspect-[3/4] object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                                {selectedCandidates[
                                                    election.id
                                                ] === candidate.id && (
                                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                        <IoCheckmarkCircle
                                                            size={48}
                                                            className="text-white drop-shadow-lg"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-3 text-center bg-gray-50 dark:bg-gray-900/50">
                                                <h3 className="font-bold text-sm md:text-base text-gray-900 dark:text-gray-100 truncate">
                                                    {candidate.name}
                                                </h3>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isDesktop ? (
                <Modal
                    title="Detail Kandidat"
                    isOpen={detailViewState.isOpen}
                    onClose={() =>
                        setDetailViewState({ isOpen: false, candidate: null })
                    }
                    size="xl"
                >
                    {detailViewState.candidate && (
                        <CandidateDetailContent
                            candidate={detailViewState.candidate}
                            onVote={handleVote}
                        />
                    )}
                </Modal>
            ) : (
                <BottomSheet
                    title="Detail Kandidat"
                    isOpen={detailViewState.isOpen}
                    onClose={() =>
                        setDetailViewState({ isOpen: false, candidate: null })
                    }
                >
                    {detailViewState.candidate && (
                        <CandidateDetailContent
                            candidate={detailViewState.candidate}
                            onVote={handleVote}
                        />
                    )}
                </BottomSheet>
            )}
        </AuthenticatedLayout>
    );
}
