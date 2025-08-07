import React from "react";
import RoundIcon from "@/Components/RoundIcon";

function InfoCard({ title, value, icon, iconColorClass, bgColorClass }) {
    return (
        <div className="flex items-center p-6 bg-white border border-gray-200 rounded-lg shadow-xs dark:bg-gray-800 dark:border-gray-700">
            <RoundIcon
                icon={icon}
                iconColorClass={iconColorClass}
                bgColorClass={bgColorClass}
                className="mr-4"
            />
            <div>
                <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {title}
                </p>
                <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                    {value}
                </p>
            </div>
        </div>
    );
}

export default InfoCard;
