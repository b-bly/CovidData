import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';

import { modes } from '../style/Themes';
import { styles } from '../style/styles';

// Components
import BarGraph from '../components/barGraph';
import LineGraph from '../components/lineGraph';
import MyPicker from '../components/myPicker';
import ScrollLayout from '../components/scrollLayout'

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  getEnigmaNytimesData,
  getDeathsByState,
  getCasesByState,
  getDeathsByDateForState,
  getCasesByDateForState
} from '../services/enigmaNytimesDataInUsaService';

export default (props) => {
  const mode = 'dark';
  const theme = 'blue'
  const [enigmaNytimesData, setEnigmaNytimesData] = useState(null);
  const [selectedState, setSelectedState] = useState('Alabama');
  const [deathByState, setDeathByState] = useState(null);
  const [casesByState, setCasesByState] = useState(null);
  const [deathsByMonth, setDeathsByMonth] = useState(null);
  const [casesByMonth, setCasesByMonth] = useState(null);


  const setData = (data) => {
    const dataCopy = data.map(record => ({ ...record }));
    const dataCopy2 = data.map(record => ({ ...record }));
    const dataCopy3 = data.map(record => ({ ...record }));
    const dataCopy4 = data.map(record => ({ ...record }));
    const deathsData = getDeathsByState(dataCopy);
    const casesData = getCasesByState(dataCopy2);
    const deathsByMonthData = getDeathsByDateForState(dataCopy3, selectedState);
    const casesByMonthData = getCasesByDateForState(dataCopy4, selectedState);
    setDeathByState(deathsData);
    setCasesByState(casesData);
    setDeathsByMonth(deathsByMonthData);
    setCasesByMonth(casesByMonthData);
  }

  const onSetSelectedState = (state) => {
    setSelectedState(state);
    setData(enigmaNytimesData);
  }

  const onLoad = () => {
    if (!enigmaNytimesData) {
      getEnigmaNytimesData().then(async data => {
        setEnigmaNytimesData(data);
        setData(data);    
      });
    }
  }

  onLoad();
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView >
        <ScrollView style={{ ...styles.scrollView, backgroundColor: modes[mode][theme].backgroundColor }}>
          <View style={styles.sectionContainer}>

            <BarGraph data={deathByState}
              title="Deaths"
              theme={theme}
              mode={mode}
              {...props} />
            <BarGraph data={casesByState}
              title="Cases"
              theme={theme}
              mode={mode} />
            <MyPicker
              selectedData={selectedState}
              onSelect={onSetSelectedState}
              mode={mode}
            />
            <LineGraph data={deathsByMonth}
              title={"Deaths in " + selectedState}
              theme={theme}
              mode={mode}
              selectedState={selectedState}
            />
            <LineGraph data={casesByMonth}
              title={"Cases in " + selectedState}
              theme={theme}
              mode={mode}
              selectedState={selectedState}
            />

          </View >
        </ScrollView >
      </SafeAreaView >
    </>

  );
}


