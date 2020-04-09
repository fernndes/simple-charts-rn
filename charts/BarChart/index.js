import React from 'react';
import { View } from 'react-native';
import { Svg, G, Rect, Line, Text } from 'react-native-svg'
import * as d3 from 'd3'


export default function BarChart(props) {
    const { data, round, unit, marginGraph, barWidth, axisColor, barColor, SVGHeight, SVGWidth } = props

    const colors = {
        axis: axisColor,
        bars: barColor
    }

    // Dimensions
    const graphHeight = SVGHeight - 2 * marginGraph
    const graphWidth = SVGWidth - 2 * marginGraph

    // X scale point
    const xDomain = data.map(item => item.label)
    const xRange = [0, graphWidth]
    const x = d3.scalePoint()
        .domain(xDomain)
        .range(xRange)
        .padding(1)

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

    return (
        <Svg width={SVGWidth} height={SVGHeight}>
            <G y={graphHeight + marginGraph}>
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

                {/* bars */}
                {data.map(item => (
                    <>
                        <Text
                            key={'barValue' + item.label}
                            fontSize="6"
                            fill={'black'}
                            x={x(item.label)}
                            y={y(-item.value - 15)}
                            textAnchor="middle">{item.value}</Text>
                        <Rect
                            key={'bar' + item.label}
                            x={x(item.label) - (barWidth / 2)}
                            y={y(item.value) * -1}
                            rx={2.5}
                            width={barWidth}
                            height={y(item.value)}
                            fill={colors.bars}
                        />
                    </>
                ))}

                {/* labels */}
                {data.map(item => (
                    <Text
                        key={'label' + item.label}
                        fontSize="8"
                        fill={'black'}
                        x={x(item.label)}
                        y="10"
                        textAnchor="middle">{item.label}</Text>
                ))}
            </G>
        </Svg>)

}
