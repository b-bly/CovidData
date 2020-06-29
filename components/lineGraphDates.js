import React, { useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { Picker } from '@react-native-community/picker';
import {
  LineChart
} from "react-native-chart-kit";
import { Slider } from 'react-native-elements';
import _ from 'lodash';
import { padding } from '../util/constants';
import { styles } from '../style/styles';
import { Themes, modes } from '../style/Themes';
import { swapKeysAndValues } from '../util/utility';
import stateAbbreviations from '../assets/stateAbbreviations.json';
import { monthNames } from '../util/constants';
import * as customColors from '../style/colors';

const abbreviationsSwapped = swapKeysAndValues(stateAbbreviations);

// {"date":"2020-06-23","county":"Montague","state":"Texas","fips":"48337","cases":"14","deaths":"1"}
// {"date":"2020-06-23","county":"Montgomery","state":"Texas","fips":"48339","cases":"1737","deaths":"34"}

const screenWidth = Dimensions.get("window").width;
const chartWidth = screenWidth - padding * 2;
const graphStyle = {
  marginVertical: 8,
  borderRadius: 16
};
const yLengthDefault = 60;
const dataPoints = 10;

export default (props) => {
  const [data, setData] = useState(null);
  const [yLength, setYLength] = useState(yLengthDefault);

  const chartConfig = {
    ...Themes[props.theme],
    decimalPlaces: 0, // optional, defaults to 2dp
    barPercentage: .5,
  };

  const onSetYLength = (value) => {
    const rounded = Math.floor(value);
    if (data && rounded !== yLength) {
      setYLength(rounded);
      sliceData(rounded);
    }
  }

  const getMaximumValue = () => {
    if (props.data) {
      return Object.keys(_.groupBy(props.data.labels, (date) => date.substring(0, 7))).length;
    }
    return 10;
  }

  // get data sample
  // newYLength = number of months
  const sliceData = (newYLength) => {
    const numberOfDays = newYLength * 30 > props.data.labels.length ? props.data.labels.length : newYLength * 30;
    const interval = Math.round(numberOfDays / dataPoints); // grab data every interval index
    const datasetsCopy = [...props.data.datasets].map(dataset => {
      dataset = { ...dataset };
      dataset.data = [...dataset.data];
      return dataset;
    });
    const startIndex = props.data.labels.length - numberOfDays;
    const endIndex = props.data.labels.length;
    const slicedLabels = props.data.labels.slice(startIndex, endIndex);
    firstMonth = parseInt(slicedLabels[0].substring(5, 7)) - 1;
    const secondMonth = parseInt(slicedLabels[Math.floor(slicedLabels.length / 2) - 1].substring(5, 7)) - 1;
    let labels = [monthNames[firstMonth],
    monthNames[secondMonth]];
    const datasets = [...datasetsCopy]
      .map(dataset => {
        const newDataset = {}
        newDataset.data = [...dataset.data].slice(startIndex, endIndex)
          .filter((x, i) => ((i + 1 + dataset.data.length % interval) % interval === 0));
        return newDataset;

      });

    const formattedData = {
      labels: labels, //[...props.data.labels].slice(props.data.labels.length - newYLength, props.data.labels.length),
      datasets: datasets
    }
    setData(formattedData);
  }

  if (props.data && props.data.labels && props.data.labels.length > 0 && !data) {
    sliceData(yLengthDefault);
  }

  return (
    <View style={{ display: 'flex', flexDirection: 'column' }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ ...styles.sectionTitle, color: modes[props.mode].textColor }}>{props.title}</Text>
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {props.data ?
          <View>
            {props.data.labels.length < 1
              || props.data.datasets[0].data.length < 1
              || props.data.length !== props.data.datasets[0].length ?
              <View style={{ height: 220 }}>
                <Text style={{ color: modes[props.mode].textColor }}>(No data)</Text>
              </View>


              :

              <View>
                <LineChart
                  style={graphStyle}
                  data={data}
                  width={chartWidth}
                  height={220}
                  chartConfig={chartConfig}
                  fromZero="true"
                  // hidePointsAtIndex={props.hidePointsAtIndex}
                  withInnerLines={false}
                />

                {props.slider &&

                  <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
                    <Slider
                      value={yLength}
                      onValueChange={(value) => onSetYLength(value)}
                      minimumValue={1}
                      maximumValue={getMaximumValue()}
                      thumbTintColor={customColors.blue300}
                    />
                  </View>
                }

              </View>

            }
          </View>
          :
          <View style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', height: 320 }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        }
      </View>
    </View>
  );
}

// Line graph data structure

//  {
//   labels: []],
//   datasets: [
//     {
//       data: [],
//       // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
//       // strokeWidth: 2 // optional
//     }
//   ],
//   // legend: ["Rainy Days", "Sunny Days", "Snowy Days"] // optional
// };


// add dates for less than 10 ?
// starts at slider ?
// ends at slider 
