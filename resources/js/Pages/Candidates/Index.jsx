import { Head, Link, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import { IoTrash, IoSearch, IoEye, IoAdd } from "react-icons/io5";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Modal from "@/Components/Modal";
import Button from "@/Components/Button";

export default function Candidates() {
    const { candidates, flash } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCandidates, setFilteredCandidates] = useState(
        candidates.data
    );
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    useEffect(() => {
        if (flash?.success) {
            const isDarkMode =
                document.documentElement.classList.contains("dark");

            Swal.fire({
                title: "Berhasil!",
                text: flash.success,
                icon: "success",
                confirmButtonText: "OK",
                background: isDarkMode ? "#1a202c" : "#fff",
                color: isDarkMode ? "#fff" : "#000",
            });
        }
    }, [flash]);

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            const filtered = candidates.data.filter((candidate) =>
                candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredCandidates(filtered);
        }, 300);

        return () => clearTimeout(delaySearch);
    }, [searchTerm, candidates.data]);

    const handleDelete = (id) => {
        const isDarkMode = document.documentElement.classList.contains("dark");

        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Kandidat yang dihapus tidak dapat dikembalikan.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus",
            cancelButtonText: "Batal",
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#4f46e5",
            background: isDarkMode ? "#1a202c" : "#fff",
            color: isDarkMode ? "#fff" : "#000",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("candidates.destroy", id), {
                    preserveScroll: true,
                    onSuccess: () => {
                        Swal.fire(
                            "Berhasil!",
                            "Kandidat berhasil dihapus.",
                            "success"
                        );
                    },
                    onError: () => {
                        Swal.fire(
                            "Gagal!",
                            "Terjadi kesalahan saat menghapus kandidat.",
                            "error"
                        );
                    },
                });
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Daftar Kandidat" />
            <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Daftar Kandidat
            </h1>

            <div className="flex justify-between items-center mb-4">
                <div className="relative sm:w-1/3 w-2/3">
                    <IoSearch className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Cari kandidat..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Link
                    href={route("candidates.create")}
                    as="button"
                    className="px-2 sm:px-4 py-2 text-sm font-medium text-white bg-purple-700 rounded-md hover:bg-purple-600 transition flex items-center justify-center"
                >
                    <span className="hidden sm:block">Tambah Kandidat</span>
                    <IoAdd size={20} className="sm:hidden" />
                </Link>
            </div>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4 dark:bg-gray-800">
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                            <th className="px-4 py-2">No.</th>
                            <th className="px-4 py-2">Nama Kandidat</th>
                            <th className="px-4 py-2">Pemilihan</th>
                            <th className="px-4 py-2">Nomor Urut</th>
                            <th className="px-4 py-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCandidates.length > 0 ? (
                            filteredCandidates.map((candidate, index) => (
                                <tr key={candidate.id} className="border-b">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">
                                        {candidate.name}
                                    </td>
                                    <td className="px-4 py-2">
                                        {candidate.election
                                            ? candidate.election.title
                                            : "-"}
                                    </td>
                                    <td className="px-4 py-2">
                                        {candidate.number}
                                    </td>
                                    <td className="flex items-center space-x-2 p-2">
                                        <Button
                                            onClick={() => {
                                                setSelectedCandidate(candidate);
                                                setIsOpen(true);
                                            }}
                                            className="flex items-center justify-center w-7 h-7 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
                                        >
                                            <IoEye size={16} />
                                        </Button>

                                        <Link
                                            href={route(
                                                "candidates.edit",
                                                candidate.id
                                            )}
                                            as="button"
                                            className="flex items-center justify-center w-7 h-7 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 transition"
                                        >
                                            <HiOutlinePencilAlt size={16} />
                                        </Link>

                                        <Button
                                            onClick={() =>
                                                handleDelete(candidate.id)
                                            }
                                            className="flex items-center justify-center w-7 h-7 text-white bg-red-500 rounded-md hover:bg-red-600 transition"
                                        >
                                            <IoTrash size={16} />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="px-4 py-2 text-center text-gray-500"
                                >
                                    Tidak ada kandidat tersedia.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Pagination
                page={candidates.current_page}
                resultsPerPage={candidates.per_page}
                totalResults={candidates.total}
                totalPages={candidates.last_page}
                setPage={(pageNumber) =>
                    (window.location.href = `${candidates.path}?page=${pageNumber}`)
                }
            />

            <Modal
                title={selectedCandidate?.name}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                size="xl"
            >
                {selectedCandidate && (
                    <div className="flex flex-col items-center p-4">
                        <img
                            src={selectedCandidate.photo_url}
                            alt={selectedCandidate.name}
                            className="w-1/2 md:w-1/3 mx-auto rounded-lg shadow-lg mb-6"
                        />

                        <div className="w-full text-left">
                            <h4 className="text-xl font-bold text-purple-600 mt-6 mb-2 border-b pb-2">
                                Visi
                            </h4>
                            <div
                                className="prose prose-sm max-w-none text-gray-600"
                                dangerouslySetInnerHTML={{
                                    __html: selectedCandidate.vision,
                                }}
                            ></div>

                            <h4 className="text-xl font-bold text-purple-600 mt-6 mb-2 border-b pb-2">
                                Misi
                            </h4>
                            <div
                                className="prose prose-sm max-w-none text-gray-600"
                                dangerouslySetInnerHTML={{
                                    __html: selectedCandidate.mission,
                                }}
                            ></div>
                        </div>
                    </div>
                )}
            </Modal>
        </AuthenticatedLayout>
    );
}
