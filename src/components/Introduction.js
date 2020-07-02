import React from 'react';
import {
  TouchableOpacity, View, Text, StyleSheet
} from 'react-native';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';
import Icon from 'react-native-vector-icons/FontAwesome';
import { inject, observer } from 'mobx-react';

import Disclosure from './Disclosure';
import Information from './Information';
import WakeStore from '../Stores/WakeStore';
import IntroductionStore from '../Stores/IntroductionStore';


@inject('WakeStore')
@inject('IntroductionStore')
@observer
class Introduction extends React.Component {
  componentDidMount() {
    if (WakeStore.acceptDisclosure) {
      IntroductionStore.toggleAgreement();
    }

    setTimeout(() => {
      const s = `In a moment, we will ask you to record the phrase "${WakeStore.state.recordWord}" once.`;
      IntroductionStore.setText(s);
    }, 100);
  }

  checkPage = () => {
    let t;
    let b;
    if (WakeStore.state.tutorialPage === 1) {
      WakeStore.finishIntro();
      t = 'When you press the record button, the app will record for 4 seconds.';
      b = 'Next';
    } else if (WakeStore.state.tutorialPage === 2) {
      WakeStore.finishIntro();
      t = "When it's done recording, the sample will automatically be sent to us.";
      b = 'Got it!';
    } else {
      WakeStore.finishIntro();
    }
    IntroductionStore.setText(t);
    IntroductionStore.setButton(b);
  }

  render() {
    return (
      <View style={styles.container}>
        {!WakeStore.state.acceptDisclosure
          && (
            <PopupDialog
              visible={IntroductionStore.state.agreement}
              dialogTitle={(
                <DialogTitle
                  titleTextStyle={styles.disclosureTitleText}
                  title="Disclosure Agreement"
                />
              )}
              width={0.9}
              height={0.8}
              overlayBackgroundColor="#A31F34"
              onDismiss={() => { WakeStore.acceptDisclosure(); }}
            >
              <Disclosure />
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  bottom: 20,
                  height: 60
                }}
                onPress={() => {
                  IntroductionStore.toggleAgreement();
                }
                }
              >
                <Text style={styles.agreeButton}>I agree</Text>
              </TouchableOpacity>
            </PopupDialog>
          )
        }
        <PopupDialog
          visible={IntroductionStore.state.info}
          onTouchOutside={() => {
            IntroductionStore.toggleInfo();
          }}
          dialogTitle={<DialogTitle title="About" titleTextStyle={{ fontFamily: 'Montserrat' }} />}
          width={0.9}
          height={0.8}
          overlayBackgroundColor="#A31F34"
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
        >
          <Information />
        </PopupDialog>

        <View style={styles.boxContainer}>
          <View style={styles.toolbar}>
            <TouchableOpacity><Text /></TouchableOpacity>
            <TouchableOpacity onPress={() => { IntroductionStore.toggleInfo(); }}>
              <Text>
                <Icon name="info-circle" size={30} color="#FFFFFF" />
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.center, { margin: '5%' }]}>
            <Text style={styles.header}>{IntroductionStore.state.text}</Text>
          </View>
          <TouchableOpacity style={styles.center2} onPress={this.checkPage}>
            <Text style={styles.next}>{IntroductionStore.state.button}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
    alignSelf: 'stretch',
  },
  next: {
    fontFamily: 'Montserrat',
    color: '#FFFFFF',
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    height: '100%',
  },
  toolbar: {
    marginTop: '9%',
    marginRight: '5%',
    marginLeft: '5%',
    height: '10%',
    color: '#FFFFFF',
    fontSize: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  boxContainer: {
    backgroundColor: '#A31F34',
    flex: 1,
  },
  center: {
    justifyContent: 'center', // main axis (x)
    alignItems: 'center', // cross axis (y)
    height: '50%',
  },
  center2: {
    justifyContent: 'center', // main axis (x)
    alignItems: 'center', // cross axis (y)
    alignSelf: 'center',
    position: 'absolute',
    right: '30%',
    top: '70%',
    height: '10%',
    width: '30%'
  },
  menuBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start', // cross axis (y)
    backgroundColor: '#FFFFFF',

  },
  disclosureTitleText: {
    fontFamily: 'Montserrat',
    color: 'black',
    fontSize: 20,
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
  header: {
    fontSize: 25,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    justifyContent: 'center', // main axis (x)
    alignItems: 'center', // cross axis (y)

  },
});

export default Introduction;
