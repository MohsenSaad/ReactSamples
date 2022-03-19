import React from 'react';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber.js';
import {View, Text, Button, StyleSheet} from 'react-native';

class Game extends React.Component {
  static proptypes = {
    randomNumerCount: PropTypes.number.isRequired,
    initialSeconds: PropTypes.number.isRequired,
    onPlayAgain: PropTypes.func.isRequired,
  };

  state = {
    selectedIds: [],
    remainingSeconds: this.props.initialSeconds,
  };

  gameStatus = 'PLAYING';

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState(
        prevState => {
          return {remainingSeconds: prevState.remainingSeconds - 1};
        },
        () => {
          if (this.state.remainingSeconds === 0) {
            clearInterval(this.intervalId);
          }
        },
      );
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  isNumberSelected = numberIndex => {
    return this.state.selectedIds.indexOf(numberIndex) >= 0;
  };

  selectNumber = numberIndex => {
    this.setState(prevState => {
      return {selectedIds: [...prevState.selectedIds, numberIndex]};
    });
  };

  randomNumbers = Array.from({length: this.props.randomNumerCount}).map(
    () => 1 + Math.floor(40 * Math.random()),
  );

  target = this.randomNumbers
    .slice(0, this.props.randomNumerCount - 2)
    .reduce((acc, cur) => acc + cur, 0);

  componentWillUpdate(nextProps, nextState) {
    if (
      nextState.selectedIds !== this.state.selectedIds ||
      nextState.remainingSeconds === 0
    ) {
      this.gameStatus = this.calcGameStatus(nextState);
      if (this.gameStatus !== 'PLAYING') {
        clearInterval(this.intervalId);
      }
    }
  }

  calcGameStatus = nextState => {
    const sumSelected = nextState.selectedIds.reduce((acc, curr) => {
      return acc + this.randomNumbers[curr];
    }, 0);

    if (nextState.remainingSeconds === 0) {
      return 'LOST';
    }
    if (sumSelected < this.target) {
      return 'PLAYING';
    }

    if (sumSelected === this.target) {
      return 'WON';
    }
    if (sumSelected > this.target) {
      return 'LOST';
    }
  };

  render() {
    const gameStatus = this.gameStatus;
    return (
      <View>
        <Text style={[styles.target, styles['STATUS_${gameStatus}']]}>
          {this.target}
        </Text>
        <View style={styles.randomNumberStyle}>
          {this.randomNumbers.map((randomNumber, index) => (
            <RandomNumber
              key={index}
              id={index}
              number={randomNumber}
              isDisabled={
                this.isNumberSelected(index) || gameStatus !== 'PLAYING'
              }
              onPress={this.selectNumber}
            />
          ))}
        </View>

        {this.gameStatus !== 'PLAYING' && (
          <Button
            style={styles.playAgainStyle}
            title="Play again"
            onPress={this.props.onPlayAgain}></Button>
        )}
        <Text style={styles.statusStyle}>{this.state.remainingSeconds}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    justifyContent: 'center',
  },

  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: 'white',
  },

  randomNumberStyle: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

  buttonStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  statusStyle: {
    fontSize: 30,
    marginVertical: 300,
    alignSelf: 'center',
  },

  playAgainStyle: {
    fontSize: 30,
    marginVertical: 0,
    alignSelf: 'center',
    alignItems: 'flex-end',
  },

  random: {
    width: 100,
    backgroundColor: '#ddd',
    marginHorizontal: 30,
    marginVertical: 25,
    fontSize: 60,
    textAlign: 'center',
  },

  target: {
    backgroundColor: '#ddd',
    fontSize: 50,
    margin: 50,
    textAlign: 'center',
  },

  STATUS_PLAYING: {
    backgroundColor: '#ddd',
  },

  STATUS_WON: {
    backgroundColor: 'green',
  },

  STATUS_LOST: {
    backgroundColor: 'red',
  },
});

export default Game;
