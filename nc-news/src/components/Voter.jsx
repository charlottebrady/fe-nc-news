import React, { Component } from "react";
import * as api from "../utils/api";
import ErrorPage from "./ErrorPage";

class Voter extends Component {
  state = { optimisticVotes: 0, err: null };

  updateItem = (vote) => {
    const { id, type } = this.props;
    api
      .voteOnItem(type, id, vote)
      .then((updatedItem) => {
        this.setState((currentState) => {
          return { optimisticVotes: currentState.optimisticVotes + vote };
        });
      })
      .catch((err) => {
        this.setState({ err });
      });
  };

  render() {
    const { votes, type } = this.props;
    const { optimisticVotes, err } = this.state;
    let like = "😇";
    let dislike = "👿";
    if (err) {
      if ("code" in err) {
        return (
          <ErrorPage
            msg="Seems like our server is a bit sleepy... wakey wakey!! Please try again soon"
            status="500"
            img="https://media1.giphy.com/media/xT5LMAeAK2hy1jjRzW/source.gif"
          />
        );
      }
    } else if (type === "comments") {
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
