/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { useState } from 'react';
// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

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
  getEnigmaNytimesData
} from './services/enigmaNytimesDataInUsaService';
import { modes } from './style/Themes';
import { styles } from './style/styles';

// Components
import StateData from './screens/stateData';


const App: () => React$Node = () => {
  const mode = 'dark';
  const theme = 'blue';

  const Drawer = createDrawerNavigator();
  
  return (
    <>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="StateData">
          <Drawer.Screen name="StateData" component={StateData} />
          {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
        </Drawer.Navigator>
      </NavigationContainer>
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

// TODO

// menu - select graph or data source
// price thingy for data summary
// graph height screen height minus the rest - take up the slack
// data squares:  nationally and selected or highest state

// use context instead of screenProps https://reactjs.org/docs/context.html