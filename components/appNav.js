import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StatusBar,
  Text
} from 'react-native';
// import { Icon } from 'react-native-elements'

import { Button } from 'react-native-elements';
import { styles } from '../style/styles';

import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { modes, Themes } from '../style/Themes';
Icon.loadFont();

export default (props) => {
  const mode = 'dark';
  const theme = 'blue';
  const open = () => {
    console.log(props)
    props.navigation.openDrawer();
  }
  return (
    <View style={{ ...styles.sectionRow,  backgroundColor: modes[mode][theme].backgroundColor }}>
      <View>
        <Icon
          raised
          name='bars'
          type='font-awesome'
          size={20}
          color={ modes[mode].textColor }
          onPress={() => open()} 
          />
      </View>
      <View>
      </View>
    </View>
  );
}