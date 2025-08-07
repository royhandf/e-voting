import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

export default function ChartResult({ results }) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    const isDarkMode = document.documentElement.classList.contains("dark");

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        if (!chartRef.current || !results || results.length === 0) {
            return;
        }

        const ctx = chartRef.current.getContext("2d");
        chartInstance.current = new Chart(ctx, {
            type: "pie",
            data: {
                labels: results.map((r) => r.name),
                datasets: [
                    {
                        data: results.map((r) => r.votes_count),
                        backgroundColor: [
                            "#4f46e5",
                            "#ec4899",
                            "#10b981",
                            "#f59e0b",
                            "#8b5cf6",
                            "#3b82f6",
                        ],
                        borderColor: isDarkMode ? "#1f2937" : "#fff",
                        borderWidth: 2,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "top",
                        labels: {
                            color: isDarkMode ? "#e5e7eb" : "#374151",
                            font: {
                                family: "'Inter', sans-serif",
                            },
                        },
                    },
                },
            },
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [results, isDarkMode]);

    return (
        <div className="relative h-full w-full flex items-center justify-center">
            <canvas ref={chartRef}></canvas>
        </div>
    );
}
