import React from 'react';
import {
  Animated,
  LayoutAnimation,
  StyleSheet,
  Text,
  View,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  Easing,
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { inject, observer } from 'mobx-react';
import Sound from 'react-native-sound';
import { AudioRecorder } from 'react-native-audio';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ajax from '../Ajax';
import Information from './Information';
import LanguageStore from '../Stores/LanguageStore';
import WakeStore from '../Stores/WakeStore';
import AudioAppStore from '../Stores/AudioAppStore';

// Documentation and a sample app using the react-native-audio
// library can be found here:
// https://github.com/jsierles/react-native-audio/blob/master/AudioExample/AudioExample.js

@inject('WakeStore')
@inject('AudioAppStore')
@observer
class AudioPage extends React.Component {
  static erase() {
    // This function is used to erase a recording
    WakeStore.decreaseCount();
    AudioAppStore.toggleHasRecorded(false);
    AudioAppStore.togglePlus(false);
  }

  static prepareRecordingPath(audioPath) {
    // sets up recording parameters
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
      AudioEncodingBitRate: 32000
    });
  }

  static async _checkPermission() {
    // checks Android permissions
    if (Platform.OS !== 'android') {
      return Promise.resolve(true);
    }

    const rationale = {
      title: 'Microphone Permission',
      message: 'AudioExample needs access to your microphone so you can record audio.'
    };


    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
      .then((result) => {
        console.log('Permission result:', result);
        return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
      });
  }


  // Stop recording
  static async _stop() {
    if (!AudioAppStore.state.recording) {
      console.warn('Can\'t stop, not recording!');
      return;
    }
    AudioAppStore.toggleRecording(false);
    AudioAppStore.toggleStoppedRecording(true);

    try {
      const filePath = await AudioRecorder.stopRecording();
      console.log(filePath);
      if (Platform.OS === 'android') {
        AudioPage._finishRecording(true);
      }
      return;
    } catch (error) {
      console.error(error);
    }
  }

  // play will playback the audio that was recorded
  static async _play() {
    if (AudioAppStore.state.recording) {
      await AudioPage._stop();
    }

    // These timeouts are a hacky workaround for some issues with react-native-sound.
    // See https://github.com/zmxv/react-native-sound/issues/89.
    setTimeout(() => {
      const sound = new Sound(AudioAppStore.state.audioPath, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error);
        }
      });

      setTimeout(() => {
        sound.play((success) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      }, 100);
    }, 100);
  }

  // Audio recording
  static async _record() {
    if (AudioAppStore.state.recording) {
      console.warn('Already recording!');
      return;
    }

    if (!AudioAppStore.state.hasPermission) {
      console.warn('Can\'t record, no permission granted!');
      return;
    }

    if (AudioAppStore.state.stoppedRecording) {
      AudioPage.prepareRecordingPath(AudioAppStore.state.audioPath);
    }
    AudioAppStore.toggleRecording(true);

    try {
      await AudioRecorder.startRecording();
    } catch (error) {
      console.error(error);
    }
  }

  static _finishRecording(didSucceed) {
    AudioAppStore.toggleFinished(didSucceed);
  }

  static async audioSend() {
    if (!WakeStore.state.debug) {
      await Ajax.audioSend(WakeStore.state.recordLang, WakeStore.state.recordWord,
        AudioAppStore.state.audioPath);
    } else {
      console.warn('Debug mode is on!');
    }
  }


  colorStyles = {
    backgroundColor: WakeStore.state.color,
  };

  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
  }

  // This runs once the screen has finished loading/mounting
  componentDidMount() {
    // Define when the component mounts
    AudioAppStore.toggleMounted(true);

    // Check audio permissions for Android and iOS
    AudioPage._checkPermission().then((hasPermission) => {
      AudioAppStore.toggleHasPermission(hasPermission);


      if (!hasPermission) return;

      AudioPage.prepareRecordingPath(AudioAppStore.state.audioPath);

      AudioRecorder.onFinished = (data) => {
        // Android callback comes in the form of a promise instead.
        if (Platform.OS === 'ios') {
          AudioPage._finishRecording(data.status === 'OK');
        }
      };
    });

    // Initialize the recording button
    setTimeout(this.changeState, 5);

    // Initialize sample counter
    this.showCounter();

    // Check whether the app and recording language are the same
    // This allows the user to be prompted to speak in another language if necessary
  }

  // This runs before leaving the page
  componentWillUnmount() {
    // Define when the component unmounts
    AudioAppStore.toggleMounted(false);

    // Stop animations from happening and stop recording when leaving page
    if (AudioAppStore.state.recordMode) {
      clearTimeout(stage1);
      clearTimeout(stage2);
      AudioPage._stop();
    }
  }

  changeState = () => {
    // This function is used to initialize the recording button
    LayoutAnimation.spring();
    AudioAppStore.toggleViz(true);
  }

    // Initialize counter
    showCounter = () => {
      AudioAppStore.toggleCounter(true);
    }

    // Show play and delete buttons
    showOptions = () => {
      AudioAppStore.toggleHasRecorded();
    }


    // When the record button is pressed, a set of animations are triggered, controlled here
    // The button can be pressed again to stop the recording as well
    _onPress() {
      const {
        animatedA, animatedB, animatedC, opacityA, opacityB, opacityC
      } = AudioAppStore.state;

      if (!AudioAppStore.state.recordMode) {
        AudioAppStore.toggleHasRecorded(false);

        AudioAppStore.toggleRecordMode(true);
        AudioPage._record();
        Animated.loop(
          Animated.sequence([
            Animated.parallel([
              Animated.timing(animatedA, {
                toValue: 1.8,
                duration: 600,

              }),
              Animated.timing(animatedB, {
                toValue: 1.6,
                duration: 800,

              }),
              Animated.timing(animatedC, {
                toValue: 1.3,
                duration: 900,

              }),
              Animated.timing(opacityA, {
                toValue: 0.2,
                duration: 800,

              }),
              Animated.timing(opacityB, {
                toValue: 0.3,
                duration: 800,

              }),
              Animated.timing(opacityC, {
                toValue: 0.4,
                duration: 800,

              })
            ]),
            Animated.parallel([
              Animated.timing(animatedA, {
                toValue: 1,
                duration: 1200,

              }),
              Animated.timing(animatedB, {
                toValue: 1,
                duration: 1200,

              }),
              Animated.timing(animatedC, {
                toValue: 1,
                duration: 1200,

              }),
              Animated.timing(opacityA, {
                toValue: 1,
                duration: 1200,

              }),
              Animated.timing(opacityB, {
                toValue: 1,
                duration: 1200,

              }),
              Animated.timing(opacityC, {
                toValue: 1,
                duration: 1200,

              })
            ])
          ])

        ).start();


        // First half of the circular progress animation
        this.circularProgress.animate(100, WakeStore.state.timeLength * 500, Easing.linear);

        stage1 = setTimeout(() => {
          if (AudioAppStore.state.recordMode && AudioAppStore.state.mounted) {
            // Second half of the circular progress animation
            this.circularProgress.animate(0, WakeStore.state.timeLength * 500, Easing.linear);
          }
        }, WakeStore.state.timeLength * 500);

        stage2 = setTimeout(() => {
          if (AudioAppStore.state.recordMode && AudioAppStore.state.mounted) {
            AudioAppStore.toggleRecordMode(false);
            AudioPage._stop();
            AudioAppStore.togglePlus(true);
            WakeStore.increaseCount();
            AudioPage.audioSend();
            Animated.loop(
              Animated.parallel([
                Animated.timing(animatedA),
                Animated.timing(animatedB),
                Animated.timing(animatedC),
                Animated.timing(opacityA),
                Animated.timing(opacityB),
                Animated.timing(opacityC)
              ])
            ).stop();

            Animated.parallel([
              Animated.timing(animatedA, {
                toValue: 1,
                duration: 600,

              }),
              Animated.timing(animatedB, {
                toValue: 1,
                duration: 600,

              }),
              Animated.timing(animatedC, {
                toValue: 1,
                duration: 600,

              }),
              Animated.timing(opacityA, {
                toValue: 1,
                duration: 600,

              }),
              Animated.timing(opacityB, {
                toValue: 0,
                duration: 600,

              }),
              Animated.timing(opacityC, {
                toValue: 0,
                duration: 600,

              })
            ]).start();
          }
        }, WakeStore.state.timeLength * 1000 + 800);
      } else if (AudioAppStore.state.recordMode && AudioAppStore.state.mounted) {
        // In this case, the button is pressed to stop recording.
        // All animations are cancelled and recording is stopped.

        clearTimeout(stage1);
        clearTimeout(stage2);

        AudioPage._stop();

        setTimeout(() => AudioPage.audioSend(), 100);

        this.circularProgress.animate(0, 10, Easing.linear);

        AudioAppStore.togglePlus(true);

        // Increase Recording Count
        WakeStore.increaseCount();

        Animated.loop(
          Animated.parallel([
            Animated.timing(animatedA),
            Animated.timing(animatedB),
            Animated.timing(animatedC),
            Animated.timing(opacityA),
            Animated.timing(opacityB),
            Animated.timing(opacityC)
          ])
        ).stop();

        Animated.parallel([
          Animated.timing(animatedA, {
            toValue: 1,
            duration: 200,

          }),
          Animated.timing(animatedB, {
            toValue: 1,
            duration: 200,

          }),
          Animated.timing(animatedC, {
            toValue: 1,
            duration: 200,

          }),
          Animated.timing(opacityA, {
            toValue: 1,
            duration: 200,

          }),
          Animated.timing(opacityB, {
            toValue: 0,
            duration: 200,

          }),
          Animated.timing(opacityC, {
            toValue: 0,
            duration: 200,

          })
        ]).start();
        AudioAppStore.toggleRecordMode(false);
      }
    }

    // This is the creation of the microphone button animation.
    _micButton() {
      const {
        animatedA, animatedB, animatedC, opacityA, opacityB, opacityC
      } = AudioAppStore.state;

      return (
        <View style={{
          alignSelf: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
        >

          <View style={styles.circularProgress}>
            <Text style={styles.header1}>
              {LanguageStore[WakeStore.state.appLang].say}
              {' "'}
              {WakeStore.state.recordWord}
              {'"'}
            </Text>
            {(WakeStore.state.recordLang !== WakeStore.state.appLang)
              && (
              <Text style={styles.header3}>
                {LanguageStore[WakeStore.state.appLang].inn}
                {' '}
                {WakeStore.state.recordLang}
              </Text>
              )}
            {AudioAppStore.state.recording
              && (
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
              >
                <Text style={styles.counter}>
                  {LanguageStore[WakeStore.state.appLang].listening}
                </Text>
              </View>
              )
            }
            {!AudioAppStore.state.recording && WakeStore.state.count === 0
              && <Text style={styles.counter}>{LanguageStore[WakeStore.state.appLang].tap}</Text>
            }
            {!AudioAppStore.state.recording && WakeStore.state.count !== 0
              && <Text style={styles.counter}>{LanguageStore[WakeStore.state.appLang].again}</Text>
            }
            <View style={{
              position: 'absolute'
            }}
            >
              <AnimatedCircularProgress
                size={190}
                width={10}
                rotation={0}
                ref={(ref) => { this.circularProgress = ref; }}
                fill={0}
                tintColor="#FFFFFF"
              />
            </View>


            <Animated.View style={{
              opacity: opacityA,
              backgroundColor: '#FFFFFF',
              position: 'absolute',
              borderRadius: 70,
              width: 70,
              height: 70,
              alignItems: 'center',
              justifyContent: 'center',
              transform: [{
                scale: animatedA
              }]
            }}
            >
            </Animated.View>
            <Animated.View style={{
              opacity: opacityB,
              backgroundColor: '#ffffff',
              position: 'absolute',
              borderRadius: 70,
              width: 70,
              height: 70,
              alignItems: 'center',
              justifyContent: 'center',
              transform: [{
                scale: animatedB
              }]
            }}
            >
            </Animated.View>
            <Animated.View style={{
              opacity: opacityC,
              backgroundColor: '#ffffff',
              position: 'absolute',
              borderRadius: 70,
              width: 70,
              height: 70,
              alignItems: 'center',
              justifyContent: 'center',
              transform: [{
                scale: animatedC
              }]
            }}
            >
            </Animated.View>
            <Animated.View style={{
              opacity: 1,
              backgroundColor: '#ffffff',
              position: 'absolute',
              borderRadius: 100,
              width: 70,
              height: 70,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            >
              {<Icon name="microphone" size={30} color={this.colorStyles.backgroundColor} />}
            </Animated.View>


          </View>


        </View>
      );
    }


    render() {
      return (

        <View style={[styles.container, this.colorStyles]}>
          <PopupDialog
            visible={AudioAppStore.state.info}
            onTouchOutside={() => {
              AudioAppStore.toggleInfo(false);
            }}
            dialogTitle={<DialogTitle title="About" titleTextStyle={{ fontFamily: 'Montserrat' }} />}
            width={0.9}
            height={0.8}
            overlayBackgroundColor={WakeStore.state.color}
            ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          >
            <Information />
          </PopupDialog>

          <View style={[styles.toolbar, this.colorStyles, WakeStore.state.portrait]}>
            <TouchableOpacity onPress={() => WakeStore.switchSettings()}>
              <Text>
                <Icon name="cog" size={30} color="#FFFFFF" />
              </Text>
            </TouchableOpacity>
            {AudioAppStore.state.plus
          && (
          <TouchableOpacity style={styles.settings} onPress={() => this.showOptions()}>
            {!AudioAppStore.state.hasRecorded
              && (
              <Text>
                <Icon name="plus" size={30} color="#FFFFFF" />
              </Text>
              )
            }
            {AudioAppStore.state.hasRecorded
              && (
              <Text>
                <Icon name="minus" size={30} color="#FFFFFF" />
              </Text>
              )
            }
          </TouchableOpacity>
          )
        }
            <TouchableOpacity onPress={() => {
              AudioAppStore.toggleInfo(true);
            }}
            >
              <Text>
                <Icon name="info-circle" size={30} color="#FFFFFF" />
              </Text>
            </TouchableOpacity>
          </View>


          {AudioAppStore.state.viz
      && (
      <View style={[styles.graphicBox, this.colorStyles]}>
        <TouchableOpacity onPressIn={this._onPress} style={{ width: '100%' }}>
          {this._micButton()}
        </TouchableOpacity>
        {!AudioAppStore.recording && AudioAppStore.state.hasRecorded
          && (WakeStore.state.count > 0)

          && (
          <TouchableOpacity
            style={[styles.boxContainer2, this.colorStyles]}
            onPress={() => AudioPage._play()}
          >
            <Text>
              <Icon name="play" size={40} color="#FFFFFF" />
            </Text>
          </TouchableOpacity>
          )
        }

        {!AudioAppStore.state.recording && AudioAppStore.state.hasRecorded
          && (
          <TouchableOpacity
            style={[styles.boxContainer3, this.colorStyles]}
            onPress={() => AudioPage.erase()}
          >
            <Text>
              <Icon name="trash-o" size={40} color="#FFFFFF" />
            </Text>
          </TouchableOpacity>
          )
        }
        {(WakeStore.state.count > 0) && AudioAppStore.state.counter
          && (
          <View style={styles.textCounter}>
            <Text style={styles.header2}>{WakeStore.state.count}</Text>
          </View>
          )}
        <TouchableOpacity style={styles.wordButton} onPress={() => WakeStore.reloadWord()}>
          <Icon name="refresh" size={30} color="#FFFFFF" />
        </TouchableOpacity>

      </View>
      ) }
        </View>
      );
    }
}


const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontFamily: 'Montserrat',
    color: '#ffffff',
    marginTop: 10,
    marginLeft: 20,
    opacity: 1,
  },
  settings: {
    position: 'absolute',
    right: 50,
  },
  header1: {
    fontSize: 27,
    fontFamily: 'Montserrat',
    color: '#ffffff',
    opacity: 1,
    position: 'absolute',
    bottom: 150,
  },
  header2: {
    fontSize: 25,
    fontFamily: 'Montserrat-Light',
    color: '#ffffff',
    marginTop: 10,
    marginLeft: '7%',
    opacity: 1,
  },
  header3: {
    fontSize: 27,
    fontFamily: 'Montserrat-LightItalic',
    color: '#ffffff',
    opacity: 1,
    position: 'absolute',
    bottom: 110,
  },
  toolbar: {
    marginTop: '9%',
    marginRight: '5%',
    marginLeft: '5%',
    marginBottom: '0%',
    height: '9%',
    color: '#FFFFFF',
    fontSize: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  circularProgress: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordTextBox: {
    marginLeft: 30,
    justifyContent: 'flex-start', // main axis (x)
    alignItems: 'flex-start', // cross axis (y)
  },
  recordBox: {
    marginBottom: '5%',
    justifyContent: 'flex-start', // main axis (x)
    alignItems: 'flex-start', // cross axis (y)
    flexDirection: 'row',
  },
  playSendBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
    backgroundColor: '#A31F34',
  },
  boxContainer2: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: '45%',
    right: 40,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#A31F34',
    alignItems: 'center',
  },
  boxContainer3: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: '45.5%',
    left: 40,
    flex: 1,
    backgroundColor: '#A31F34',
    justifyContent: 'center',
    alignItems: 'center',

  },
  boxContainer: {
    flex: 1,
    backgroundColor: '#A31F34',
  },
  textCounter: {
    fontSize: 35,
    position: 'absolute',
    top: '75%',
    right: '0%',
  },
  graphicBox: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center', // cross axis (y)
    justifyContent: 'center',
    backgroundColor: '#A31F34',
  },
  scrollview: {
    margin: 20,
    marginTop: 20,
  },
  scrollview1: {
    margin: 20,
    marginTop: 20,
    height: '75%',
  },
  counter: {
    fontFamily: 'Montserrat-Thin',
    color: '#ffffff',
    fontSize: 25,
    position: 'absolute',
    top: 95,
  },
  counter2: {
    fontFamily: 'Montserrat-Thin',
    fontSize: 20,
    height: 50,
    position: 'absolute',
    backgroundColor: '#ffffff'
  },
  disclosureTitleText: {
    fontFamily: 'Montserrat',
    color: 'black',
    fontSize: 20,
  },
  disclosure: {
    fontFamily: 'Montserrat',
    marginLeft: 20,
    marginRight: 20,
    color: '#52607a',

  },
  disclosureBold: {
    fontFamily: 'Montserrat',
    marginLeft: 20,
    marginRight: 20,
    fontWeight: 'bold',

  },
  agreeButton: {
    height: 30,
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Montserrat',
    fontSize: 20,
    color: '#52607a',

  },
  agreeButton1: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Montserrat',
    fontSize: 20,
    color: '#52607a',

  },
  agreeButton2: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Montserrat',
    fontSize: 20,
    color: '#52607a',

  },
  wordButton: {
    fontSize: 35,
    position: 'absolute',
    top: '77%',
    left: '7%',
  },

});

export default AudioPage;
