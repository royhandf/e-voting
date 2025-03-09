import React from "react";

function RoundIcon({
    icon: Icon,
    iconColorClass = "text-purple-600 dark:text-purple-100",
    bgColorClass = "bg-purple-100 dark:bg-purple-600",
    className = "",
}) {
    return (
        <div
            className={`p-3 rounded-full ${iconColorClass} ${bgColorClass} ${className}`}
        >
            <Icon className="w-5 h-5" />
        </div>
    );
}

export default RoundIcon;
