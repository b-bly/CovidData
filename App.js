/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Components
import StateData from './screens/stateData';
import USData from './screens/USData'
const Drawer = createDrawerNavigator();

class App extends React.Component {  //const App: () => React$Node = () => {
  mode = 'dark';
  theme = 'blue';

  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="USData">
          <Drawer.Screen name="StateData" component={StateData} />
          <Drawer.Screen name="USData" component={USData} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
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

// use context ? or redux instead of screenProps https://reactjs.org/docs/context.html