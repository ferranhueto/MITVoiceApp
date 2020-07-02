import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

// Documentation and a sample app using the react-native-audio
// library can be found here:
// https://github.com/jsierles/react-native-audio/blob/master/AudioExample/AudioExample.js

class MenuPage extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <View style={{
        position: 'absolute',
        width: '100%',
        height:'100%',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      >
        <View style={{
          flex:1,
          width:'100%',
          flexDirection:'column',
          backgroundColor:'#A31F34'
        }}>
          <TouchableOpacity style={styles.button}
            onPress={()=>console.warn('Contribute')}
          >
            <Text style={[styles.text, styles.white]}>Contribute</Text>
          </TouchableOpacity>
        </View>
        <View style={{
          flex:1,
          width:'100%',
          flexDirection:'column',
          backgroundColor:'#FFFFFF'
        }}>
          <TouchableOpacity style={styles.button}
            onPress={()=>console.warn('Talk')}
          >
            <Text style={[styles.text, styles.red]}>Talk</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Montserrat',
    position:'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    top:'60%',
    fontSize: 25,
  },
  button: {
    width:'70%',
    height:'50%',
    top:'25%',
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  red: {
    color: '#A31F34'
  },
  white: {
    color: '#FFFFFF'
  }
});

export default MenuPage;
