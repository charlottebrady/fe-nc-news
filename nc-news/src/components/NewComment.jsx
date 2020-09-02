import React from "react";
import * as api from "../utils/api";

class NewComment extends React.Component {
  state = { body: "" };

  handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    const { article_id, username, newComment } = this.props;
    const { body } = this.state;
    api.postNewComment(article_id, username, body).then((postedComment) => {
      newComment(postedComment);
      this.setState({ body: "" });
    });
  };

  handleChange = (changeEvent) => {
    const userInput = changeEvent.target.value;
    this.setState({ body: userInput });
  };

  render() {
    const { username } = this.props;
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
            value={this.state.body}
          />
          <br />
          <button type="submit">post</button>
        </form>
      </section>
    );
  }
}

export default NewComment;
