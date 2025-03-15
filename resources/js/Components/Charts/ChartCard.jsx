import React from "react";
import SelectInput from "../SelectInput";

function ChartCard({
    children,
    title,
    elections,
    selectedElection,
    setSelectedElection,
}) {
    return (
        <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <div className="flex justify-between items-center mb-4">
                <p className="font-semibold text-gray-800 dark:text-gray-300">
                    {title}
                </p>
                <SelectInput
                    key={selectedElection}
                    value={selectedElection || ""}
                    onChange={(e) => setSelectedElection(e.target.value)}
                    options={elections
                        .filter((election) => election.status === "active")
                        .map((election) => ({
                            value: election.id,
                            label: election.title,
                        }))}
                    className="w-48"
                />
            </div>
            {children}
        </div>
    );
}

export default ChartCard;
