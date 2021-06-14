import React, { Component } from "react";
import { Grid, TextField } from "@material-ui/core";
import { Bar } from '@ant-design/charts';
import { Line } from '@ant-design/charts';
import { Pie } from '@ant-design/charts';

const ReportPage = props => {
  var data = [
    {
      year: '1951',
      value: 38,
    },
    {
      year: '1952',
      value: 52,
    },
    {
      year: '1956',
      value: 61,
    },
    {
      year: '1957',
      value: 145,
    },
    {
      year: '1958',
      value: 48,
    },
  ];

  var data1 = [
    {
      type: 'Category One',
      value: 27,
    },
    {
      type: 'Category Two',
      value: 25,
    },
    {
      type: 'Category Three',
      value: 18,
    },
    {
      type: 'Category Four',
      value: 15,
    },
    {
      type: 'Category Five',
      value: 10,
    },
    {
      type: 'other',
      value: 5,
    },
  ];

  var config = {
    data: data,
    xField: 'value',
    yField: 'year',
    seriesField: 'year',
    legend: { position: 'top-left' },
    style: {
      with: '300px',
      height: '300px',
      margin: '20px 20px 20px 20px',
      border: '5px solid rgba(0, 0, 0, 0.05)',
      padding: '15px 15px 15px 15px'
    }
  };

  var configPie = {
    appendPadding: 10,
    data: data1,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [{ type: 'pie-legend-active' }, { type: 'element-active' }],
    style: {
      with: '300px',
      height: '300px',
      margin: '20px 20px 20px 20px',
      border: '5px solid rgba(0, 0, 0, 0.05)',
      padding: '15px 15px 15px 15px'
    }
  };

  var data2 = [
    {
      year: '1991',
      value: 3,
    },
    {
      year: '1992',
      value: 4,
    },
    {
      year: '1993',
      value: 3.5,
    },
    {
      year: '1994',
      value: 5,
    },
    {
      year: '1995',
      value: 4.9,
    },
    {
      year: '1996',
      value: 6,
    },
    {
      year: '1997',
      value: 7,
    },
    {
      year: '1998',
      value: 9,
    },
    {
      year: '1999',
      value: 13,
    },
  ];
  var configLine = {
    data: data2,
    xField: 'year',
    yField: 'value',
    label: {},
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2,
      },
    },
    tooltip: { showMarkers: false },
    state: {
      active: {
        style: {
          shadowColor: 'yellow',
          shadowBlur: 4,
          stroke: 'transparent',
          fill: 'red',
        },
      },
    },
    theme: {
      geometries: {
        point: {
          diamond: {
            active: {
              style: {
                shadowColor: '#FCEBB9',
                shadowBlur: 2,
                stroke: '#F6BD16',
              },
            },
          },
        },
      },
    },
    interactions: [{ type: 'marker-active' }],
    style: {
      with: '300px',
      height: '300px',
      margin: '20px 20px 20px 20px',
      border: '5px solid rgba(0, 0, 0, 0.05)',
      padding: '15px 15px 15px 15px'
    }
  };



  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Grid container style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <span style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize:'25px', fontWeight:'bold' }}> Reportes Estadisticos </span>
        <Grid item xs={6}>
          <Bar {...config} />
        </Grid>
        <Grid item xs={6}>
          <Pie {...configPie} />
        </Grid>
        <Grid item xs={6}>
          <Pie {...configPie} />
        </Grid>
        <Grid item xs={6}>
          <Line {...configLine} />
        </Grid>
      </Grid>
    </div>

  );
}

export default ReportPage;