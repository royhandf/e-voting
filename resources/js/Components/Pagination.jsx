import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({
    page,
    resultsPerPage,
    totalResults,
    totalPages,
    setPage,
}) => {
    return (
        <div className="flex justify-between items-center mt-4">
            {/* Pagination Info */}
            <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                Showing{" "}
                {Math.min((page - 1) * resultsPerPage + 1, totalResults)}-
                {Math.min(page * resultsPerPage, totalResults)} of{" "}
                {totalResults} results
            </span>

            {/* Pagination */}
            <nav className="flex justify-center items-center">
                <ul className="flex items-center space-x-0">
                    <li>
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            className="flex items-center justify-center w-[1.85rem] h-[1.85rem] 
                                text-gray-500 dark:text-gray-400 
                                bg-white dark:bg-gray-800 
                                rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 
                                disabled:opacity-50 disabled:pointer-events-none"
                        >
                            <FaChevronLeft size={13} />
                        </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <li key={i}>
                            <button
                                onClick={() => setPage(i + 1)}
                                className={`flex items-center justify-center w-[1.85rem] h-[1.85rem] 
                                    rounded-md text-sm font-medium transition-all 
                                    ${
                                        page === i + 1
                                            ? "bg-purple-600 text-white"
                                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={page === totalPages}
                            className="flex items-center justify-center w-[1.85rem] h-[1.85rem] 
                                text-gray-500 dark:text-gray-400 
                                bg-white dark:bg-gray-800 
                                rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 
                                disabled:opacity-50 disabled:pointer-events-none"
                        >
                            <FaChevronRight size={13} />
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
