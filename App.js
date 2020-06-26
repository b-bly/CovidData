/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  getEnigmaNytimesData,
  getDeathsByState,
  getCasesByState,
  getDeathsByDateForState
} from './services/enigmaNytimesDataInUsaService';

// Components
import BarGraph from './components/barGraph';
import { styles } from './style/styles';
import LineGraph from './components/lineGraph';
import { modes } from './style/Themes';

const App: () => React$Node = () => {
  const [enigmaNytimesData, setEnigmaNytimesData] = useState(null);
  const [deathByState, setDeathByState] = useState(null);
  const [casesByState, setCasesByState] = useState(null);
  const [deathsByMonth, setDeathsByMonth] = useState(null);
  const [selectedState, setSelectedState] = useState('Alabama');
  let [loading, setLoading] = useState(false);

  const mode = 'dark';
  const theme = 'blue';

  if (!enigmaNytimesData) {
    getEnigmaNytimesData().then(data => {
      setEnigmaNytimesData(data);
      // Without using a copy of data, getCasesByState was returning some states as 'undefined'
      // probably a timing issue that could be solved with redux or extending React.Component 

      const dataCopy = data.map(record => ({ ...record }));
      const dataCopy2 = data.map(record => ({ ...record }));
      const deathsData = getDeathsByState(data.map(record => ({ ...record })));
      const casesData = getCasesByState(dataCopy);
      const deathsByMonthData = getDeathsByDateForState(dataCopy2, 'Alabama');
      setDeathByState(deathsData);
      setCasesByState(casesData);
      setDeathsByMonth(deathsByMonthData);
    });
  }

  const onSetSelectedState = (state) => {
    console.log(enigmaNytimesData);

    console.log('selected:')
    console.log(state)
    setSelectedState(state);
    let dataCopy = enigmaNytimesData.map(record => ({ ...record }));
    let deathsByMonthData = getDeathsByDateForState(dataCopy, state);
    console.log(deathsByMonthData);
    if (deathsByMonthData.labels.length < 1) {
      console.log(dataCopy);
      deathsByMonthData = getDeathsByDateForState(dataCopy, state);
    }
    setDeathsByMonth(deathsByMonthData);
  }

  const backgroundColor = mode === 'light' ? Colors.lighter : modes.dark[theme].backgroundColor;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView >
        <ScrollView style={{ ...styles.scrollView, backgroundColor: backgroundColor }}>
          <View style={styles.sectionContainer}>
            {/* <Text style={styles.sectionTitle}>Covid Data</Text> */}
            <BarGraph data={deathByState}
              title="Deaths"
              theme={theme}
              mode={mode} />
            <BarGraph data={casesByState}
              title="Cases"
              theme={theme}
              mode={mode}  />
            <LineGraph data={deathsByMonth}
              title="Deaths by State"
              theme={theme}
              mode={mode} 
              selectedState={selectedState}
              onSetSelectedState={onSetSelectedState} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;


{/* <>
<StatusBar barStyle="dark-content" />
<SafeAreaView>
  <ScrollView
    contentInsetAdjustmentBehavior="automatic"
    style={styles.scrollView}>
    <Header />
    {global.HermesInternal == null ? null : (
      <View style={styles.engine}>
        <Text style={styles.footer}>Engine: Hermes</Text>
      </View>
    )}
    <View style={styles.body}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Step One</Text>
        <Text style={styles.sectionDescription}>
          Edit <Text style={styles.highlight}>App.js</Text> to change this
          screen and then come back to see your edits.
        </Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>See Your Changes</Text>
        <Text style={styles.sectionDescription}>
          <ReloadInstructions />
        </Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Debug</Text>
        <Text style={styles.sectionDescription}>
          <DebugInstructions />
        </Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Learn More</Text>
        <Text style={styles.sectionDescription}>
          Read the docs to discover what to do next:
        </Text>
      </View>
      <LearnMoreLinks />
    </View>
  </ScrollView>
</SafeAreaView>
</> */}


// has recent info

// world cases deaths testing
// https://dj2taa9i652rf.cloudfront.net/