import React from 'react';
import './History.css';

class History extends React.Component {

    render() {
        const steps = this.props.history.map((step, move) => {
            const desc = move ?
              'Go to move #' + move :
              'Go to game start';
            return (
              <div key={move}>
                <button className="historyStep" onClick={() => this.props.onClick(move)}>{desc}</button>
              </div>
            );
        })
        return (
            <div className="historyContainer">
              <div className="historyTitle">
                Game History
              </div>
              {steps}
            </div>
        );
    }
}

export default History;