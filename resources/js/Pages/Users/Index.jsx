import { Head, Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import { IoTrash, IoSearch, IoEye, IoAdd } from "react-icons/io5";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useState, useEffect } from "react";

export default function Users() {
    const { users } = usePage().props;
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState(
        users.data
    );

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            const filtered = users.data.filter((user) =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredUsers(filtered);
        }, 300);

        return () => clearTimeout(delaySearch);
    }, [searchTerm, users.data]);

    return (
        <AuthenticatedLayout>
            <Head title="Daftar Kandidat" />
            <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Daftar Pengguna
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
                    href={route("users.create")}
                    className="px-2 sm:px-4 py-2 text-sm font-medium text-white bg-purple-700 rounded-md hover:bg-purple-600 transition flex items-center justify-center"
                >
                    <span className="hidden sm:block">Tambah Pengguna</span>
                    <IoAdd size={20} className="sm:hidden" />
                </Link>
            </div>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4 dark:bg-gray-800">
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                            <th className="px-4 py-2">No</th>
                            <th className="px-4 py-2">NIM</th>
                            <th className="px-4 py-2">Nama Pengguna</th>
                            <th className="px-4 py-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user, index) => (
                                <tr key={user.id} className="border-b">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">
                                        {user.nim}
                                    </td>
                                    <td className="px-4 py-2">
                                    {user.name}
                                    </td>
                                    <td className="flex items-center space-x-2 p-2">
                                        <Link
                                            href={route(
                                                "users.show",
                                                user.id
                                            )}
                                            className="flex items-center justify-center w-7 h-7 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
                                        >
                                            <IoEye size={16} />
                                        </Link>

                                        <Link
                                            href={route(
                                                "users.edit",
                                                user.id
                                            )}
                                            className="flex items-center justify-center w-7 h-7 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 transition"
                                        >
                                            <HiOutlinePencilAlt size={16} />
                                        </Link>

                                        <Link
                                            href={route(
                                                "users.destroy",
                                                user.id
                                            )}
                                            method="delete"
                                            as="button"
                                            className="flex items-center justify-center w-7 h-7 text-white bg-red-500 rounded-md hover:bg-red-600 transition"
                                        >
                                            <IoTrash size={16} />
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
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
                page={users.current_page}
                resultsPerPage={users.per_page}
                totalResults={users.total}
                totalPages={users.last_page}
                setPage={(pageNumber) =>
                    (window.location.href = `${users.path}?page=${pageNumber}`)
                }
            />
        </AuthenticatedLayout>
    );
}
