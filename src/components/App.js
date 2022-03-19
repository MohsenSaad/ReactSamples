import React from 'react';
import Game from './Game';

//entry point for the app
class App extends React.Component {
  state = {
    gameId: 1,
  };

  resetGame = () => {
    this.setState(prevState => {
      return {gameId: prevState.gameId + 1};
    });
  };

  render() {
    return (
      <Game
        key={this.state.gameId}
        onPlayAgain={this.resetGame}
        randomNumerCount={6}
        initialSeconds={10}
      />
    );
  }
}

export default App;
