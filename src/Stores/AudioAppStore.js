import { action, observable } from 'mobx';
import { AudioUtils } from 'react-native-audio';
import { Animated } from 'react-native';

class AudioAppStore {
  @observable state = {
    recording: false,
    stoppedRecording: false,
    finished: false,
    audioPath: `${AudioUtils.DocumentDirectoryPath}/test.aac`,
    hasPermission: undefined,
    hasRecorded: false,
    viz: false,
    recordMode: false,
    animatedA: new Animated.Value(0),
    animatedB: new Animated.Value(0),
    animatedC: new Animated.Value(0),
    opacityA: new Animated.Value(0),
    opacityB: new Animated.Value(0),
    opacityC: new Animated.Value(0),
    counter: false,
    plus: false,
    info: false,
    mounted: false,
  }

  @action setCurrentTime = (time) => {
    this.state.currentTime = Math.floor(time);
  }

  @action toggleRecording = (bool) => {
    this.state.recording = bool;
  }

  @action toggleStoppedRecording = (bool) => {
    this.state.pause = bool;
  }

  @action toggleFinished = (bool) => {
    this.state.pause = bool;
  }

  @action toggleHasPermission = (bool) => {
    this.state.hasPermission = bool;
  }

  @action toggleHasRecorded = (bool = (!this.state.hasRecorded)) => {
    console.log(bool);
    this.state.hasRecorded = bool;
  }

  @action toggleViz = (bool) => {
    this.state.viz = bool;
  }

  @action toggleRecordMode = (bool) => {
    this.state.recordMode = bool;
  }

  @action toggleIsPressed = (bool) => {
    this.state.isPressed = bool;
  }

  @action toggleCounter = (bool) => {
    this.state.counter = bool;
  }

  @action togglePlus = (bool) => {
    this.state.plus = bool;
  }

  @action toggleInfo = (bool) => {
    this.state.info = bool;
  }

  @action toggleMounted = (bool) => {
    this.state.mounted = bool;
  }
}

const audioSet = new AudioAppStore();
export default audioSet;
