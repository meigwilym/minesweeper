import React from 'react';
import gameStatus from '../gameStatus';

export default class Clock extends React.Component {

    constructor(props) {
      super(props);
      this.state = { time: 0 };
    }

    componentDidUpdate(oldProps) {
        // game starts on the first click
        // change in game state from yetToStart to inProgress
        if (oldProps.gameStatus === gameStatus.yetToStart && this.props.gameStatus === gameStatus.inProgress) {
            this.start();
        }
        // either clicks on a mine or clears empty tiles.
        // change in game state from inProgress to win/lose
        if (oldProps.gameStatus === gameStatus.inProgress && this.props.gameStatus !== gameStatus.inProgress){
            this.stop();
        }
        // game is restarted mid game with no win/loss
        if(oldProps.gameStatus !== gameStatus.yetToStart && this.props.gameStatus === gameStatus.yetToStart) {
            this.stop();
            this.reset();
        }
    }

    tick() {
        this.setState({
            time: this.state.time + 1
        });
    }

    start() {
        this.reset(this.tickTock.bind(this));
    }

    tickTock() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    reset(cb) {
        this.setState({
            time: 0
        }, () => typeof cb !== 'undefined' ? cb() : null);
    }

    stop() {
        clearInterval(this.timerID);
    }

    render() {
      return (
        <div id="clock">
            Time: { this.state.time }
        </div>
      );
    }
  }