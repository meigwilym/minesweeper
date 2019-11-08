import React from 'react';

export default class Clock extends React.Component {

    constructor(props) {
      super(props);
      this.state = { time: 0 };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {

        clearInterval(this.timerID);
    }

    componentDidUpdate(oldProps) {
        if (oldProps.tick !== this.props.tick) {
            this.setState({
                time: 0
            });
        }
    }

    tick() {
        if (this.props.tick) {
            this.setState({
                time: this.state.time + 1
            });
        }
    }

    render() {
      return (
        <div className="clock">
            Time: { this.state.time }
        </div>
      );
    }
  }