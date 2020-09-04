import React, { Component } from "react";
import * as api from "../utils/api";
import Loader from "./Loader";
import ToggleViewer from "./ToggleViewer";
import ArticleComments from "./ArticleComments";
import Voter from "./Voter";
import ErrorPage from "./ErrorPage";

class SingleArticle extends Component {
  state = { article: [], isLoading: true, err: null };

  componentDidMount() {
    api
      .getSingleArticle(this.props.article_id)
      .then((article) => {
        this.setState({ article, isLoading: false, err: null });
      })
      .catch((err) => {
        this.setState({ err });
      });
  }

  render() {
    const { article, isLoading, err } = this.state;
    const { title, body, author, article_id, votes, comment_count } = article;
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
      } else {
        const { response } = err;
        return (
          <ErrorPage
            msg={response.data.msg}
            status={response.status}
            img={
              response.status === 404
                ? "https://i.kym-cdn.com/entries/icons/original/000/015/976/homer-simpson-bush-gif.gif"
                : "https://i.gifer.com/8Hw5.gif"
            }
          />
        );
      }
    } else if (isLoading) return <Loader />;
    return (
      <main>
        <h2>{title}</h2>
        <h4>- {author} </h4>
        <p>{body}</p>

        {author !== username ? (
          <Voter
            votes={votes}
            id={article_id}
            username={username}
            type="articles"
          />
        ) : (
          <section>
            <span role="img" aria-label="votes">
              🧡 {votes}
            </span>
          </section>
        )}

        <p>
          <span role="img" aria-label="comments">
            💬 {comment_count}
          </span>
        </p>
        <ToggleViewer type="comments" functionality="show_hide">
          <ArticleComments article_id={article_id} username={username} />
        </ToggleViewer>
      </main>
    );
  }
}

export default SingleArticle;
