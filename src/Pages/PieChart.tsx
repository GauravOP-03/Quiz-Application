// PieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the required chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  // Data for the pie chart
  const data = {
    labels: ["Red", "Blue", "Green", "Yellow", "Purple"], // Labels for sections
    datasets: [
      {
        data: [20, 25, 15, 30, 10], // Values for each section
        backgroundColor: [
          "#FF5733", // Vibrant Red
          "#3498DB", // Vibrant Blue
          "#2ECC71", // Vibrant Green
          "#F1C40F", // Vibrant Yellow
          "#9B59B6", // Vibrant Purple
        ],
        borderWidth: 1, // Optional: Border width of slices
      },
    ],
  };

  // Options for the pie chart
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(to left top, #000020, #171950, #422686, #783069, #b13103)",
        backgroundSize: "cover",
        padding: "50px",
        textAlign: "center",
        borderRadius: "10px",
      }}
    >
      <h2 style={{ color: "white", marginBottom: "30px" }}>
        Vibrant Pie Chart
      </h2>
      <div style={{ width: "300px", height: "300px", margin: "0 auto" }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
