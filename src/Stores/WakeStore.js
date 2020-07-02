import { action, observable } from 'mobx';
import { AsyncStorage } from 'react-native';

class WakeStore {
  @observable state = {
    recordLang: 'English',
    recordWord: '',
    acceptDisclosure: false,
    settings: false,
    timeLength: 4,
    appLang: 'English',
    count: 0, //
    tutorial: true,
    tutorialPage: 1,
    color: '#A31F34',
    recordApp: false, //
    recorded: 0, //
    reloadNum: 3,
    chosenWords: observable.array([]),
    default: true, //
    defaultWords: ['Sigma', 'Sigmond', 'MIT'], //
    defaultColors: ['#A31F34', '#A31F34', '#A31F34'], //
    defaultProbs: ['0.4', '0.4', '0.2'], //
    portrait: { marginTop: '9%' },
    portraitSettings: { marginTop: '10%' },
    debug: true,
    menuPage: false,
  }

  @observable chosenWords = observable.array([])

  @action switchSettings = () => {
    this.state.settings = !this.state.settings;
  }

  @action increaseCount = () => {
    const s = this.state.count + 1;
    const a = this.state.recorded + 1;
    this.state.count = s;
    this.state.recorded = a;
    WakeStore._storeCount(s);
    if ((a % this.state.reloadNum) === 0) {
      this.reloadWord();
    }
  }

  @action decreaseCount = () => {
    this.state.count = this.state.count - 1;
    this._storeCount(this.state.count);
  }

  @action reloadWord = () => {
    this.state.recordApp = false;
    this.state.recorded = 0;
    WakeStore._recommendedWord();
    setTimeout(() => {
      this.state.recordApp = true;
      if (this.state.default) {
        this.wordChoice(this.state.defaultWords, this.state.defaultColors, this.state.defaultProbs);
      }
    }, 800);
  }

  @action setCount = (s) => {
    this.state.count = s;
  }

  @action setReloadNum = (num) => {
    this.state.reloadNum = num;
  }

  @action setLanguage = (lang) => {
    this.state.recordLang = lang;
    WakeStore._storeLang(lang);
  }

  @action setAppLanguage = (lang) => {
    this.state.appLang = lang;
    this.state.recordLang = lang;
    WakeStore._storeAppLang(lang);
  }

  @action setRecordWord = (word) => {
    this.state.recordWord = word;
  }

  @action setDefault = (bool) => {
    this.state.default = bool;
  }

  @action setTime = (time) => {
    this.state.timeLength = time;
    WakeStore._storeTime(time);
  }

  @action acceptDisclosure = () => {
    this.state.acceptDisclosure = true;
    WakeStore._storeDisc();
  }

  @action finishTutorial = () => {
    this.state.tutorial = false;
  }

  @action setPortrait = (portrait, portraitSettings) => {
    this.state.portrait = { marginTop: portrait };
    this.state.portraitSettings = { marginTop: portraitSettings };
  }

  @action wordChoice = (words, colors, probs) => {
    let answer = 0;
    let totalProb = 0;
    let w = [];
    let c = [];
    let p = [];
    const chosenWords = Array.from(this.state.chosenWords);
    let t;
    let i;
    let m;
    let indexLast;

    // Eliminate all words that were previously selected, or with 0 probability
    Loop1:
    for (i = 0; i < words.length; i += 1) {
      t = parseFloat(probs[i]);

      if (words[i] === this.state.recordWord) {
        indexLast = i;
      }

      for (m in chosenWords) {
        if (words[i] == chosenWords[m]) {
          continue Loop1;
        }
      }

      totalProb += t;
      w.push(words[i]);
      c.push(colors[i]);
      p.push(probs[i]);
    }

    // Reset Previous Words list when all words have been loaded
    if (totalProb === 0) {
      const lastProb = probs[indexLast];
      w = words;
      c = colors;
      p = probs;
      w.splice(indexLast, 1);
      c.splice(indexLast, 1);
      p.splice(indexLast, 1);

      totalProb = 1 - lastProb;
      this.state.chosenWords = [];
    }

    // Make a random choice over the available choices
    let prob = 0;
    const choice = Math.random() * totalProb;

    for (i in w) {
      prob += parseFloat(p[i]);
      if (choice <= prob) {
        answer = i;
        break;
      }
    }

    const array = chosenWords;
    array.push(w[answer]);
    this.state.recordWord = w[answer];
    this.state.color = c[answer];
    this.state.chosenWords = array;
  }

  @action finishIntro = () => {
    this.state.tutorialPage = this.state.tutorialPage + 1;
    if (this.state.tutorialPage > 3) {
      this.state.tutorial = false;
      WakeStore._storeTut();
    }
  }

  @action
  async _recommendedWord() {
    try {
      const response = await fetch(
        'https://wake.mit.edu/getWord'
      );
      const responseJSON = await response.json();
      this.setDefault(false);
      this.wordChoice(responseJSON.words, responseJSON.colors, responseJSON.prob);
    } catch (error) {
      console.log(error);
    }
  }

  @action static async _storeDisc() {
    try {
      await AsyncStorage.setItem('Disclosure', 'Done');
    } catch (error) {
      console.log(error);
    }
  }

  @action static async _storeLang(Language) {
    try {
      await AsyncStorage.setItem('Language', Language);
    } catch (error) {
      console.log(error);
    }
  }

  @action static async _storeAppLang(bool) {
    try {
      await AsyncStorage.setItem('AppLang', bool);
    } catch (error) {
      console.log(error);
    }
  }

  @action static async _storeTut() {
    try {
      await AsyncStorage.setItem('Tutorial', 'Done');
    } catch (error) {
      console.log(error);
    }
  }

  @action static async _storeTime(time) {
    try {
      await AsyncStorage.setItem('Time', time.toString());
    } catch (error) {
      console.log(error);
    }
  }

  @action static async _storeCount(count) {
    try {
      await AsyncStorage.setItem('Count', count.toString());
    } catch (error) {
      console.log(error);
    }
  }
}

const wake = new WakeStore();
export default wake;
