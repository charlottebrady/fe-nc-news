import React, { Component } from "react";
import * as api from "../utils/api";
import { Link } from "@reach/router";
import { StyledLi } from "../styled/lib";
import ErrorPage from "./ErrorPage";

class UserArticles extends Component {
  state = {
    userInput: "",
    isLoading: false,
    validInput: null,
    articles: [],
    display: false,
  };

  handleChange = (changeEvent) => {
    this.setState({ userInput: changeEvent.target.value });
  };

  handleClick = (clickEvent) => {
    this.setState({ isLoading: true });
  };

  handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    api.getArticles().then((articles) => {
      const filteredArticles = articles.filter((article) => {
        const articleCopy = { ...article };
        return articleCopy.author === this.state.userInput;
      });
      if (filteredArticles.length === 0) {
        this.setState({
          validInput: false,
          isLoading: false,
          userInput: "",
          display: true,
        });
      } else {
        this.setState({
          articles: filteredArticles,
          isLoading: false,
          validInput: true,
          userInput: "",
          display: true,
        });
      }
    });
  };

  render() {
    const { isLoading, articles, validInput, display } = this.state;
    return (
      <section>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="userSearch">search user:</label>
          <input
            type="text"
            onChange={this.handleChange}
            value={this.userInput}
          ></input>{" "}
          <button type="submit" onClick={this.handleClick}>
            <span role="img" aria-label="search">
              🔎
            </span>
          </button>
        </form>
        {isLoading && <p>loading...</p>}
        {display ? (
          validInput ? (
            articles.map((article) => {
              return (
                <StyledLi key={article.article_id}>
                  <Link to={`/articles/${article.article_id}`}>
                    {article.title}
                  </Link>
                </StyledLi>
              );
            })
          ) : (
            <ErrorPage
              msg="Oops that user has no articles! You might want to check your spelling and try again"
              status="404/400"
              img="https://i.gifer.com/Knxc.gif"
            />
          )
        ) : (
          <p></p>
        )}
      </section>
    );
  }
}

export default UserArticles;
