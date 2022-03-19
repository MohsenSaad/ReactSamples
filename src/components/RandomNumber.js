import React from 'react';
import PropTypes from 'prop-types';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

class RandomNumber extends React.Component {
  static propTypes = {
    number: PropTypes.number.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
  };

  handlePress = () => {
    if (this.props.isDisabled) {
      return;
    }
    this.props.onPress(this.props.id);
  };

  render() {
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <Text
          style={[
            styles.random,
            this.props.isDisabled && styles.disabledStyle,
          ]}>
          {this.props.number}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  random: {
    width: 100,
    height: 50,
    backgroundColor: '#ddd',
    marginHorizontal: 15,
    marginVertical: 25,
    fontSize: 40,
    textAlign: 'center',
  },

  disabledStyle: {
    opacity: 0.3,
  },
});

export default RandomNumber;
