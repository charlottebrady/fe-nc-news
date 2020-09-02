import React from "react";
import { StyledLi } from "../styled/lib";
import { Link } from "@reach/router";

const ArticlesList = ({ articles }) => {
  return articles.map((article) => {
    const { article_id, title } = article;
    return (
      <Link to={`/articles/${article_id}`} key={article_id}>
        <StyledLi>
          <h3>{title}</h3>
        </StyledLi>
      </Link>
    );
  });
};

export default ArticlesList;
