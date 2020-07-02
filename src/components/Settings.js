// React Native imports
import React from 'react';
import { inject, observer } from 'mobx-react';
import {
  TouchableOpacity, View, Text, Slider,
  StyleSheet, ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';

// Internal imports
import Menu from './MenuSettings';
import Information from './Information';
import LanguageStore from '../Stores/LanguageStore';
import WordInput from './WordInput';

// Store imports
import WakeStore from '../Stores/WakeStore';
import SettingsStore from '../Stores/SettingsStore';

@inject('WakeStore')
@inject('SettingsStore')
@observer
class Settings extends React.Component {
  componentDidMount() {
    setTimeout(SettingsStore.changeState, 5);
  }

  render() {
    return (
      <View style={styles.container}>
        <PopupDialog
          visible={SettingsStore.state.info}
          onTouchOutside={() => {
            SettingsStore.toggleInfo();
          }}
          dialogTitle={<DialogTitle title="About" titleTextStyle={{ fontFamily: 'Montserrat' }} />}
          width={0.9}
          height={0.8}
          overlayBackgroundColor="#A31F34"
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
        >
          <Information />
        </PopupDialog>

        <View style={styles.toolbar}>
          <View style={[styles.nav, WakeStore.state.portraitSettings]}>
            <TouchableOpacity onPress={() => WakeStore.switchSettings()}>
              <Text>
                <Icon name="chevron-left" size={30} color="#FFFFFF" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { SettingsStore.toggleInfo(); }}>
              <Text>
                <Icon name="info-circle" size={30} color="#FFFFFF" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView>
          <TouchableOpacity onPress={() => SettingsStore.toggleWordSettings()}>
            <View style={[styles.textInput1, styles.textInput0]}>
              {!SettingsStore.state.wordSettings
                && <Icon style={styles.icon} name="caret-right" size={30} color="#FFFFFF" />
              }
              {SettingsStore.state.wordSettings
                && <Icon style={styles.icon} name="caret-down" size={30} color="#FFFFFF" />
              }
              <Text style={styles.title}>
                {LanguageStore[WakeStore.state.appLang].wordSettings}
              </Text>
            </View>
          </TouchableOpacity>
          {SettingsStore.state.wordSettings
            && (
              <View>
                <View style={[styles.textInput1, styles.textInput]}>
                  <Icon style={styles.icon} name="comment-o" size={30} color="#A31F34" />
                  <View style={styles.word}>
                    <WordInput
                      word={WakeStore.state.recordWord}
                      selectFunc={WakeStore.setRecordWord}
                    />
                  </View>
                </View>
                <View style={[styles.textInput2, styles.textInput]}>
                  <Icon style={styles.icon} name="globe" size={40} color="#A31F34" />
                  <View style={styles.menu}>
                    <Menu
                      givenL={LanguageStore[WakeStore.state.appLang].langList}
                      selectFunc={WakeStore.setLanguage}
                      lang={WakeStore.state.recordLang}
                    />
                  </View>
                </View>
              </View>
            )
          }

          <TouchableOpacity onPress={() => SettingsStore.toggleAppSettings()}>
            <View style={[styles.textInput1, styles.textInput0]}>
              {!SettingsStore.state.appSettings
                && <Icon style={styles.icon} name="caret-right" size={30} color="#FFFFFF" />
              }
              {SettingsStore.state.appSettings
                && <Icon style={styles.icon} name="caret-down" size={30} color="#FFFFFF" />
              }
              <Text style={styles.title}>{LanguageStore[WakeStore.state.appLang].appSettings}</Text>
            </View>
          </TouchableOpacity>
          {SettingsStore.state.appSettings
            && (
              <View>
                <View style={[styles.textInput3, styles.textInput]}>
                  <Icon style={styles.icon} name="clock-o" size={40} color="#A31F34" />
                  <View style={styles.word2}>
                    <Slider
                      maximumValue={7}
                      minimumValue={2}
                      minimumTrackTintColor="#A31F34"
                      thumbTintColor="#A31F34"
                      value={WakeStore.state.timeLength}
                      onValueChange={time => WakeStore.setTime(time)}
                      step={1}
                    />
                    <Text style={styles.header}>
                      {LanguageStore[WakeStore.state.appLang].record}
                      {' '}
                      {WakeStore.state.timeLength}
                      {' '}
                      {LanguageStore[WakeStore.state.appLang].seconds}
                      .
                    </Text>
                  </View>
                </View>
                <View style={[styles.textInput2, styles.textInput]}>
                  <Icon style={styles.icon} name="globe" size={40} color="#A31F34" />
                  <View style={styles.menu}>
                    <Menu
                      givenL={SettingsStore.state.List}
                      selectFunc={WakeStore.setAppLanguage}
                      lang={WakeStore.state.appLang}
                    />
                  </View>
                </View>
                <View style={[styles.textInput3, styles.textInput]}>
                  <Icon style={styles.icon} name="refresh" size={30} color="#A31F34" />
                  <View style={styles.word2}>
                    <Slider
                      maximumValue={20}
                      minimumValue={1}
                      minimumTrackTintColor="#A31F34"
                      thumbTintColor="#A31F34"
                      value={WakeStore.state.reloadNum}
                      onValueChange={num => WakeStore.setReloadNum(num)}
                      step={1}
                    />
                    <Text style={styles.header}>
                      {LanguageStore[WakeStore.state.appLang].reloadAfter}
                      {' '}
                      {WakeStore.state.reloadNum}
                      {' '}
                      {LanguageStore[WakeStore.state.appLang].words}
                      .
                    </Text>
                  </View>
                </View>

              </View>
            )
          }

        </ScrollView>


      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1, // 1:1
    flexDirection: 'column',
    backgroundColor: '#f7f2f2',

  },
  nav: {
    marginTop: '10%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  toolbar: {
    width: '100%',
    paddingRight: '5%',
    paddingLeft: '5%',
    height: '12%',
    color: '#A31F34',
    fontSize: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#A31F34',

  },
  scrollview: {
    margin: 20,
    marginTop: 20,
  },
  header: {
    fontSize: 20,
    height: '100%',
    color: '#A31F34',
    fontFamily: 'Montserrat',
    fontWeight: '300',
    top: 7,
    left: 15,
  },
  title: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight: '300',
    alignSelf: 'center',
    position: 'absolute',
    top: 23,
    justifyContent: 'center'
  },
  title1: {
    fontSize: 20,
    color: '#A31F34',
    fontFamily: 'Montserrat',
    fontWeight: '300',
    alignSelf: 'center',
    position: 'absolute',
    top: '34%',
    justifyContent: 'center'
  },
  icon: {
    position: 'absolute',
    top: 20,
    marginLeft: '5%',
    justifyContent: 'center'
  },
  icon2: {
    position: 'absolute',
    top: 15,
    width: 40,
    height: 40,
    marginLeft: '5%',
    justifyContent: 'center',
    backgroundColor: '#A31F34',
    borderRadius: 70,
  },
  textInput: {
    marginTop: 2,
    width: '98%',
    marginLeft: '1%',
    marginRight: '0%',
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    borderWidth: 1,
  },
  textInput0: {
    marginTop: 2,
    width: '98%',
    marginLeft: '1%',
    marginRight: '0%',
    backgroundColor: '#A31F34',
    borderColor: '#c4c4c4',
    borderWidth: 1,
  },
  textInput1: {
    height: 70,
    marginTop: '5%',
  },
  textInput2: {
    height: 100,
  },
  textInput3: {
    height: 100,
  },
  textInput4: {
    height: 80,
  },
  textInput5: {
    height: 100,
    marginBottom: 5,
  },
  word: {
    marginLeft: 80,
  },
  word2: {
    width: '80%',
    top: '20%',
    marginLeft: '15%',
    textAlign: 'center',

  },
  menu: {
    position: 'absolute',
    top: '0%',
    marginLeft: 85,
    justifyContent: 'center'
  }
});

export default Settings;
