import React, { Component } from "react";
import * as api from "../utils/api";
import ErrorPage from "./ErrorPage";

class DeleteComment extends Component {
  state = { isLoading: false, err: null };

  deleteComment = (deleteEvent) => {
    deleteEvent.target.disabled = true;
    const { comment_id, deletedComment } = this.props;
    this.setState({ isLoading: true });
    api
      .deleteComment(comment_id)
      .then(() => {
        this.setState(() => {
          deletedComment(comment_id);
          return { err: null };
        });
      })
      .catch((err) => {
        this.setState({ err });
      });
  };

  render() {
    const { isLoading, err } = this.state;
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
    }
    return (
      <section>
        <button onClick={this.deleteComment}>delete</button>
        {isLoading && <p>deleting...</p>}
      </section>
    );
  }
}

export default DeleteComment;
