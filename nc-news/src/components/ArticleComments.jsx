import React from "react";
import * as api from "../utils/api";
import ToggleViewer from "./ToggleViewer";
import NewComment from "./NewComment";
import Voter from "./Voter";
import ErrorPage from "./ErrorPage";

class ArticleComments extends React.Component {
  state = { comments: [], posted: 0, err: null };

  componentDidMount() {
    const { article_id } = this.props;
    api
      .getArticleComments(article_id)
      .then((comments) => {
        this.setState({ comments });
      })
      .catch((err) => {
        this.setState({ err });
      });
  }

  deleteComment = (clickEvent) => {
    const comment_id = clickEvent.target.id;
    api
      .deleteComment(comment_id)
      .then(() => {
        this.setState((currentState) => {
          const commentsUpdated = currentState.comments.filter((comment) => {
            const commentCopy = { ...comment };
            return commentCopy.comment_id !== parseInt(comment_id);
          });
          return { comments: commentsUpdated, posted: 0 };
        });
      })
      .catch((err) => {
        this.setState({ err });
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
    const { comments, posted, err } = this.state;
    const { username } = this.props;
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
                <h4>{author}:</h4>
                <p>{body}</p>
                {author === username && (
                  <button onClick={this.deleteComment} id={comment_id}>
                    delete
                  </button>
                )}
                {author !== username ? (
                  <Voter
                    votes={votes}
                    username={username}
                    id={comment_id}
                    type="comments"
                  />
                ) : (
                  <p>Votes: {votes} </p>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default ArticleComments;
