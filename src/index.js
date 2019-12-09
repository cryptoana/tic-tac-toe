import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Square class renders a single button
class Square extends React.Component {
  // we don't need the constructor here anymore, as Square no longer keeps track of the Game's state
  // constructor (props) {
  //   super (props)
  //   // initial state
  //   this.state = {
  //     value: null
  //   }
  // }

  render() {
    return (
      // when the button is clicked, we are using this.setState to change the state 'value' to 'X' 
      // because we are changing the state, React will re-render that square with the new value
      // {this.state.value} will display the new state, so we will see the 'X' in the square
      // before it was {this.props.value}, but now we want to get the value from the State, instead of props from another component
      // changing again {this.state.value} to {this.props.value} as we're getting the onClick prop from the Board component
      // changing onClick={() =>  this.setState({value: 'X'})} to this.props.onClick()
      <button 
        className="square" 
        onClick={() =>  this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

// Board class renders 9 squares
class Board extends React.Component {
  constructor (props) {
    super(props);
    // lifting up state from child component (Square) to parent component (Board)
    // new initial state contains an array of 9 nulls coresponding to the 9 squares
    this.state = {
      squares: Array(9).fill(null),
      // setting the first move to be 'X' by default, so then each time a player moves, xIsNext will be flipped 
      // to determine which player goes next and the game’s state will be saved
      xIsNext: true
    }
  }

  handleClick(i) {
    // slice() method without parameters copies the whole array, so we can modify it without changing the existing array
    // handleClick flips the value of xIsNext
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : '0';
    this.setState({ 
      squares: squares,
      xIsNext: !this.state.xIsNext 
    })
  }

  renderSquare(i) {
    // Board class passes a prop "value" to the Square component (child)
    // once we used setState in the Square component to change value to 'X', the prop "value={1}" is ignored by Square component
    // then, we modify the prop to read the value from the state, so that Board instructs each individual square about its current value
    return <Square 
      value={this.state.squares[i]}
      // when a square is clicked, we want the Square the update the Board's state, so we're passing down a function from Board to Square
      // Square component will call the function when a square is clicked
      onClick={() => this.handleClick(i)}
    />;
  }

  render() {
    // calling calculateWinner(squares) on the Board's render function to check if a player has won
    const winner = calculateWinner(this.state.squares);
    let status;

    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    // const status = 'Next player: ' + (this.state.xIsNext ? 'X' : "0");

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

// Game class renders the Board
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// Given an array of 9 squares, calculateWinner will check for a winner and return 'X', 'O', or null as appropriate
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);