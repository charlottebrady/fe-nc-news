import React, { Component } from "react";
import * as api from "../utils/api";
import { Link } from "@reach/router";
import { StyledLi } from "../styled/lib";
import ErrorPage from "./ErrorPage";

class UserArticles extends Component {
  state = {
    userInput: "",
    isLoading: false,

    articles: [],

    err: null,
  };

  handleChange = (changeEvent) => {
    this.setState({ userInput: changeEvent.target.value });
  };

  handleClick = (clickEvent) => {
    this.setState({ isLoading: true });
  };

  handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    const { userInput } = this.state;
    api
      .getArticles(null, null, userInput)
      .then((articles) => {
        if (articles.length === 0) {
          this.setState({
            isLoading: false,
            userInput: "",
          });
        } else {
          this.setState({
            articles,
            isLoading: false,
          });
        }
      })
      .catch((err) => {
        this.setState({ err });
      });
  };

  render() {
    const { isLoading, articles, err } = this.state;
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
            img="https://i.gifer.com/Knxc.gif"
          />
        );
      }
    }
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
        {articles.map((article) => {
          return (
            <StyledLi key={article.article_id}>
              <Link to={`/articles/${article.article_id}`}>
                {article.title}
              </Link>
            </StyledLi>
          );
        })}
      </section>
    );
  }
}

export default UserArticles;
