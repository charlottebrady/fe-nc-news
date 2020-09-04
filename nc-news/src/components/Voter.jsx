import React, { Component } from "react";
import * as api from "../utils/api";
import ErrorPage from "./ErrorPage";

class Voter extends Component {
  state = { optimisticVotes: 0, err: null, isLoading: false, voted: false };

  updateItem = (vote) => {
    const { id, type } = this.props;
    this.setState({ isLoading: true });
    api
      .voteOnItem(type, id, vote)
      .then((updatedItem) => {
        this.setState((currentState) => {
          return {
            optimisticVotes: currentState.optimisticVotes + vote,
            isLoading: false,
            err: null,
            voted: true,
          };
        });
      })
      .catch((err) => {
        this.setState({ err });
      });
  };

  render() {
    const { votes, type } = this.props;
    const { optimisticVotes, err, isLoading, voted } = this.state;
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
        <p>
          <span role="img" aria-label="votes">
            🧡 {votes + optimisticVotes}
          </span>{" "}
        </p>
        {!this.props.username ? (
          <p className="message">Please login to vote!</p>
        ) : !voted ? (
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
            {isLoading && <p>voting...</p>}
          </div>
        ) : optimisticVotes > 0 ? (
          <p className="message">
            <span role="img" aria-label="love">
              ❤️{" "}
            </span>
            thanks for showing love!
            <span role="img" aria-label="love">
              ❤️
            </span>
          </p>
        ) : (
          <p className="message">
            <span role="img" aria-label="sad">
              💔
            </span>
            sorry you didn't like that...
            <span role="img" aria-label="sad">
              💔
            </span>
          </p>
        )}
      </section>
    );
  }
}

export default Voter;
