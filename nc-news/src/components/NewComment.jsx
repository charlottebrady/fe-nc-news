import React from "react";
import * as api from "../utils/api";
import ErrorPage from "./ErrorPage";

class NewComment extends React.Component {
  state = { body: "", err: null };

  handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    const { article_id, username, newComment } = this.props;
    const { body } = this.state;
    api
      .postNewComment(article_id, username, body)
      .then((postedComment) => {
        newComment(postedComment);
        this.setState({ body: "" });
      })
      .catch((err) => {
        this.setState({ err });
      });
  };

  handleChange = (changeEvent) => {
    const userInput = changeEvent.target.value;
    this.setState({ body: userInput });
  };

  render() {
    const { username } = this.props;
    const { err, body } = this.state;
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
          <label htmlFor="new_comment">your comment: </label>
          <textarea
            name="new_comment"
            required={true}
            onChange={this.handleChange}
            value={body}
          />
          <br />
          <button type="submit">post</button>
        </form>
      </section>
    );
  }
}

export default NewComment;
