import React, { useState, useEffect } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import { IoSearch } from "react-icons/io5";

const DataChange = ({ oldValues, newValues }) => {
    const allKeys = Array.from(
        new Set([...Object.keys(oldValues), ...Object.keys(newValues)])
    );

    const filteredKeys = allKeys.filter((key) => key !== "updated_at");

    if (filteredKeys.length === 0) {
        return <span className="text-xs text-gray-500">N/A</span>;
    }

    const changes = filteredKeys.map((key) => {
        const oldValue =
            oldValues[key] !== null && oldValues[key] !== undefined
                ? String(oldValues[key])
                : "NULL";
        const newValue =
            newValues[key] !== null && newValues[key] !== undefined
                ? String(newValues[key])
                : "NULL";

        if (oldValue !== newValue) {
            return (
                <div key={key} className="text-xs">
                    <span className="font-semibold">{key}:</span>
                    <span className="text-red-500 line-through mx-1 break-all">
                        {oldValue}
                    </span>
                    <span className="text-green-500 break-all">{newValue}</span>
                </div>
            );
        }
        return null;
    });

    return changes.some((c) => c !== null) ? (
        <div className="space-y-1">{changes}</div>
    ) : (
        <span className="text-xs text-gray-500">
            Tidak ada perubahan nilai.
        </span>
    );
};

export default function AuditTrail() {
    const { audits } = usePage().props;
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredAudits, setFilteredAudits] = useState(audits.data);

    const getModelName = (modelPath) => {
        if (!modelPath) return "";
        return modelPath.split("\\").pop();
    };

    const getEventColor = (event) => {
        switch (event) {
            case "created":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
            case "updated":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
            case "deleted":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
        }
    };

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            const filtered = audits.data.filter((audit) => {
                const searchData = [
                    audit.user?.name,
                    audit.event,
                    getModelName(audit.auditable_type),
                    audit.ip_address,
                ]
                    .join(" ")
                    .toLowerCase();
                return searchData.includes(searchTerm.toLowerCase());
            });
            setFilteredAudits(filtered);
        }, 300);

        return () => clearTimeout(delaySearch);
    }, [searchTerm, audits.data]);

    return (
        <AuthenticatedLayout>
            <Head title="Jejak Audit" />
            <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Jejak Audit Sistem
            </h1>

            <div className="flex justify-between items-center mb-4">
                <div className="relative sm:w-1/3 w-2/3">
                    <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Cari log..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4 dark:bg-gray-800">
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                            <th className="px-4 py-2">Pengguna</th>
                            <th className="px-4 py-2">Aksi</th>
                            <th className="px-4 py-2">Model Terdampak</th>
                            <th className="px-4 py-2">Detail Perubahan</th>
                            <th className="px-4 py-2">Waktu</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 dark:text-gray-400">
                        {filteredAudits.length > 0 ? (
                            filteredAudits.map((audit) => (
                                <tr
                                    key={audit.id}
                                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
                                >
                                    <td className="px-4 py-2">
                                        <div className="font-semibold dark:text-gray-200">
                                            {audit.user
                                                ? audit.user.name
                                                : "Sistem"}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {audit.ip_address}
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">
                                        <span
                                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getEventColor(
                                                audit.event
                                            )}`}
                                        >
                                            {audit.event}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="font-semibold dark:text-gray-200">
                                            {getModelName(audit.auditable_type)}
                                        </div>
                                        <div
                                            className="text-xs text-gray-500 truncate"
                                            title={audit.auditable_id}
                                        >
                                            ID:{" "}
                                            {audit.auditable_id.substring(0, 8)}
                                            ...
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 font-mono">
                                        <DataChange
                                            oldValues={audit.old_values}
                                            newValues={audit.new_values}
                                        />
                                    </td>
                                    <td className="px-4 py-2 text-sm">
                                        {new Date(
                                            audit.created_at
                                        ).toLocaleString("id-ID", {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                        })}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="px-4 py-2 text-center text-gray-500"
                                >
                                    Tidak ada log audit yang cocok.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Pagination
                page={audits.current_page}
                resultsPerPage={audits.per_page}
                totalResults={audits.total}
                totalPages={audits.last_page}
                setPage={(pageNumber) => {
                    router.get(
                        audits.path,
                        { page: pageNumber },
                        {
                            preserveScroll: true,
                            preserveState: true,
                        }
                    );
                }}
            />
        </AuthenticatedLayout>
    );
}
