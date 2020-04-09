import React, { } from 'react';
import { View, Text } from 'react-native';

import BarChart from './charts/BarChart'
import LineChart from './charts/LineChart'

const data = [
  { label: 'Jan', value: 500 },
  { label: 'Feb', value: 312 },
  { label: 'Mar', value: 424 },
  { label: 'Apr', value: 745 },
  { label: 'May', value: 89 },
  { label: 'Jun', value: 434 },
  { label: 'Jul', value: 650 },
  { label: 'Aug', value: 980 },
  { label: 'Sep', value: 503 },
  { label: 'Oct', value: 186 },
  { label: 'Nov', value: 689 },
  { label: 'Dec', value: 643 }
]

export default function rncharts() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <BarChart 
      data={data} 
      round={100} 
      unit="€" 
      marginGraph={20} 
      barWidth={5} 
      axisColor={'#E4E4E4'} 
      barColor={'red'} 
      SVGHeight={150} 
      SVGWidth={300}
      />
      <LineChart
      data={data} 
      round={100} 
      unit="€" 
      marginGraph={20} 
      barWidth={5} 
      axisColor={'#E4E4E4'} 
      barColor={'red'} 
      SVGHeight={150} 
      SVGWidth={300}
      />
    </View>
  );
}
