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
    const { type, functionality } = this.props;

    if (functionality === "show_hide") {
      return (
        <div>
          <button onClick={this.toggleView}>
            {isVisible ? `hide ${type}` : `show ${type}`}
          </button>
          {isVisible && this.props.children}
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={this.toggleView}>
            {isVisible ? `cancel ${type}` : `${type}`}
          </button>
          {isVisible && this.props.children}
        </div>
      );
    }
  }
}

export default ToggleViewer;
