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

import { getEnigmaNytimesData } from './services/enigmaNytimesDataInUsaService';

// Components
import BarGraph from './components/barGraph';
import { styles } from './styles'

const App: () => React$Node = () => {
  const [enigmaNytimesData, setEnigmaNytimesData] = useState(null);
  let [loading, setLoading] = useState(false);

  if (!enigmaNytimesData) {
    getEnigmaNytimesData().then(data => {
      console.log(data);
      setEnigmaNytimesData(data);
    });
  }

return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView >
        <ScrollView style={styles.scrollView}>
          <View style={styles.sectionContainer}>
            {/* <Text style={styles.sectionTitle}>Covid Data</Text> */}
            <BarGraph data={enigmaNytimesData} title="Deaths" />
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