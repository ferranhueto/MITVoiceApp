import React from 'react';
import {
  ScrollView, View, Text, StyleSheet, Image
} from 'react-native';

class Information extends React.Component {
	 componentDidMount() {
	 }

  render() {
    return (
      <ScrollView style={styles.scrollview}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('./img/Auto-ID-Lab-logo-square.png')} style={{ width: 250 }} />
        </View>
        <Text />
        <Text />
        <Text style={{ padding: 10, textAlign: 'center', fontFamily: 'Montserrat' }}>
        This App was designed at the MIT Auto-ID lab to collect voice samples
        for an open source Artificial Intelligence project, focused initially
        on Conversational Commerce. This is the first version of the App and
        comments are most welcomed. Please send them to: conversation@mit.edu.
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollview: {
    margin: 20,
    marginTop: 20,
  },
});

export default Information;
