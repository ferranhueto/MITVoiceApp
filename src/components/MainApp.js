import React from 'react';
import {
  View, StyleSheet, AsyncStorage, Dimensions
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { inject, observer } from 'mobx-react';

import Settings from './Settings';
import AudioPage from './AudioPage';
import Introduction from './Introduction';
import Loading from './Loading';
import MenuPage from './MenuPage';

import WakeStore from '../Stores/WakeStore';

@inject('WakeStore')
@observer
class MainApp extends React.Component {
  static async _retrieveAppLang() {
  	  try {
  	    const value = await AsyncStorage.getItem('AppLang');
  	    if (value !== null) {
  	      WakeStore.setAppLanguage(value);
  	    }
  	  } catch (error) {
      console.log(error);
  	  }
  }

  static async _retrieveLang() {
  	  try {
  	    const value = await AsyncStorage.getItem('Language');
  	    if (value !== null) {
  	      WakeStore.setLanguage(value);
  	    }
  	  } catch (error) {
      console.log(error);
  	  }
  }

  static async _retrieveDisc() {
  	  try {
  	    const value = await AsyncStorage.getItem('Disclosure');
  	    if (value !== null) {
  	      WakeStore.acceptDisclosure();
  	    }
  	  } catch (error) {
      console.log(error);
  	  }
  }

  static async _retrieveTut() {
  	  try {
  	    const value = await AsyncStorage.getItem('Tutorial');
  	    if (value !== null) {
  	      WakeStore.finishTutorial();
  	    }
  	  } catch (error) {
      console.log(error);
  	  }
  }

  static async _retrieveTime() {
  	  try {
  	    const value = await AsyncStorage.getItem('Time');
  	    const number = parseInt(value, 10);
  	    if (number != null) {
  	      WakeStore.setTime(number);
  	    }
  	  } catch (error) {
      console.log(error);
  	  }
  }

  static async _retrieveCount() {
  	  try {
  	    const value = await AsyncStorage.getItem('Count');
  	    if (value !== null) {
  	      WakeStore.setCount(parseInt(value, 10));
  	    }
  	  } catch (error) {
      console.log(error);
  	  }
  }

  componentDidMount() {
    this.getOrientation(true);
    Dimensions.addEventListener('change', this.getOrientation);
    this.initializeState();
    setTimeout(() => {
      // WakeStore.state.recordApp = true;
      WakeStore.state.menuPage = true;
      if (WakeStore.default) {
        WakeStore.wordChoice(WakeStore.state.defaultWords,
          WakeStore.state.defaultColors, WakeStore.state.defaultProbs);
      }
    },
		 800);
    SplashScreen.hide();
  }

  componentWillUnmount() {
	  Dimensions.removeEventListener('change', this.getOrientation);
  }

  initializeState = () => {
    // MainApp._retrieveTut();
    WakeStore._recommendedWord();
    MainApp._retrieveCount();
    MainApp._retrieveDisc();
    MainApp._retrieveTime();
    MainApp._retrieveAppLang();
    MainApp._retrieveLang();
  }

  getOrientation = () => {
    const dimensions = Dimensions.get('window');
    if (dimensions.width > dimensions.height) {
      WakeStore.setPortrait('1%', '1%');
    } else {
      WakeStore.setPortrait('9%', '10%');
    }
  }

  // Asynchronous functions to retrieve user settings


  // Render function

  render() {
	  if (WakeStore.state.tutorial && WakeStore.state.render) {
	    return (
  <View>
    <Introduction />
  </View>
	    );
	  }
	  if (WakeStore.state.settings) {
	    return (
  <View style={styles.container}>
    <Settings />
  </View>
	    );
	  }
	  if (WakeStore.state.recordApp) {
	    return (
  <View style={styles.container}>
    <AudioPage />
  </View>
	    );
	  }
    if (WakeStore.state.menuPage) {
	    return (
  <View style={styles.container}>
    <MenuPage />
  </View>
	    );
	  }
	  return (
  <View style={styles.container}>
    <Loading />
  </View>
	  );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 40,
  },
});
export default MainApp;
