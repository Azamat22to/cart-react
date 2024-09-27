import React, { Component } from "react";

class CountdownTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      isRunning: false,
    };
    this.timer = null;
  }

  tick = () => {
    const { hours, minutes, seconds } = this.state;

    if (hours === 0 && minutes === 0 && seconds === 0) {
      this.stopTimer();
      return;
    }

    if (seconds > 0) {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    } else if (minutes > 0) {
      this.setState((prevState) => ({
        minutes: prevState.minutes - 1,
        seconds: 59,
      }));
    } else if (hours > 0) {
      this.setState((prevState) => ({
        hours: prevState.hours - 1,
        minutes: 59,
        seconds: 59,
      }));
    }
  };

  startTimer = () => {
    const { isRunning, hours, minutes, seconds } = this.state;
    if (!isRunning && (hours > 0 || minutes > 0 || seconds > 0)) {
      this.setState({ isRunning: true });
      this.timer = setInterval(this.tick, 1000);
    }
  };
  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ isRunning: false });
  };

  clearTimer = () => {
    clearInterval(this.timer);
    this.setState({
      hours: 0,
      minutes: 0,
      seconds: 0,
      isRunning: false,
    });
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: Math.max(0, parseInt(value) || 0),
    });
  };

  render() {
    const { hours, minutes, seconds } = this.state;

    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1 style={{ color: "red", fontSize: "50px" }}>Timer</h1>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            gap: "15px",
          }}
        >
          <input
            style={{ padding: "10px" }}
            type="number"
            name="hours"
            value={hours}
            onChange={this.handleInputChange}
            placeholder="Soatlar"
          />
          <input
            type="number"
            name="minutes"
            value={minutes}
            onChange={this.handleInputChange}
            placeholder="Daqiqalar"
          />
          <input
            type="number"
            name="seconds"
            value={seconds}
            onChange={this.handleInputChange}
            placeholder="Soniyalar"
          />
        </div>
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <button
            style={{
              color: "white",
              backgroundColor: "blue",
              padding: "10px",
              border: "none",
            }}
            onClick={this.startTimer}
          >
            Boshlash
          </button>
          <button
            style={{ backgroundColor: "red", color: "white", border: "none" }}
            onClick={this.stopTimer}
          >
            To'xtatish
          </button>
          <button
            style={{
              backgroundColor: "yellow",
              color: "white",
              border: "none",
            }}
            onClick={this.clearTimer}
          >
            Tozalash
          </button>
        </div>
        <h2 style={{ marginTop: "20px", fontSize: "60px" }}>
          {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
          {String(seconds).padStart(2, "0")}
        </h2>
      </div>
    );
  }
}

export default CountdownTimer;
