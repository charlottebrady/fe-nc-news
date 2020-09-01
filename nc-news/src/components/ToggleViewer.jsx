import React, { Component } from "react";

class ToggleViewer extends Component {
  state = { isVisible: false };
  toggleView = () => {
    this.setState((currentState) => {
      return { isVisible: !currentState.isVisible };
    });
  };
  render() {
    const { isVisible } = this.state;
    const { type } = this.props;
    return (
      <div>
        <button onClick={this.toggleView}>
          {isVisible ? `hide ${type}` : `show ${type}`}
        </button>
        {isVisible && this.props.children}
      </div>
    );
  }
}

export default ToggleViewer;
