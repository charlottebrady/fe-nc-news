import React from "react";
import { StyledLi } from "../styled/lib";
import { Link } from "@reach/router";

const ArticlesList = ({ articles }) => {
  return articles.map((article) => {
    return (
      <Link to={`/articles/${article.article_id}`} key={article.article_id}>
        <StyledLi>
          <h3>{article.title}</h3>
        </StyledLi>
      </Link>
    );
  });
};

export default ArticlesList;
