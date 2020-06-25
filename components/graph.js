import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Dimensions
} from 'react-native';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

// {"date":"2020-06-23","county":"Montague","state":"Texas","fips":"48337","cases":"14","deaths":"1"}
// {"date":"2020-06-23","county":"Montgomery","state":"Texas","fips":"48339","cases":"1737","deaths":"34"}



const chartConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#fb8c00",
  backgroundGradientTo: "#ffa726",
  decimalPlaces: 0, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  fillShadowGradientOpacity: 1,
  fillShadowGradient: "#ffffff",
  barPercentage: .5,
};
const padding = 10;
const screenWidth = Dimensions.get("window").width;
const chartWidth = screenWidth - padding * 2;

const graphStyle = {
  marginVertical: 8,
  borderRadius: 16,
  padding: padding,
};

export default (props) => {
  const [data, setData] = useState(null);
  if (props.data) {
    console.log('got graph data')
  }

  useEffect(() => {
    if (props.data) {
      setData(props.data);
      console.log(props.data);
    }
  });
  
  const loading = <Text>Loading</Text>

  return (
    <View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
      <View>

        {data ? 

        <BarChart
        style={graphStyle}
        data={data}
        width={chartWidth}
        height={320}
        // yAxisLabel="deaths"
        chartConfig={chartConfig}
        verticalLabelRotation={20}
        fromZero="true"
        withVerticalLabels="true"
      />
        
        : 
          <Text>Loading</Text>
        }
      </View>
    </View>
  );
}