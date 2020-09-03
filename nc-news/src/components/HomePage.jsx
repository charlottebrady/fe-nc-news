import React, { Component } from "react";
import * as api from "../utils/api";
import ArticlesList from "./ArticlesList";
import { StyledUl } from "../styled/lib";
import Loader from "./Loader";
import ErrorPage from "./ErrorPage";

class HomePage extends Component {
  state = {
    trendingArticles: [],
    mostRecentArticles: [],
    isLoading: true,
    err: null,
  };

  componentDidMount() {
    this.getTrendingArticles()
      .then((articles) => {
        const trendingArticles = articles.slice(0, 5);
        this.setState({ trendingArticles }, () => {
          this.getMostRecentArticles().then((articles) => {
            const mostRecentArticles = articles.slice(0, 5);
            this.setState({ mostRecentArticles, isLoading: false });
          });
        });
      })
      .catch((err) => {
        this.setState({ err });
      });
  }

  getTrendingArticles = () => {
    return api.getArticles("comment_count");
  };

  getMostRecentArticles = () => {
    return api.getArticles("created_at");
  };

  render() {
    const { trendingArticles, mostRecentArticles, isLoading, err } = this.state;
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
    } else {
      return (
        <main>
          <h2>{"🔥"}Top 5 trending:</h2>
          <StyledUl>
            <ArticlesList articles={trendingArticles} />
          </StyledUl>
          <h2>{"✨"}Most recent:</h2>
          <StyledUl>
            <ArticlesList articles={mostRecentArticles} />
          </StyledUl>
        </main>
      );
    }
  }
}

export default HomePage;
