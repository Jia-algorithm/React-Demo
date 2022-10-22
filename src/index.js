import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import logo from './asset/logo.svg';
import music from './asset/Missyou.mp3'
import music_on from './asset/music-on.svg';
import music_off from './asset/music-off.svg';

class Heading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            iMusicOn: false,
        };
    }

    audio = React.createRef();

    clickMusicIcon() {
        if (this.state.iMusicOn) {
            this.setState({
                iMusicOn: false,
            }, () => {
                this.audio.current.pause();
            });
        } else {
            this.setState({
                iMusicOn: true,
            }, () => {
                this.audio.current.play();
            });
        }
    }

    render(){
        return (
            <div className="heading-content">
                <div className="heading-left">
                    <img src={logo} width="30px" height="30px"/>
                    <div className="music-play" onClick={() => this.clickMusicIcon()}>
                        <img width="30px" height="30px" src={this.state.iMusicOn ? music_on : music_off}/>
                        <audio ref={this.audio} src={music}/>
                    </div>
                </div>
                <h1 className="heading-title">{this.props.title}</h1>
                <div className="heading-right">Hi, {this.props.player ? this.props.player : 'Stranger'}</div>
            </div>
        );
    }
    
}
    

function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  
class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
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

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSquares: Array(9).fill(null),
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            currentSquares: squares,
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        this.setState({
            stepNumber: step,
            currentSquares: history[step].squares.slice(),
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const currentSquares = this.state.currentSquares;
        const winner = calculateWinner(current.squares);
        
        const moves = history.map((step, move) => {
            const desc = move ?
              'Go to move #' + move :
              'Go to game start';
            return (
              <li key={move}>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
              </li>
            );
        });
        
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                <Board 
                    squares={currentSquares}
                    onClick={(i) => this.handleClick(i)}
                />
                </div>
                <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <div className="body">
        <Heading title="Tic-Tac-Toe Game"/>
        <Game />
    </div>
);
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