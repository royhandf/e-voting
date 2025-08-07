import React, { useState, useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import ChartCard from "./ChartCard";
import { hexToRgba } from "@/Utils/colors";
import { IoStatsChartOutline } from "react-icons/io5";

export default function ChartVote({
    elections,
    voteResults: initialVoteResults,
}) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    const [selectedElection, setSelectedElection] = useState(() => {
        const activeElection = elections.find((e) => e.status === "active");
        return activeElection
            ? activeElection.id
            : elections.length > 0
            ? elections[0].id
            : "";
    });

    const [voteResults, setVoteResults] = useState(initialVoteResults);

    const [isDarkMode, setIsDarkMode] = useState(
        () =>
            typeof window !== "undefined" &&
            document.documentElement.classList.contains("dark")
    );

    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === "class") {
                    setIsDarkMode(
                        document.documentElement.classList.contains("dark")
                    );
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });

        return () => observer.disconnect();
    }, []);

    const baseColors = [
        "#4f46e5",
        "#ec4899",
        "#10b981",
        "#f59e0b",
        "#8b5cf6",
        "#3b82f6",
    ];

    // Memisahkan data yang difilter ke dalam state tersendiri
    const [filteredVotes, setFilteredVotes] = useState([]);

    useEffect(() => {
        const filtered = voteResults
            .filter((vote) => vote.election_id === selectedElection)
            .sort((a, b) => b.votes - a.votes);
        setFilteredVotes(filtered);
    }, [selectedElection, voteResults]);

    useEffect(() => {
        // Jangan render chart jika tidak ada data atau canvas
        if (
            !chartRef.current ||
            !selectedElection ||
            filteredVotes.length === 0
        ) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
            return;
        }

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext("2d");

        const tickColor = isDarkMode ? "#d1d5db" : "#4b5563";
        const gridColor = isDarkMode ? "#374151" : "#f3f4f6";

        const backgroundColors = filteredVotes.map((_, index) => {
            const color = baseColors[index % baseColors.length];
            return hexToRgba(color, 0.75);
        });

        const borderColors = filteredVotes.map((_, index) => {
            return baseColors[index % baseColors.length];
        });

        chartInstance.current = new Chart(ctx, {
            type: "bar",
            data: {
                labels: filteredVotes.map((vote) => vote.candidate_name),
                datasets: [
                    {
                        label: "Total Suara",
                        data: filteredVotes.map((vote) => vote.votes),
                        backgroundColor: backgroundColors,
                        borderColor: borderColors,
                        borderWidth: 2,
                        borderRadius: 8,
                        borderSkipped: false,
                        barPercentage: 0.5,
                        categoryPercentage: 0.8,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        enabled: true,
                        backgroundColor: "#111827",
                        titleFont: { size: 14, weight: "bold" },
                        bodyFont: { size: 12 },
                        padding: 12,
                        cornerRadius: 8,
                        displayColors: false,
                        yAlign: "bottom",
                        callbacks: {
                            title: (tooltipItems) => tooltipItems[0].label,
                            label: (context) =>
                                `Total Suara: ${context.parsed.y.toLocaleString(
                                    "id-ID"
                                )}`,
                        },
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0,
                            color: tickColor,
                            font: { family: "Inter, sans-serif" },
                        },
                        grid: {
                            color: gridColor,
                            drawBorder: false,
                        },
                    },
                    x: {
                        ticks: {
                            color: tickColor,
                            font: {
                                family: "Inter, sans-serif",
                                weight: "500",
                            },
                        },
                        grid: { display: false },
                    },
                },
            },
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, [filteredVotes, isDarkMode]);

    useEffect(() => {
        if (window.Echo) {
            const channel = window.Echo.channel("votes");
            channel.listen(".VoteUpdated", (data) => {
                setVoteResults((prevVotes) => {
                    const updatedVotes = [...prevVotes];
                    data.votes.forEach((updatedVote) => {
                        const existingVoteIndex = updatedVotes.findIndex(
                            (v) =>
                                v.candidate_name ===
                                    updatedVote.candidate_name &&
                                v.election_id === updatedVote.election_id
                        );
                        if (existingVoteIndex > -1)
                            updatedVotes[existingVoteIndex] = updatedVote;
                        else updatedVotes.push(updatedVote);
                    });
                    return updatedVotes;
                });
            });
            return () => channel.stopListening(".VoteUpdated");
        }
    }, []);

    return (
        <ChartCard
            title="Hasil Perolehan Suara"
            elections={elections}
            selectedElection={selectedElection}
            setSelectedElection={setSelectedElection}
        >
            <div className="relative h-96">
                {filteredVotes.length > 0 ? (
                    <canvas ref={chartRef} />
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500">
                        <IoStatsChartOutline className="w-16 h-16 mb-4" />
                        <p className="text-lg font-medium">Belum Ada Suara</p>
                        <p className="text-sm">
                            Data akan muncul di sini setelah ada suara yang
                            masuk.
                        </p>
                    </div>
                )}
            </div>
        </ChartCard>
    );
}
