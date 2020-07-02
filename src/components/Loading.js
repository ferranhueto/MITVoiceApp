import React from 'react';
import {
  View,
  Easing,
  Text
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

// Documentation and a sample app using the react-native-audio
// library can be found here:
// https://github.com/jsierles/react-native-audio/blob/master/AudioExample/AudioExample.js

class Loading extends React.Component {
  componentDidMount() {
    this.circularProgress.animate(100, 600, Easing.quad);
  }

  render() {
    return (
      <View style={{
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      >
        <AnimatedCircularProgress
          size={40}
          width={4}
          rotation={0}
          lineCap="round"
          ref={(ref) => { this.circularProgress = ref; }}
          fill={100}
          tintColor="#A31F34"
        />
        <Text style={{
          fontFamily: 'Montserrat',
          color: '#A31F34',
          top: 40,
          fontSize: 20,
          alignSelf: 'center',
        }}
        >
        Loading...
        </Text>
      </View>
    );
  }
}

export default Loading;
