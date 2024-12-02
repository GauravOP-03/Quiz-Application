import "@fontsource/montserrat";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Registering required Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);
export default function Submit() {
  const data = {
    labels: ["Apples", "Bananas", "Cherries", "Grapes", "Oranges"],
    datasets: [
      {
        data: [200, 300, 150, 100, 250],
        backgroundColor: [
          "#FF6347", // Tomato red
          "#FFD700", // Gold
          "#8A2BE2", // BlueViolet
          "#32CD32", // LimeGreen
          "#FF4500", // OrangeRed
        ],
        borderColor: [
          "#FF6347", // Tomato red
          "#FFD700", // Gold
          "#8A2BE2", // BlueViolet
          "#32CD32", // LimeGreen
          "#FF4500", // OrangeRed
        ],
        borderWidth: 1,
      },
    ],
  };

  // Options for the pie chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
  };
  return (
    <div
      className="h-screen font-montserrat h-screen py-6 text-gray-200  px-3 sm:px-10 flex flex-col items-center"
      style={{
        backgroundImage:
          "linear-gradient(to left top, #000020, #171950, #422686, #783069, #b13103)",
      }}
    >
      <div>
        <h1
          className="text-center  text-8xl  font-extrabold tracking-wide  leading-tight translate-y-11 text-transparent bg-clip-text bg-gradient-to-r from-purple-500
        to-orange-500 leading-loose"
        >
          COMPLETED
        </h1>
      </div>

      <div className="flex justify-between w-4/6 text-3xl font-bold">
        <div>
          <h3 className="">SCORE</h3>
          <h3></h3>
          <h3 className="text-lg font-medium">TOTAL QUESTION</h3>
          <h3 className="text-lg font-medium">ATTEMPTED</h3>
          <h3 className="text-lg font-medium">NOT ATTEMPETED</h3>
        </div>
        <h3>Analytics</h3>
      </div>
    </div>
  );
}
