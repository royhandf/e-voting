import InfoCard from "@/Components/Cards/InfoCard";
import RoundIcon from "@/Components/RoundIcon";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { IoIosPeople } from "react-icons/io";
import { FaMoneyBillWaveAlt, FaShoppingCart } from "react-icons/fa";
import { IoChatboxEllipses } from "react-icons/io5";
import response from "../Utils/tableData";
import { useEffect, useState } from "react";
import Pagination from "@/Components/Pagination";

export default function Dashboard() {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);

    // paginate setup
    const resultsPerPage = 5;
    const totalResults = response.length;
    const totalPages = Math.ceil(totalResults / resultsPerPage);

    useEffect(() => {
        setData(
            response.slice((page - 1) * resultsPerPage, page * resultsPerPage)
        );
    }, [page]);

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Dashboard
            </h1>

            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                <InfoCard title="Total clients" value="6389">
                    <RoundIcon
                        icon={IoIosPeople}
                        iconColorClass="text-orange-500 dark:text-orange-100"
                        bgColorClass="bg-orange-100 dark:bg-orange-500"
                        className="mr-4"
                    />
                </InfoCard>

                <InfoCard title="Account balance" value="$ 46,760.89">
                    <RoundIcon
                        icon={FaMoneyBillWaveAlt}
                        iconColorClass="text-green-500 dark:text-green-100"
                        bgColorClass="bg-green-100 dark:bg-green-500"
                        className="mr-4"
                    />
                </InfoCard>

                <InfoCard title="New sales" value="376">
                    <RoundIcon
                        icon={FaShoppingCart}
                        iconColorClass="text-blue-500 dark:text-blue-100"
                        bgColorClass="bg-blue-100 dark:bg-blue-500"
                        className="mr-4"
                    />
                </InfoCard>

                <InfoCard title="Pending contacts" value="35">
                    <RoundIcon
                        icon={IoChatboxEllipses}
                        iconColorClass="text-teal-500 dark:text-teal-100"
                        bgColorClass="bg-teal-100 dark:bg-teal-500"
                        className="mr-4"
                    />
                </InfoCard>
            </div>

            <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
                <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                            <th className="py-3 px-4 text-left">Client</th>
                            <th className="py-3 px-4 text-left">Amount</th>
                            <th className="py-3 px-4 text-left">Status</th>
                            <th className="py-3 px-4 text-left">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user, i) => (
                            <tr
                                key={i}
                                className="border-t border-gray-200 dark:border-gray-700"
                            >
                                <td className="py-2 px-4 flex items-center text-gray-700 dark:text-gray-200">
                                    <img
                                        src={user.avatar}
                                        alt="Avatar"
                                        className="w-8 h-8 rounded-full mr-3"
                                    />
                                    <div>
                                        <p className="font-semibold">
                                            {user.name}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {user.job}
                                        </p>
                                    </div>
                                </td>
                                <td className="py-2 px-4 text-gray-700 dark:text-gray-200">
                                    ${user.amount}
                                </td>
                                <td className="py-2 px-4">
                                    <span
                                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            user.status === "Active"
                                                ? "bg-green-100 dark:bg-green-600 text-green-600 dark:text-green-100"
                                                : "bg-red-100 dark:bg-red-600 text-red-600 dark:text-red-100"
                                        }`}
                                    >
                                        {user.status}
                                    </span>
                                </td>
                                <td className="py-2 px-4 text-gray-700 dark:text-gray-200">
                                    {new Date(user.date).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination Info */}
                <Pagination
                    page={page}
                    resultsPerPage={resultsPerPage}
                    totalResults={totalResults}
                    totalPages={totalPages}
                    setPage={setPage}
                />
            </div>

            <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Charts
            </h1>
        </AuthenticatedLayout>
    );
}
