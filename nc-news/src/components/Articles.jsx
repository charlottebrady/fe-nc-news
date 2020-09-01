import React, { Component } from "react";
import * as api from "../utils/api";
import ArticlesList from "./ArticlesList";
import { StyledUl } from "../styled/lib";
import Loader from "./Loader";
import { Link } from "@reach/router";

class Articles extends Component {
  state = { articles: [], isLoading: true };

  componentDidMount() {
    this.getArticles().then((articles) => {
      this.setState({ articles, isLoading: false });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topic !== this.props.topic) {
      this.getArticles().then((articles) => {
        this.setState({ articles });
      });
    } else if (prevProps.sort_by !== this.props.sort_by) {
      this.getArticles().then((articles) => {
        this.setState({ articles });
      });
    }
  }

  getArticles = () => {
    const { sort_by, topic } = this.props;
    return api.getArticles(sort_by, topic);
  };

  render() {
    const { articles, isLoading } = this.state;
    if (isLoading) return <Loader />;
    return (
      <main>
        <h2>
          {this.props.topic[0].toUpperCase() + this.props.topic.slice(1)}{" "}
          articles:
        </h2>
        <section>
          Sort by...{" "}
          <Link
            to={`/topics/${this.props.topic}/articles/created_at`}
            className="filter"
          >
            Date
          </Link>{" "}
          <Link
            to={`/topics/${this.props.topic}/articles/comment_count`}
            className="filter"
          >
            Comments
          </Link>{" "}
          <Link
            to={`/topics/${this.props.topic}/articles/votes`}
            className="filter"
          >
            Votes
          </Link>
        </section>
        <StyledUl>
          <ArticlesList articles={articles} sort_by={this.props.sort_by} />
        </StyledUl>
      </main>
    );
  }
}

export default Articles;
