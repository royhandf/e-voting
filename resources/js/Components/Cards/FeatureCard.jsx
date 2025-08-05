import React from "react";
import { FaShieldAlt, FaClock, FaChartBar } from "react-icons/fa";

const icons = {
    keamanan: <FaShieldAlt className="text-purple-500" size={24} />,
    kemudahan: <FaClock className="text-purple-500" size={24} />,
    transparansi: <FaChartBar className="text-purple-500" size={24} />,
};

const FeatureCard = ({ icon, title, description }) => {
    return (
        <div className="h-full bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-purple-300 transition-all duration-300 flex items-start space-x-6">
            <div className="flex-shrink-0 bg-purple-100 p-4 rounded-full">
                {icons[icon]}
            </div>
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {title}
                </h3>
                <p className="text-gray-500">{description}</p>
            </div>
        </div>
    );
};

export default FeatureCard;
