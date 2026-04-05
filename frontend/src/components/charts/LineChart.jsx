import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function LineChart({ data, options }) {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1e293b',
        padding: 12,
        borderRadius: 8,
        titleFont: {
          size: 12,
          weight: 'normal',
        },
        bodyFont: {
          size: 14,
          weight: 'bold',
        },
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
          color: '#94a3b8',
        },
      },
      y: {
        grid: {
          color: '#e2e8f0',
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 11,
          },
          color: '#94a3b8',
        },
      },
    },
    ...options,
  };

  return <Line data={data} options={defaultOptions} />;
}
