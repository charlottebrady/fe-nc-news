import React, { Component } from "react";
import * as api from "../utils/api";
import Loader from "./Loader";
import ToggleViewer from "./ToggleViewer";
import ArticleComments from "./ArticleComments";

class SingleArticle extends Component {
  state = { article: [], isLoading: true };

  componentDidMount() {
    api.getSingleArticle(this.props.article_id).then((article) => {
      this.setState({ article, isLoading: false });
    });
  }

  render() {
    const { article, isLoading } = this.state;
    const { title, body, author, article_id } = article;
    if (isLoading) return <Loader />;
    return (
      <main>
        <h1>{title}</h1>
        <h4>- {author} </h4>
        <p> {body}</p>
        <p>Comment count: {article.comment_count}</p>
        <ToggleViewer type="comments">
          <ArticleComments article_id={article_id} />
        </ToggleViewer>
      </main>
    );
  }
}

export default SingleArticle;
