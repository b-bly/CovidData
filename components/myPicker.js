import React, { useState } from 'react';
import {
  Dimensions
} from 'react-native';
import { Picker } from '@react-native-community/picker';
import { padding } from '../util/constants';
import { styles } from '../style/styles';
import { modes } from '../style/Themes';
import { swapKeysAndValues } from '../util/utility';
import stateAbbreviations from '../assets/stateAbbreviations.json';
const abbreviationsSwapped = swapKeysAndValues(stateAbbreviations);
const screenWidth = Dimensions.get("window").width;
const chartWidth = screenWidth - padding * 2;

export default (props) => {

  //TODO: replace stateChoices with states derived from nytimes data;

  const stateChoices = Object.keys(abbreviationsSwapped).map((state, i) => {

 
    return (
      <Picker.Item label={state} value={state} color={modes[props.mode].textColor} style={{color: modes[props.mode].textColor }}  key={i.toString()} />
    );
  });

  return (

    <Picker
      selectedValue={props.selectedData}
      style={{ width: chartWidth, color: modes[props.mode].textColor }}
      onValueChange={(itemValue, itemIndex) =>
        props.onSelect(itemValue)
      }>
      {stateChoices}
    </Picker>
  );
}