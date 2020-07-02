import { action, observable } from 'mobx';

class IntroductionStore {
  @observable state = {
    text: '',
    button: 'Next',
    agreement: true,
    info: false,
  }

  @action toggleInfo = () => {
    this.state.info = !this.state.info;
  }

  @action setButton = (button) => {
    this.state.button = button;
  }

  @action setText = (text) => {
    this.state.text = text;
  }

  @action toggleAgreement = () => {
    this.state.agreement = !this.state.agreement;
  }
}

const introductionSet = new IntroductionStore();
export default introductionSet;
