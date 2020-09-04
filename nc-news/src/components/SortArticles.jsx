import React from "react";
import ArticlesList from "./ArticlesList";
import { StyledUl } from "../styled/lib";
import { Link } from "@reach/router";

class SortArticles extends React.Component {
  render() {
    const { topic, articles, sort_by } = this.props;
    return (
      <section>
        Sort by...
        <Link to={`/topics/${topic}/articles/created_at`} className="filter">
          Date
        </Link>{" "}
        <Link to={`/topics/${topic}/articles/comment_count`} className="filter">
          Comments
        </Link>{" "}
        <Link to={`/topics/${topic}/articles/votes`} className="filter">
          Votes
        </Link>{" "}
        <StyledUl>
          <ArticlesList articles={articles} sort_by={sort_by} />
        </StyledUl>
      </section>
    );
  }
}

export default SortArticles;
