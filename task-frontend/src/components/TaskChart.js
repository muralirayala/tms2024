import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import '../assets/styles/TaskChart.css'; // Import the CSS file

// Register chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

const TaskChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Task Status",
        data: [],
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
      },
    ],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3005/api/chart-data?type=pie"
        );
        const data = response.data;
        console.log("response", data);

        setChartData({
          labels: ["Completed", "In Progress", "Pending"],
          datasets: [
            {
              label: "Task Status",
              data: [data.completed, data.in_progress, data.pending],
              backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
              hoverBackgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching chart data", err);
        setError("Failed to load chart data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading Chart...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="chart-container">
      <div className="chart-wrapper">
        <h2>Task Status Pie Chart</h2>
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default TaskChart;
