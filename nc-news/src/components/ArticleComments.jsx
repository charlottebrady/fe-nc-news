import React from "react";
import * as api from "../utils/api";
import { Link } from "@reach/router";

class ArticleComments extends React.Component {
  state = { comments: [] };

  componentDidMount() {
    const { article_id } = this.props;
    api.getArticleComments(article_id).then((comments) => {
      this.setState({ comments });
    });
  }

  render() {
    const { comments } = this.state;
    const { article_id } = this.props;
    return (
      <section>
        <h3>Comments:</h3>
        <Link to={`/articles/${article_id}/new_comment`}>Add new</Link>
        <ul className="commentsList">
          <br />
          {comments.map((comment) => {
            return (
              <li key={comment.comment_id} className="comment">
                <h4>{comment.author}:</h4> {comment.body} <br /> <br />
                votes: {comment.votes}
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default ArticleComments;
