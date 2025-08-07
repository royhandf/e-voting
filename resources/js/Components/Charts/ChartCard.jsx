import React from "react";
import SelectInput from "../SelectInput";

function ChartCard({
    children,
    title,
    elections,
    selectedElection,
    setSelectedElection,
}) {
    const activeElections = elections.filter((e) => e.status === "active");

    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    {title}
                </h2>
                {activeElections.length > 0 && (
                    <SelectInput
                        value={selectedElection || ""}
                        onChange={(e) => setSelectedElection(e.target.value)}
                        options={activeElections.map((election) => ({
                            value: election.id,
                            label: election.title,
                        }))}
                        className="w-full sm:w-56 text-sm"
                    />
                )}
            </div>
            {children}
        </>
    );
}

export default ChartCard;
