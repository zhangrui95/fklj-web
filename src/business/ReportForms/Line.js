import React, { PropTypes } from 'react';
import ReactHighcharts from 'react-highcharts';

function Line(props) {



  if (!props.statistic) return <p>数据异常</p>;



    let json = {  //测试数据
        categories: [
            '数学',
            '语文',
            '英语',
        ],
        series: [
            {
                name: 'test1',
                data: [
                    55,
                    20,
                    60
                ]
            },
            {
                name: 'test2',
                data: [
                    99,
                    70,
                    44
                ]
            },
            {
                name: 'test3',
                data: [
                    21,
                    32,
                    12
                ]
            }
        ]
    };





    //props.statistic.chart

  const { categories, series } = json;
  const config = {
    credits: {
      enabled: false
    },
    title: {
      text: 'Monthly Average Temperature',
      x: -20
    },
    subtitle: {
      text: 'Source: WorldClimate.com',
      x: -20
    },
    xAxis: {
      categories
    },
    yAxis: {
      title: {
        text: 'Temperature (°C)'
      }
    },
    tooltip: {
      valueSuffix: '°C'
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      borderWidth: 0
    },
    series
  };
  return (
    <ReactHighcharts config={config}/>
  );
}

Line.propTypes = {
  statistic: PropTypes.any
};

export default Line;
