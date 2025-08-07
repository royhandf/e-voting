import React from "react";
import { motion } from "framer-motion";

const CandidateCard = ({ candidate, onClick }) => {
    return (
        <motion.div
            className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 cursor-pointer w-full"
            onClick={onClick}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <div className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-purple-600 text-white font-bold rounded-full border-2 border-white shadow-md">
                {candidate.number}
            </div>

            <div className="relative w-full h-72 bg-gray-100">
                <img
                    src={candidate.photo_url}
                    alt={candidate.name}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
            </div>

            <div className="p-5 text-center">
                <h3 className="text-lg font-bold text-gray-900 truncate">
                    {candidate.name}
                </h3>
                <p className="text-sm text-gray-500 font-medium mt-1">
                    Calon Pemilihan Mahasiswa
                </p>

                <div className="mt-4">
                    <span className="inline-block bg-purple-100 text-purple-700 font-semibold px-5 py-2 text-sm rounded-full group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                        Lihat Detail
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default CandidateCard;
