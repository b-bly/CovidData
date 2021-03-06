import {
  StyleSheet
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { padding } from '../util/constants';
import * as customColors from './colors';

export const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter, //Colors.lighter,
    height: '100%'
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 16,
    marginBottom: 16,
    paddingHorizontal: padding,
  },
  sectionRow: {
    marginTop: 6,
    marginBottom: 6,
    paddingHorizontal: padding,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  }, 
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.lighter,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.lighter,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  }
});