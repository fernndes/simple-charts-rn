import React from 'react';
import { View } from 'react-native';
import Svg, { G, Rect, Line, Text, Polyline, Defs, LinearGradient, Stop, ClipPath, Polygon, Path } from 'react-native-svg'
import * as d3 from 'd3'


export default function LineChart(props) {
  const { data, round, unit, marginGraph, barWidth, axisColor, barColor, SVGHeight, SVGWidth } = props

  const colors = {
    axis: axisColor,
    bars: barColor
  }

  // Dimensions
  const graphHeight = SVGHeight - 2 * marginGraph
  const graphWidth = SVGWidth - 2 * marginGraph


  // Y scale linear
  const maxValue = d3.max(data, d => d.value)
  const topValue = Math.ceil(maxValue / round) * round
  const yDomain = [0, topValue]
  const yRange = [0, graphHeight]
  const y = d3.scaleLinear()
    .domain(yDomain)
    .range(yRange)

  // top axis and middle axis
  const middleValue = topValue / 2

  const points3 = data.map(function (item, index) {
    if (index == 0) {
      return (`M${(graphWidth / Math.ceil(data.length)) * index + 10}${' '}${y(-item.value)}`)
    }
    return (`L${(graphWidth / Math.ceil(data.length)) * index + 10}${' '}${y(-item.value)}`)
  })

  const points2 = data.map(function (item, index) {
    if (index == 0) {
      return (`M${(graphWidth / Math.ceil(data.length)) * index + 10} 0 L${(graphWidth / Math.ceil(data.length)) * index + 10}${' '}${y(-item.value)}`)
    }
    if(index == data.length-1){
      return (`L${(graphWidth / Math.ceil(data.length)) * index + 10}${' '}${y(-item.value)} L${(graphWidth / Math.ceil(data.length)) * index + 10} 0`)
    }
    return (`L${(graphWidth / Math.ceil(data.length)) * index + 10}${' '}${y(-item.value)}`)
  })


  return (
    <Svg width={SVGWidth} height={SVGHeight}>
      <G y={graphHeight + marginGraph}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="1" x2="0" y2="0">
            <Stop offset="0" stopColor="#FFD080" stopOpacity="1" />
            <Stop offset="1" stopColor="red" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        {/* Top value label */}
        <Text
                    x={graphWidth}
                    textAnchor="end"
                    y={y(topValue) * -1 - 5}
                    fontSize={12}
                    fill="black"
                    fillOpacity={0.4}>
                    {topValue + ' ' + unit}
                </Text>
        {/* top axis */}
        <Line
                    x1="0"
                    y1={y(topValue) * -1}
                    x2={graphWidth}
                    y2={y(topValue) * -1}
                    stroke={colors.axis}
                    strokeDasharray={[3, 3]}
                    strokeWidth="0.5"
                />

                {/* middle axis */}
                <Line
                    x1="0"
                    y1={y(middleValue) * -1}
                    x2={graphWidth}
                    y2={y(middleValue) * -1}
                    stroke={colors.axis}
                    strokeDasharray={[3, 3]}
                    strokeWidth="0.5"
                />

                {/* bottom axis */}
                <Line
                    x1="0"
                    y1="2"
                    x2={graphWidth}
                    y2="2"
                    stroke={colors.axis}
                    strokeWidth="0.5"
                />
        <Path
          d={`${points2}`}
          fill="url(#grad)"
        />
        <Path
          d={`${points3}`}
          fill="none"
          stroke="red"
        />

        {/* {data.map((item, index) => (
          <Text
            key={'label' + item.label}
            fontSize="8"
            fill={'black'}
            x={(graphWidth / Math.ceil(data.length)) * index + 10}
            y="10"
            textAnchor="middle">{item.label}</Text>
        ))} */}
      </G>
    </Svg>
  )

}
