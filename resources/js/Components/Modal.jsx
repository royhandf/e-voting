import { IoClose } from "react-icons/io5";

export default function Modal({
    title,
    children,
    isOpen,
    onClose,
    size = "md",
}) {
    if (!isOpen) return null;

    const sizeClasses = {
        sm: "w-80",
        md: "w-96",
        lg: "w-[32rem]",
        xl: "w-[40rem]",
        "2xl": "w-[48rem]",
        full: "w-full max-w-[64rem]",
    };

    const widthClass = sizeClasses[size] || sizeClasses.md;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
            <div
                className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${widthClass} max-h-[90vh] overflow-y-auto`}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-100"
                    >
                        <IoClose size={24} />
                    </button>
                </div>

                <div className="p-4 space-y-2 text-gray-700 dark:text-gray-300">
                    {children}
                </div>
            </div>
        </div>
    );
}
