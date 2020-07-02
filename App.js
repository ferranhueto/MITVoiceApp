/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Provider } from 'mobx-react';
import WakeStore from './src/Stores/WakeStore';
import SettingsStore from './src/Stores/SettingsStore';
import IntroductionStore from './src/Stores/IntroductionStore';
import AudioAppStore from './src/Stores/AudioAppStore';
import MainApp from './src/components/MainApp';

class App extends React.Component {
  render() {
    return (
      <Provider
        WakeStore={WakeStore}
        SettingsStore={SettingsStore}
        IntroductionStore={IntroductionStore}
        AudioAppStore={AudioAppStore}
      >
        <MainApp />
      </Provider>

    );
  }
}

export default App;
