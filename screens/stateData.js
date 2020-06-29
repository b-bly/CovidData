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
} from 'react-native';

import { Button, colors } from 'react-native-elements';
import AppNav from '../components/appNav';
import * as customColors from '../style/colors';

import {
  getEnigmaNytimesData,
  getDeathsByState,
  getCasesByState,
  getDeathsByDateForState,
  getCasesByDateForState
} from '../services/nytimesUSStatesService';

export default (props) => {
  const mode = 'dark';
  const theme = 'blue';
  const [enigmaNytimesData, setEnigmaNytimesData] = useState(null);
  const [selectedState, setSelectedState] = useState('Alabama');
  const [deathByState, setDeathByState] = useState(null);
  const [casesByState, setCasesByState] = useState(null);
  const [deathsByMonth, setDeathsByMonth] = useState(null);
  const [casesByMonth, setCasesByMonth] = useState(null);
  const [showPicker, setShowPicker] = useState(false);


  const setData = (data, state) => {
    const deathsData = getDeathsByState(data.map(record => ({ ...record })));
    const casesData = getCasesByState(data.map(record => ({ ...record })));
    const deathsByMonthData = getDeathsByDateForState(data.map(record => ({ ...record })), state);
    const casesByMonthData = getCasesByDateForState(data.map(record => ({ ...record })), state);
    setDeathByState(deathsData);
    setCasesByState(casesData);
    setDeathsByMonth(deathsByMonthData);
    setCasesByMonth(casesByMonthData);
  }

  const onSetSelectedState = (state) => {
    setSelectedState(state);
    setData(enigmaNytimesData, state);
  }

  const onLoad = () => {
    if (!enigmaNytimesData) {
      getEnigmaNytimesData().then(async data => {
        setEnigmaNytimesData(data);
        setData(data, selectedState);
      });
    }
  }

  const togglePicker = () => {
    setShowPicker(!showPicker);
  }

  onLoad();
  return (
    <>
      <StatusBar barStyle={mode === 'dark' ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={{ backgroundColor: modes[mode][theme].backgroundColor }} >
      <AppNav {...props} />
        <ScrollView style={{ ...styles.scrollView, backgroundColor: modes[mode][theme].backgroundColor  }}>
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
            <View style={{ margin: 10 }}>

              <Button
                title="Select State"
                // type="outline"
                raised={true}
                onPress={togglePicker}
                buttonStyle={{ backgroundColor: customColors.blue200 }}
              />
            </View>

            {showPicker &&

              <MyPicker
                selectedData={selectedState}
                onSelect={onSetSelectedState}
                mode={mode}
              />

            }

            <LineGraph data={deathsByMonth}
              title={"Deaths in " + selectedState}
              theme={theme}
              mode={mode}
            />
            <LineGraph data={casesByMonth}
              title={"Cases in " + selectedState}
              theme={theme}
              mode={mode}
            />

          </View >
        </ScrollView >
      </SafeAreaView >
    </>

  );
}


