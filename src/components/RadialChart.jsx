import React, { useState } from 'react';
import ApexCharts from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
const RadialChart = () => {
    const initialtSate ={
        series:[44,55,67],
        options:{
            chart:{
                height:350,
                type:'radialBar',
            },
            legend: {
                show: true,
                position:'bottom',
                onItemClick: {
                  toggleDataSeries: true
                },
                onItemHover: {
                  highlightDataSeries: true
                }
              },
            plotOptions:{
                radialBar:{
                    dataLabels:{
                        name:{
                            fontSize:'22px',
                            // color:'red'
                        },
                        value:{
                            fontSize:'16px',
                        },
                        total:{
                            show:true,
                            label:'Total',
                            formatter: function (w) {
                                return 10;
                            }
                        }
                    }
                }
            },
            labels:['Approved','Rejected','Pending'],
            colors: ['#36A2EB', '#FF6384', '#4CAF50']
        }
    }
    const [chartData, setChartData] = useState(initialtSate);
    return (
        <div className="">
            <p className='text-2xl '>Monthly Progress</p>
            <div id='chart' className='mt-[3%] '>
            <ReactApexChart
            type="radialBar" height={500}
              options={chartData.options} series={chartData.series}  />
        </div>
       
        </div>

    );
};

export default RadialChart;