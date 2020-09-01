import React, { Component } from "react";
import * as api from "../utils/api";
import ArticlesList from "./ArticlesList";
import { StyledUl } from "../styled/lib";
import Loader from "./Loader";

class HomePage extends Component {
  state = { trendingArticles: [], mostRecentArticles: [], isLoading: true };

  componentDidMount() {
    this.getTrendingArticles().then((articles) => {
      const top5Trending = articles.slice(0, 5);
      this.setState({ trendingArticles: top5Trending }, () => {
        this.getMostRecentArticles().then((articles) => {
          const mostRecentArticles = articles.slice(0, 5);
          this.setState({ mostRecentArticles, isLoading: false });
        });
      });
    });
  }

  getTrendingArticles = () => {
    return api.getArticles("comment_count");
  };

  getMostRecentArticles = () => {
    return api.getArticles("created_at");
  };

  render() {
    const { trendingArticles, mostRecentArticles, isLoading } = this.state;
    if (isLoading) {
      return <Loader />;
    } else {
      return (
        <main>
          <h2>Top 5 trending:</h2>
          <StyledUl>
            <ArticlesList articles={trendingArticles} />
          </StyledUl>
          <h2>Most recent:</h2>
          <StyledUl>
            <ArticlesList articles={mostRecentArticles} />
          </StyledUl>
        </main>
      );
    }
  }
}

export default HomePage;
