import React, { useEffect, useState } from 'react';

import { modes } from '../style/Themes';
import { styles } from '../style/styles';

// Components
import BarGraph from '../components/barGraph';
import LineGraph from '../components/lineGraph';
import MyPicker from '../components/myPicker';

import {
  SafeAreaView,
  ScrollView,
  View,
  StatusBar,
  Text,
} from 'react-native';

import { Button } from 'react-native-elements';

import {
  getEnigmaNytimesData,
  getDeathsByState,
  getCasesByState,
  getDeathsByDateForState,
  getCasesByDateForState
} from '../services/enigmaNytimesDataInUsaService';

export default () => {
  const mode = 'dark';
  const theme = 'blue';

  return (
    <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView >
      <ScrollView style={{ ...styles.scrollView, backgroundColor: modes[mode][theme].backgroundColor }}>
        <Text style={{ color: 'white' }}>US Data</Text>
      </ScrollView>
    </SafeAreaView>
    </>
  )
}