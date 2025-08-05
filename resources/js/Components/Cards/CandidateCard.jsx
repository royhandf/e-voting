import React from "react";

const CandidateCard = ({ candidate, number, onClick }) => {
    return (
        <div
            className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            onClick={onClick}
        >
            <div className="absolute top-4 right-4 z-10 w-14 h-14 flex items-center justify-center bg-purple-600 text-white font-bold text-2xl rounded-full border-4 border-white shadow-md">
                {String(number).padStart(2, "0")}
            </div>
            <div className="h-64 w-full overflow-hidden">
                <img
                    src={candidate.photo_url}
                    alt={candidate.name}
                    className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-300"
                />
            </div>
            <div className="p-6 text-left">
                <h3 className="text-xl font-bold text-gray-900 truncate">
                    {candidate.name}
                </h3>
                <p className="text-purple-700 font-medium mt-1">
                    Pasangan Calon
                </p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <span className="inline-flex items-center text-gray-600 font-semibold group-hover:text-purple-600 transition-colors">
                        Lihat Visi & Misi
                        <svg
                            className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CandidateCard;
