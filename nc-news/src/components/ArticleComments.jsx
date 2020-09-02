import React from "react";
import * as api from "../utils/api";
import ToggleViewer from "./ToggleViewer";
import NewComment from "./NewComment";
import Voter from "./Voter";

class ArticleComments extends React.Component {
  state = { comments: [], posted: 0 };

  componentDidMount() {
    const { article_id } = this.props;
    api.getArticleComments(article_id).then((comments) => {
      this.setState({ comments });
    });
  }

  deleteComment = (clickEvent) => {
    const comment_id = clickEvent.target.id;
    api.deleteComment(comment_id).then(() => {
      this.setState((currentState) => {
        const commentsUpdated = currentState.comments.filter((comment) => {
          const commentCopy = { ...comment };
          return commentCopy.comment_id !== parseInt(comment_id);
        });
        return { comments: commentsUpdated, posted: 0 };
      });
    });
  };

  newComment = (newComment) => {
    this.setState((currentState) => {
      return {
        comments: [newComment, ...currentState.comments],
        posted: 1,
      };
    });
  };

  render() {
    const { comments, posted } = this.state;
    const { username } = this.props;
    return (
      <section>
        <h3>Comments:</h3>
        <ToggleViewer type="new comment">
          <NewComment
            username={this.props.username}
            article_id={this.props.article_id}
            newComment={this.newComment}
          />
          {posted === 1 && <p>your comment has been posted!</p>}
        </ToggleViewer>
        <ul className="commentsList">
          <br />
          {comments.map((comment) => {
            const { comment_id, author, body, votes } = comment;
            return (
              <li key={comment_id} className="comment">
                <h4>{author}:</h4> {body} <br /> <br />
                {author === username && (
                  <button onClick={this.deleteComment} id={comment_id}>
                    delete
                  </button>
                )}
                <Voter
                  votes={votes}
                  username={username}
                  id={comment_id}
                  type="comments"
                />
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default ArticleComments;
