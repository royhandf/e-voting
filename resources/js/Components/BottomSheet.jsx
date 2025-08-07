import React from "react";
import { IoClose } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";

export default function BottomSheet({ title, children, isOpen, onClose }) {
    const variants = {
        initial: { y: "100%" },
        animate: { y: "0%" },
        exit: { y: "100%" },
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 flex items-end z-50 bg-black bg-opacity-50"
                >
                    <motion.div
                        variants={variants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white dark:bg-gray-800 rounded-t-2xl shadow-lg max-h-[90vh] overflow-y-auto w-full"
                    >
                        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                {title}
                            </h3>
                            <button
                                onClick={onClose}
                                className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 p-1 rounded-full"
                            >
                                <IoClose size={24} />
                            </button>
                        </div>
                        <div className="p-4">{children}</div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
