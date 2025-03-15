import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import ChartCard from "./ChartCard";

export default function ChartVote({
    elections,
    voteResults: initialVoteResults,
}) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [selectedElection, setSelectedElection] = useState(
        elections.length > 0 ? elections[0].id : ""
    );
    const [voteResults, setVoteResults] = useState(initialVoteResults);

    const colors = [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF",
        "#FF9F40",
    ];

    useEffect(() => {
        const channel = window.Echo.channel("votes");
        channel.listen(".VoteUpdated", (data) => {
            setVoteResults((prevVotes) => {
                const updatedVotes = [...prevVotes];

                data.votes.forEach((updatedVote) => {
                    const validVote = {
                        candidate_name: updatedVote.candidate_name,
                        votes: updatedVote.votes,
                        election_id: updatedVote.election_id,
                    };

                    const existingVote = updatedVotes.find(
                        (vote) =>
                            vote.candidate_name === validVote.candidate_name &&
                            vote.election_id === validVote.election_id
                    );

                    if (existingVote) {
                        existingVote.votes = validVote.votes;
                    } else {
                        updatedVotes.push(validVote);
                    }
                });

                return updatedVotes;
            });
        });

        return () => {
            channel.stopListening(".VoteUpdated");
        };
    }, []);

    useEffect(() => {
        if (!chartRef.current || !selectedElection) return;

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext("2d");

        const filteredVotes = voteResults.filter(
            (vote) => vote.election_id === selectedElection
        );

        chartInstance.current = new Chart(ctx, {
            type: "bar",
            data: {
                labels: filteredVotes.map((vote) => vote.candidate_name),
                datasets: [
                    {
                        label: "Total Votes",
                        data: filteredVotes.map((vote) => vote.votes),
                        backgroundColor: colors.slice(0, filteredVotes.length),
                        borderColor: colors.slice(0, filteredVotes.length),
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { stepSize: 1, precision: 0 },
                    },
                },
            },
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [selectedElection, voteResults]);

    return (
        <ChartCard
            title="Hasil Pemilihan"
            elections={elections}
            selectedElection={selectedElection}
            setSelectedElection={setSelectedElection}
        >
            <div style={{ width: "100%", height: "400px" }}>
                <canvas ref={chartRef} />
            </div>
        </ChartCard>
    );
}
