import { motion } from "framer-motion";
import { IoShieldHalfOutline, IoBarChart } from "react-icons/io5";
import { AiFillClockCircle } from "react-icons/ai";

const iconMap = {
    IoShieldHalfOutline: IoShieldHalfOutline,
    AiFillClockCircle: AiFillClockCircle,
    IoBarChart: IoBarChart,
};

export default function FeatureCard({ icon, title, description }) {
    const IconComponent = iconMap[icon];

    return (
        <motion.div
            className="flex flex-col items-center text-center p-8 bg-white rounded-lg w-full max-w-sm mx-auto border border-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-300 ease-in-out"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
        >
            {IconComponent && (
                <IconComponent className="text-4xl text-purple-600" />
            )}
            <h3 className="mt-4 mb-3 text-xl font-semibold">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </motion.div>
    );
}
