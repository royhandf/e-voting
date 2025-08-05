import React from "react";
import { motion } from "framer-motion";
import { FiInfo } from "react-icons/fi";
import { Link as ScrollLink } from "react-scroll";

const NoCandidates = () => {
    return (
        <motion.div
            className="max-w-xl w-full flex flex-col items-center justify-center p-6 md:p-16 bg-white rounded-lg border border-gray-300 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 mb-4 bg-purple-100 rounded-full">
                <FiInfo className="text-4xl text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                Kandidat Akan Segera Diumumkan
            </h3>
            <p className="text-gray-500 max-w-md text-center">
                Daftar lengkap kandidat pemilwa akan dipublikasikan sesuai
                jadwal yang telah ditetapkan. Silakan periksa kembali nanti.
            </p>
            <ScrollLink
                to="testimoni"
                smooth={true}
                duration={500}
                offset={-90}
                className="mt-8 bg-purple-600 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-purple-700 transition-all cursor-pointer"
            >
                Lihat Testimoni
            </ScrollLink>
        </motion.div>
    );
};

export default NoCandidates;
