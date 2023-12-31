import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const CodeMetricsChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Check if a Chart instance already exists
    if (chartRef.current) {
      // If it does, destroy the existing instance
      chartRef.current.destroy();
    }

    // Sample data and configuration (replace with your actual data)
    const data = {
      labels: ['Label 1', 'Label 2', 'Label 3'],
      datasets: [
        {
          label: 'Sample Dataset',
          data: [10, 20, 30],
          backgroundColor: ['red', 'green', 'blue'],
        },
      ],
    };

    const config = {
      type: 'bar', // Specify the chart type (bar, line, pie, etc.)
      data: data,
      options: {
        // Additional chart options
      },
    };

    // Create a new Chart instance
    const ctx = document.getElementById('codeMetricsChart');
    chartRef.current = new Chart(ctx, config);

    // Clean up the Chart instance on component unmount
    return () => {
      chartRef.current.destroy();
    };
  }, []); // Empty dependency array to run the effect only on mount and unmount

  return (
    <div>
      <canvas id="codeMetricsChart" width="400" height="400"></canvas>
    </div>
  );
};

export default CodeMetricsChart;
