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
} from '../services/nyTimesUSAService';

// Components
import LineGraphDates from '../components/lineGraphDates';

export default (props) => {
  const mode = 'dark';
  const theme = 'blue';
  const [enigmaNytimesData, setEnigmaNytimesData] = useState(null);
  const [deaths, setDeaths] = useState(null);
  const [hidePointsAtIndex, setHidePointsAtIndex] = useState([]);


  const setData = (data) => {
    let deathsData = getDeathsInUSByTime(data.map(record => ({ ...record })));
    setDeaths(deathsData);
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
      <StatusBar barStyle="dark-content" />
      <SafeAreaView >
        <ScrollView style={{ ...styles.scrollView, backgroundColor: modes[mode][theme].backgroundColor }}>
          <LineGraphDates data={deaths}
            title={"Deaths in US"}
            theme={theme}
            mode={mode}
            slider={true}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}