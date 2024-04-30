import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const RadialChart = () => {
    const initialState = {
        series: [44, 55, 67],
        options: {
            chart: {
                height: 350,
                type: 'radialBar',
            },
            legend: {
                show: true,
                position: 'bottom',
                onItemClick: {
                    toggleDataSeries: true
                },
                onItemHover: {
                    highlightDataSeries: true
                }
            },
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        name: {
                            fontWeight: '22px',
                            // color:'red'
                        },
                        value: {
                            fontWeight: '16px',
                        },
                        total: {
                            show: true,
                            label: 'Total',
                            formatter: function (w) {
                                return 10;
                            }
                        }
                    }
                }
            },
            labels: ['Approved', 'Rejected', 'Pending'],
            colors: ['#36A2EB', '#FF6384', '#4CAF50']
        }
    };
    const [chartData, setChartData] = useState(initialState);

    return (
        <div>
            <p className='text-2xl '>Monthly Progress</p>
            <div id='chart' className='mt-[3%] '>
                <ReactApexChart type="radialBar" height={500} options={chartData.options} series={chartData.series} />
            </div>
        </div>
    );
};

export default RadialChart;
