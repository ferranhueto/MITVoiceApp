import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';

// Documentation for the included library can be found here:
// https://github.com/joltup/rn-fetch-blob

export default {
  async audioSend(lang, word, filepath) {
    let apiHost = 'https://wake.mit.edu/uploadAudioAndroid/';
    let newUrl;
    const newWord = word.replace(/ /g, '_');
    if (Platform.OS === 'ios') {
      apiHost = 'https://wake.mit.edu/uploadAudio/';
    } else {
      apiHost = 'https://wake.mit.edu/uploadAudioAndroid/';
    }
    // Replace spaces with underscore, so the http request can process it
    newUrl = `${apiHost + lang}/${newWord}`;
    newUrl = encodeURI(newUrl);
    RNFetchBlob.fetch('POST', newUrl, { 'Content-Type': 'application/octet-stream' }, RNFetchBlob.wrap(filepath)).then(() => {
    }).catch((err) => {
      console.log(err);
    });
  }
};
