import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

// This is the scroll select option used in both the language select and word select pages

@inject('WakeStore')
@observer
class WordInput extends React.Component {
  static propTypes = {
    selectFunc: PropTypes.func.isRequired,
  }

  render() {
    return (
      <TextInput
        style={styles.select}
        value={this.props.word}
        itemStyle={{ color: 'black' }}
        editable
        maxLength={100}
        placeholder="Tap here"
        onChangeText={(a) => { this.props.selectFunc(a); }}
      />
    );
  }
}

const styles = StyleSheet.create({
  select: {
    height: '100%',
    width: '80%',
    fontFamily: 'Montserrat-Light',
    fontSize: 30, // main axis (x)
    alignItems: 'center', // cross axis (y)
    color: '#A31F34',
  },
});

export default WordInput;
