import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { IoEyeOutline } from "react-icons/io5";
import { FaCrown } from "react-icons/fa";
import Modal from "@/Components/Modal";
import Button from "@/Components/Button";

export default function Show() {
    const { elections } = usePage().props;

    const [modalState, setModalState] = useState({
        isOpen: false,
        selectedElection: null,
    });

    const openModal = (election) => {
        setModalState({ isOpen: true, selectedElection: election });
    };

    const closeModal = () => {
        setModalState({ isOpen: false, selectedElection: null });
    };

    const ResultModalContent = ({ election }) => {
        if (!election) return null;

        return (
            <div className="py-4">
                <div className="text-center mb-8 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Total Suara Masuk
                    </p>
                    <p className="text-4xl font-bold text-gray-900 dark:text-white mt-1">
                        {election.total_votes}
                    </p>
                </div>

                <div className="space-y-4">
                    {election.candidates_with_results.map(
                        (candidate, index) => {
                            const isWinner =
                                index === 0 && election.total_votes > 0;
                            return (
                                <div
                                    key={candidate.id}
                                    className={`relative p-4 rounded-xl shadow-md transition-all duration-300 ${
                                        isWinner
                                            ? "bg-purple-50 dark:bg-purple-900/50 ring-2 ring-purple-500"
                                            : "bg-white dark:bg-gray-800"
                                    }`}
                                >
                                    {isWinner && (
                                        <div className="absolute top-0 right-4 -translate-y-1/2 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                            <FaCrown />
                                            <span>Pemenang</span>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-4">
                                        <img
                                            src={candidate.photo_url}
                                            alt={candidate.name}
                                            className={`w-16 h-16 rounded-full object-cover ring-2 ${
                                                isWinner
                                                    ? "ring-purple-300"
                                                    : "ring-gray-200"
                                            } `}
                                        />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                                                    {candidate.name}
                                                </h3>
                                                <div className="text-right flex-shrink-0 ml-4">
                                                    <p
                                                        className={`font-extrabold text-xl ${
                                                            isWinner
                                                                ? "text-purple-700 dark:text-purple-400"
                                                                : "text-gray-800 dark:text-gray-200"
                                                        }`}
                                                    >
                                                        {candidate.percentage}%
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {candidate.votes_count}{" "}
                                                        suara
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                                <div
                                                    className={`h-2.5 rounded-full ${
                                                        isWinner
                                                            ? "bg-purple-600"
                                                            : "bg-gray-400 dark:bg-gray-500"
                                                    }`}
                                                    style={{
                                                        width: `${candidate.percentage}%`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    )}
                </div>
            </div>
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title="Hasil Pemilihan" />

            <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Hasil Pemilihan
            </h1>

            {elections.length > 0 ? (
                <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {elections.map((election) => (
                            <li
                                key={election.id}
                                className="p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition duration-150"
                            >
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                                    <div className="mb-4 sm:mb-0">
                                        <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                                            {election.title}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                            Ditutup pada:{" "}
                                            {new Date(
                                                election.end_date
                                            ).toLocaleDateString("id-ID", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </p>
                                    </div>
                                    <Button
                                        onClick={() => openModal(election)}
                                        className="inline-flex items-center px-4 py-2 bg-purple-600 dark:bg-purple-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-purple-700 dark:hover:bg-purple-600 focus:bg-purple-700 active:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                                    >
                                        <IoEyeOutline
                                            className="mr-2"
                                            size={16}
                                        />
                                        Lihat Hasil
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div
                    className="bg-blue-100 dark:bg-gray-700 border-l-4 border-blue-500 text-blue-700 dark:text-blue-200 p-4 rounded-md"
                    role="alert"
                >
                    <p className="font-bold">Informasi</p>
                    <p>Saat ini belum ada hasil pemilihan yang tersedia.</p>
                </div>
            )}

            <Modal
                isOpen={modalState.isOpen}
                onClose={closeModal}
                title={`Hasil: ${modalState.selectedElection?.title || ""}`}
                size="2xl"
            >
                <ResultModalContent election={modalState.selectedElection} />
            </Modal>
        </AuthenticatedLayout>
    );
}
