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
import { Slider } from 'react-native-elements';


// {"date":"2020-06-23","county":"Montague","state":"Texas","fips":"48337","cases":"14","deaths":"1"}
// {"date":"2020-06-23","county":"Montgomery","state":"Texas","fips":"48339","cases":"1737","deaths":"34"}

// TODO move to file

const screenWidth = Dimensions.get("window").width;
const chartWidth = screenWidth - padding * 2;

// TODO: export from graphs style file

const graphStyle = {
  marginVertical: 8,
  borderRadius: 16
};
const yLengthDefault = 5;

export default (props) => {
  const [yLength, setYLength] = useState(yLengthDefault);
  const [data, setData] = useState(null);
  const chartConfig = {
    ...Themes[props.theme],
    decimalPlaces: 0, // optional, defaults to 2dp
    barPercentage: .5,
  };

  const onSetYLength = (value) => {
    const rounded = Math.floor(value);
    if (rounded !== yLength) {
      setYLength(rounded);
      sliceData(rounded);
    }
  }

  const getMaximumValue = () => {
    return props.data.labels.length > 10 ? 10 : props.data.labels.length;
  }

  const sliceData = (newYLength) => {
    const datasetsCopy = [...props.data.datasets].map(dataset => {
      dataset = { ...dataset };
      dataset.data = [...dataset.data];
      return dataset;
    });

    const formattedData = {
      labels: [...props.data.labels].slice(0, newYLength),
      datasets: [...datasetsCopy]
        .map(dataset => {
          const newDataset = {}
          newDataset.data = [...dataset.data].slice(0, newYLength);
          return newDataset;
        })
    }

    setData(formattedData);
  }

  if (props.data && props.data.datasets.length > 0 && !data) {
    sliceData(yLengthDefault);
  }

  return (
    <View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ ...styles.sectionTitle, color: modes[props.mode].textColor }}>{props.title}</Text>
      </View>

      {props.data ?
        <View>

          <BarChart
            style={graphStyle}
            data={data}
            width={chartWidth}
            height={220}
            // yAxisLabel="deaths"
            chartConfig={chartConfig}
            // verticalLabelRotation={20}
            fromZero="true"
            withVerticalLabels="true"
          />

          <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
            <Slider
              value={yLength}
              onValueChange={(value) => onSetYLength(value)}
              minimumValue={1}
              maximumValue={getMaximumValue()}
            />

          </View>
        </View>

        :
        <View style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', height: 220 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>}
    </View>
  );
}

// data structure 

// const data = {
//   labels: ["January", "February", "March", "April", "May", "June"],
//   datasets: [
//     {
//       data: [20, 45, 28, 80, 99, 43]
//     }
//   ]
// };