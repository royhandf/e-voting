import React from "react";

function InfoCard({ title, value, children: icon }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center">
            <div className="mr-4 text-gray-600 dark:text-gray-400">{icon}</div>
            <div>
                <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    {title}
                </p>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    {value}
                </p>
            </div>
        </div>
    );
}

export default InfoCard;
