import { Head, Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import { IoTrash, IoSearch, IoEye, IoAdd } from "react-icons/io5";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useState, useEffect } from "react";
import Button from "@/Components/Button";
import Modal from "@/Components/Modal";
import Swal from "sweetalert2";

export default function Index() {
    const { elections, flash } = usePage().props;
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredElections, setFilteredElections] = useState(elections.data);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedElection, setSelectedElection] = useState(null);

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            const filtered = elections.data.filter((election) =>
                election.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredElections(filtered);
        }, 300);

        return () => clearTimeout(delaySearch);
    }, [searchTerm, elections.data]);

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

    const handleDelete = (id) => {
        const isDarkMode = document.documentElement.classList.contains("dark");

        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Pemilihan yang dihapus tidak dapat dikembalikan!",
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
                axios
                    .delete(route("elections.destroy", id))
                    .then(() => {
                        Swal.fire(
                            "Berhasil!",
                            "Pemilihan berhasil dihapus.",
                            "success"
                        );
                        window.location.reload();
                    })
                    .catch((error) => {
                        Swal.fire(
                            "Gagal!",
                            "Terjadi kesalahan saat menghapus pemilihan.",
                            "error"
                        );
                    });
            }
        });
    };
    return (
        <AuthenticatedLayout>
            <Head title="Daftar Pemilihan" />
            <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Daftar Pemilihan
            </h1>

            <div className="flex justify-between items-center mb-4">
                <div className="relative sm:w-1/3 w-2/3">
                    <IoSearch className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Cari pemilihan..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Link
                    href={route("elections.create")}
                    className="px-2 sm:px-4 py-2 text-sm font-medium text-white bg-purple-700 rounded-md hover:bg-purple-600 transition flex items-center justify-center"
                >
                    <span className="hidden sm:block">Tambah Pemilihan</span>
                    <IoAdd size={20} className="sm:hidden" />
                </Link>
            </div>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4 dark:bg-gray-800">
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                            <th className="px-4 py-2">No</th>
                            <th className="px-4 py-2">Judul</th>
                            <th className="px-4 py-2">Tanggal Mulai</th>
                            <th className="px-4 py-2">Tanggal Selesai</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredElections.length > 0 ? (
                            filteredElections.map((election, index) => (
                                <tr key={election.id} className="border-b">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">
                                        {election.title}
                                    </td>
                                    <td className="px-4 py-2">
                                        {election.start_date}
                                    </td>
                                    <td className="px-4 py-2">
                                        {election.end_date}
                                    </td>
                                    <td className="px-4 py-2">
                                        <span
                                            className={`px-3 py-1 rounded-md text-white text-sm font-semibold
                                            ${
                                                election.status === "pending"
                                                    ? "bg-orange-500"
                                                    : election.status ===
                                                      "active"
                                                    ? "bg-green-500"
                                                    : election.status ===
                                                      "closed"
                                                    ? "bg-gray-500"
                                                    : "bg-red-500"
                                            }
                                        `}
                                        >
                                            {election.status}
                                        </span>{" "}
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                onClick={() => {
                                                    setSelectedElection(
                                                        election
                                                    );
                                                    setIsOpen(true);
                                                }}
                                                className="flex items-center justify-center w-7 h-7 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
                                            >
                                                <IoEye size={16} />
                                            </Button>
                                            <Link
                                                href={route(
                                                    "elections.edit",
                                                    election.id
                                                )}
                                                className="flex items-center justify-center w-7 h-7 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 transition"
                                            >
                                                <HiOutlinePencilAlt size={16} />
                                            </Link>

                                            <Button
                                                onClick={() =>
                                                    handleDelete(election.id)
                                                }
                                                className="flex items-center justify-center w-7 h-7 text-white bg-red-500 rounded-md hover:bg-red-600 transition"
                                            >
                                                <IoTrash size={16} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="px-4 py-2 text-center text-gray-500"
                                >
                                    Tidak ada pemilihan tersedia.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Pagination
                page={elections.current_page}
                resultsPerPage={elections.per_page}
                totalResults={elections.total}
                totalPages={elections.last_page}
                setPage={(pageNumber) =>
                    (window.location.href = `${elections.path}?page=${pageNumber}`)
                }
            />
            <Modal
                title="Detail Pemilihan"
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                size="lg"
            >
                {selectedElection && (
                    <>
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-lg font-bold mb-1">
                                {selectedElection.title}
                            </h2>
                            <span
                                className={`px-2 py-1 rounded-md text-xs font-semibold
                       ${
                           selectedElection.status === "pending"
                               ? "bg-orange-500 text-white"
                               : selectedElection.status === "active"
                               ? "bg-green-500 text-white"
                               : selectedElection.status === "closed"
                               ? "bg-gray-500 text-white"
                               : "bg-red-500 text-white"
                       }
                     `}
                            >
                                {selectedElection.status}
                            </span>
                        </div>

                        <div className="mb-4">
                            {selectedElection.description ? (
                                <div
                                    className="text-sm text-gray-600 dark:text-gray-400"
                                    dangerouslySetInnerHTML={{
                                        __html: selectedElection.description,
                                    }}
                                />
                            ) : (
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Tidak ada deskripsi
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                            <div>
                                <p className="font-medium text-gray-600 dark:text-gray-400">
                                    Tanggal Mulai:
                                </p>
                                <p>{selectedElection.start_date}</p>
                            </div>
                            <div>
                                <p className="font-medium text-gray-600 dark:text-gray-400">
                                    Tanggal Selesai:
                                </p>
                                <p>{selectedElection.end_date}</p>
                            </div>
                        </div>
                    </>
                )}
            </Modal>
        </AuthenticatedLayout>
    );
}
