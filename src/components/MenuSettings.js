import React from 'react';
import { View, StyleSheet, Picker } from 'react-native';
import PropTypes from 'prop-types';

// This is the scroll select option used in both the language select and word select pages

class Menu extends React.Component {
	static propTypes = {
	  selectFunc: PropTypes.func.isRequired,
	}

	render() {
	  return (
  <View style={styles.back}>
    <Picker
      style={styles.select}
      itemStyle={{
        fontSize: 30, fontFamily: 'Montserrat', color: '#A31F34', height: 100
      }}
      selectedValue={this.props.lang}
      onValueChange={(itemValue) => {
        this.props.selectFunc(itemValue);
      }}
    >
      {
				this.props.givenL.map(item => (
  <Picker.Item
    label={item}
    value={item}
  />
				))
			}
    </Picker>
  </View>
	  );
	}
}

const styles = StyleSheet.create({
  select: {
    top: '-20%',
    height: 100,
    width: 200,
    color: '#A31F34',
  },
  back: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default Menu;
