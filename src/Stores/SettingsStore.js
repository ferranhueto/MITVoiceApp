import { action, observable } from 'mobx';

class SettingsStore {
  @observable state = {
    viz: false,
    wordSettings: false,
    appSettings: false,
    List: ['English', 'Español', 'Català'],
    info: false,
  }

  @action changeState = () => {
    this.state.viz = true;
  }

  @action toggleInfo = () => {
    this.state.info = !this.state.info;
  }

  @action toggleWordSettings = () => {
    this.state.wordSettings = !this.state.wordSettings;
  }

  @action toggleAppSettings = () => {
    this.state.appSettings = !this.state.appSettings;
  }
}

const settingsSet = new SettingsStore();
export default settingsSet;
