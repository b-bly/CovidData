import React, { useEffect, useState } from 'react';

import { modes } from '../style/Themes';
import { styles } from '../style/styles';
import {
  SafeAreaView,
  ScrollView,
  View,
  StatusBar,
} from 'react-native';
import { Button } from 'react-native-elements';
import {
  getDeathsInUSByTime,
  getEnigmaNytimesUSData,
  getCasesInUSByTime,
} from '../services/nyTimesUSAService';

// Components
import LineGraphDates from '../components/lineGraphDates';
import AppNav from '../components/appNav';

export default (props) => {
  const mode = 'dark';
  const theme = 'blue';
  const [enigmaNytimesData, setEnigmaNytimesData] = useState(null);
  const [deaths, setDeaths] = useState(null);
  const [cases, setCases] = useState(null);


  const setData = (data) => {
    let deathsData = getDeathsInUSByTime(data.map(record => ({ ...record })));
    setDeaths(deathsData);
    let casesData = getCasesInUSByTime(data.map(record => ({ ...record })));
    setCases(casesData);
  }

  const onLoad = () => {
    if (!enigmaNytimesData) {
      getEnigmaNytimesUSData().then(async data => {
        setEnigmaNytimesData(data);
        setData(data);
      });
    }
  }

  onLoad();

  return (
    <View>
      <StatusBar barStyle={mode === 'dark' ? 'light-content' : 'dark-content'} />

      <SafeAreaView style={{ backgroundColor: modes[mode][theme].backgroundColor }} >
        <AppNav { ...props } />
        <ScrollView style={{ ...styles.scrollView, backgroundColor: modes[mode][theme].backgroundColor }}>
          <View style={styles.sectionContainer}>

            <LineGraphDates data={deaths}
              title={"Deaths in US"}
              theme={theme}
              mode={mode}
              slider={true}
            />
            <LineGraphDates data={cases}
              title={"Cases in US"}
              theme={theme}
              mode={mode}
              slider={true}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}