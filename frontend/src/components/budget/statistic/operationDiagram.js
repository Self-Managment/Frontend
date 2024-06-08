import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const OperationDiagram = ({ data, labels, colors }) => {
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Expenses',
          data: data,
          backgroundColor: colors,
          hoverOffset: 4
        }
      ]
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed !== null) {
                label += new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'RUB'
                }).format(context.parsed);
              }
              return label;
            }
          }
        },
        datalabels: {
          color: '#ffffff',
          formatter: (value, context) => {
            return value;  // Возвращает значение данных для отображения
          }
        }
      }
    };

    return <Pie data={chartData} options={options} />;
};

export default OperationDiagram;
