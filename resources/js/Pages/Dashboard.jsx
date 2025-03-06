import InfoCard from "@/Components/Cards/InfoCard";
import RoundIcon from "@/Components/RoundIcon";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { IoIosPeople } from "react-icons/io";
import { FaMoneyBillWaveAlt, FaShoppingCart } from "react-icons/fa";
import { IoChatboxEllipses } from "react-icons/io5";
import {
    TableBody,
    TableContainer,
    Table,
    TableHeader,
    TableCell,
    TableRow,
    TableFooter,
    Avatar,
    Badge,
    Pagination,
} from "@windmill/react-ui";
import response from "../Utils/tableData";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);

    // paginate setup
    const resultsPerPage = 5;
    const totalResults = response.length;

    // pagination change control
    function onPageChange(page) {
        setPage(page);
    }

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

            <TableContainer>
                <Table>
                    <TableHeader>
                        <tr>
                            <TableCell>Client</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Date</TableCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {data.map((user, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <div className="flex items-center text-sm">
                                        <Avatar
                                            className="hidden mr-3 md:block"
                                            src={user.avatar}
                                            alt="User image"
                                        />
                                        <div>
                                            <p className="font-semibold">
                                                {user.name}
                                            </p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                                {user.job}
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm">
                                        $ {user.amount}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <Badge type={user.status}>
                                        {user.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm">
                                        {new Date(
                                            user.date
                                        ).toLocaleDateString()}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TableFooter>
                    <Pagination
                        totalResults={totalResults}
                        resultsPerPage={resultsPerPage}
                        label="Table navigation"
                        onChange={onPageChange}
                    />
                </TableFooter>
            </TableContainer>

            <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Charts
            </h1>
        </AuthenticatedLayout>
    );
}
