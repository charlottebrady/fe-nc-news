import React from "react";
import { StyledLi } from "../styled/lib";
import { Link } from "@reach/router";

const ArticlesList = ({ articles }) => {
  return articles.map((article) => {
    const { article_id, title, votes, comment_count } = article;
    return (
      <StyledLi key={article_id}>
        <Link to={`/articles/${article_id}`}>
          <h3>{title}</h3>
        </Link>
        <p>
          <span role="img" aria-label="votes">
            🧡 {votes}
          </span>{" "}
          <span role="img" aria-label="comments">
            💬 {comment_count}
          </span>{" "}
        </p>
      </StyledLi>
    );
  });
};

export default ArticlesList;
