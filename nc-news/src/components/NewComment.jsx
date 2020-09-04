import React from "react";
import * as api from "../utils/api";
import ErrorPage from "./ErrorPage";

class NewComment extends React.Component {
  state = { body: "", err: null, isLoading: false, posted: 0 };

  handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    const { article_id, username, newComment } = this.props;
    const { body } = this.state;
    api
      .postNewComment(article_id, username, body)
      .then((postedComment) => {
        newComment(postedComment);
        this.setState({ body: "", isLoading: false, posted: 1 });
      })
      .catch((err) => {
        this.setState({ err });
      });
  };

  handleChange = (changeEvent) => {
    const userInput = changeEvent.target.value;
    this.setState({ body: userInput });
  };

  handleClick = (clickEvent) => {
    this.setState({ isLoading: true });
  };

  render() {
    const { username } = this.props;
    const { err, body, isLoading, posted } = this.state;
    if (err) {
      return (
        <ErrorPage
          msg="Seems like our server is a bit sleepy... wakey wakey!! Please try again soon"
          status="500"
          img="https://media1.giphy.com/media/xT5LMAeAK2hy1jjRzW/source.gif"
        />
      );
    }
    if (!username) {
      return (
        <section>
          <p>Please log in to comment on this article!</p>
        </section>
      );
    }
    return (
      <section>
        <form onSubmit={this.handleSubmit}>
          <br />
          <label htmlFor="new_comment">
            <span role="img" aria-label="your comment">
              ✏️{" "}
            </span>
          </label>
          <textarea
            placeholder="Remember, be nice!"
            cols="40"
            rows="5"
            name="new_comment"
            required={true}
            onChange={this.handleChange}
            value={body}
          />
          <br />
          <button type="submit" onClick={this.handleClick}>
            post
          </button>
        </form>
        {isLoading && <p>posting...</p>}
        {posted === 1 && <p>your comment has been posted!</p>}
      </section>
    );
  }
}

export default NewComment;
