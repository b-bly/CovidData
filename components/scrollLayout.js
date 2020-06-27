import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { modes } from '../style/Themes';
import { styles } from '../style/styles';

export default (props) => {
  const { mode, theme, graphs } = props;
  return (
    <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView >
      <ScrollView style={{ ...styles.scrollView, backgroundColor: 'white' }}>
        <View style={styles.sectionContainer}>
          <Text>Hello again</Text>
          {graphs} 
        </View >
      </ScrollView >
    </SafeAreaView >
    </>
  );
}