import React, { Component } from "react";
import * as api from "../utils/api";

class Voter extends Component {
  state = { optimisticVotes: 0 };

  updateItem = (vote) => {
    const { id, type } = this.props;
    api.voteOnItem(type, id, vote).then((updatedItem) => {
      this.setState((currentState) => {
        return { optimisticVotes: currentState.optimisticVotes + vote };
      });
    });
  };

  render() {
    const { votes, type } = this.props;
    const { optimisticVotes } = this.state;
    let like = "😇";
    let dislike = "👿";
    if (type === "comments") {
      like = "👍";
      dislike = "👎";
    }
    return (
      <section>
        <p>Votes: {votes + optimisticVotes}</p>
        {!this.props.username ? (
          <p>Please login to vote!</p>
        ) : (
          <div>
            <button
              className="voterButton"
              onClick={() => {
                this.updateItem(1);
              }}
            >
              {like}
            </button>
            {"   "}
            <button
              className="voterButton"
              onClick={() => {
                this.updateItem(-1);
              }}
            >
              {dislike}
            </button>
          </div>
        )}
      </section>
    );
  }
}

export default Voter;
