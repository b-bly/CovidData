import React, { useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  ActivityIndicator
} from 'react-native';

import {
  BarChart,
} from "react-native-chart-kit";

import { padding } from '../util/constants';
import { styles } from '../style/styles';
import { Themes, modes } from '../style/Themes';

// {"date":"2020-06-23","county":"Montague","state":"Texas","fips":"48337","cases":"14","deaths":"1"}
// {"date":"2020-06-23","county":"Montgomery","state":"Texas","fips":"48339","cases":"1737","deaths":"34"}


const screenWidth = Dimensions.get("window").width;
const chartWidth = screenWidth - padding * 2;

const graphStyle = {
  marginVertical: 8,
  borderRadius: 16
};

export default (props) => {
  const loading = <Text>Loading</Text>
  const chartConfig = {
    ...Themes[props.theme],
    decimalPlaces: 0, // optional, defaults to 2dp
    barPercentage: .5,
  };

  if (props.data) {
    console.log(props.data)
  }

  return (
    <View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ ...styles.sectionTitle, color: modes[props.mode].textColor }}>{props.title}</Text>
      </View>
      <View>

        {props.data ?

          <BarChart
            style={graphStyle}
            data={props.data}
            width={chartWidth}
            height={220}
            // yAxisLabel="deaths"
            chartConfig={chartConfig}
            // verticalLabelRotation={20}
            fromZero="true"
            withVerticalLabels="true"
          />


          :
          <View style={{  display: 'flex', alignContent: 'center', justifyContent: 'center', height: 220 }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>}
      </View>
    </View>
  );
}