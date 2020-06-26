import React, { useState } from 'react';
import {
  View,
  Text,
  Dimensions
} from 'react-native';

import { Picker } from '@react-native-community/picker';

import {
  LineChart
} from "react-native-chart-kit";

import { padding } from '../util/constants';
import { styles } from '../style/styles';
import { Themes, modes } from '../style/Themes';
import { swapKeysAndValues } from '../util/utility';

import stateAbbreviations from '../assets/stateAbbreviations.json';
const abbreviationsSwapped = swapKeysAndValues(stateAbbreviations);

// {"date":"2020-06-23","county":"Montague","state":"Texas","fips":"48337","cases":"14","deaths":"1"}
// {"date":"2020-06-23","county":"Montgomery","state":"Texas","fips":"48339","cases":"1737","deaths":"34"}

const screenWidth = Dimensions.get("window").width;
const chartWidth = screenWidth - padding * 2;

const graphStyle = {
  marginVertical: 8,
  borderRadius: 16
};

// const setSelectedState = (selectedState) => {
//   props.setSelectedState(selectedState);
// }

export default (props) => {
  const [data, setData] = useState(null);
  const chartConfig = {
    ...Themes[props.theme],
    decimalPlaces: 0, // optional, defaults to 2dp
    barPercentage: .5,
  };

  //TODO: replace stateChoices with states derived from nytimes data;

  const stateChoices = Object.keys(abbreviationsSwapped).map((state, i) => {
    return (
      <Picker.Item label={state} value={state} color={modes[props.mode].textColor} style={{ color: 'snow' }} key={i.toString()}/>
    );
  }
  );

  return (
    <View style={{ display: 'flex', flexDirection: 'column' }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{...styles.sectionTitle, color: modes[props.mode].textColor }}>{props.title}</Text>
        <Picker
          selectedValue={props.selectedState}
          style={{ width: chartWidth, color: modes[props.mode].textColor }}
          onValueChange={(itemValue, itemIndex) =>
            props.onSetSelectedState(itemValue)
          }>
          {/* <Picker.Item label="Alabama" value="Alabama" key="1" />
          <Picker.Item label="Alabama" value="Alabama"  key="2"/> */}

          {stateChoices}


        </Picker>
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {props.data ?
          <View>
            {props.data.labels.length < 1 
              || props.data.datasets[0].data.length < 1 
              || props.data.length !== props.data.datasets[0].length ?
              
              <Text style={{color: modes[props.mode].textColor}}>(No data)</Text>


            :

            <LineChart
            style={graphStyle}
            data={props.data}
            width={chartWidth}
            height={320}
            chartConfig={chartConfig}
            fromZero="true"
          />

            }
          </View>
          :

          <Text style={{color: modes[props.mode].textColor}}>Loading</Text>
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
