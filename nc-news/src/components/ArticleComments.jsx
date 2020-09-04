import React from "react";
import * as api from "../utils/api";
import ToggleViewer from "./ToggleViewer";
import NewComment from "./NewComment";
import Voter from "./Voter";
import ErrorPage from "./ErrorPage";
import { StyledLi, StyledUl } from "../styled/lib";
import DeleteComment from "./DeleteComment";
import Loader from "./Loader";

class ArticleComments extends React.Component {
  state = { comments: [], err: null, isLoading: true };

  componentDidMount() {
    const { article_id } = this.props;
    api
      .getArticleComments(article_id)
      .then((comments) => {
        this.setState({ comments, isLoading: false, err: null });
      })
      .catch((err) => {
        this.setState({ err });
      });
  }

  deletedComment = (comment_id) => {
    return this.setState((currentState) => {
      const commentsUpdated = currentState.comments.filter((comment) => {
        const commentCopy = { ...comment };
        return commentCopy.comment_id !== parseInt(comment_id);
      });
      return { comments: commentsUpdated, err: null };
    });
  };

  newComment = (newComment) => {
    this.setState((currentState) => {
      return {
        comments: [newComment, ...currentState.comments],
        err: null,
      };
    });
  };

  render() {
    const { comments, err, isLoading } = this.state;
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
    } else if (isLoading) {
      return <Loader />;
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
        </ToggleViewer>
        <StyledUl className="commentsList">
          {comments.map((comment) => {
            const { comment_id, author, body, votes } = comment;
            return (
              <StyledLi key={comment_id} className="comment">
                <h4>{author}:</h4>
                <p>{body}</p>
                {author === username && (
                  <DeleteComment
                    comment_id={comment_id}
                    deletedComment={this.deletedComment}
                  />
                )}
                {author !== username ? (
                  <Voter
                    votes={votes}
                    username={username}
                    id={comment_id}
                    type="comments"
                  />
                ) : (
                  <p>
                    <span role="img" aria-label="votes">
                      🧡{votes}
                    </span>
                  </p>
                )}
              </StyledLi>
            );
          })}
        </StyledUl>
      </section>
    );
  }
}

export default ArticleComments;
