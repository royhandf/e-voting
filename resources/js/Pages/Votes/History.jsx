import { usePage, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";

export default function History() {
    const { votes } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Riwayat Pemilihan" />
            <div className="my-6">
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                    Riwayat Pemilihan
                </h1>

                {votes.data.length === 0 ? (
                    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mt-4">
                        <strong className="font-bold">
                            Belum ada riwayat!
                        </strong>
                        <span className="block sm:inline">
                            {" "}
                            Anda belum melakukan pemilihan.
                        </span>
                    </div>
                ) : (
                    <div className="mt-4 space-y-4">
                        {votes.data.map((vote) => (
                            <div
                                key={vote.id}
                                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
                            >
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                    {vote.election.title}
                                </h2>
                                <div className="flex items-center mt-2">
                                    <img
                                        src={vote.candidate.photo_url}
                                        alt={vote.candidate.name}
                                        className="w-16 h-16 object-cover rounded-full mr-3"
                                    />
                                    <div>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            Anda memilih{" "}
                                            <strong>
                                                {vote.candidate.name}
                                            </strong>
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Waktu:{" "}
                                            {new Date(
                                                vote.vote_time
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {votes.total > votes.per_page && (
                    <Pagination
                        page={votes.current_page}
                        resultsPerPage={votes.per_page}
                        totalResults={votes.total}
                        totalPages={votes.last_page}
                        setPage={(pageNumber) =>
                            (window.location.href = `${votes.path}?page=${pageNumber}`)
                        }
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
