import React, { Component } from "react";
import * as api from "../utils/api";
import { Link } from "@reach/router";
import { StyledNav } from "../styled/lib";
import ErrorPage from "./ErrorPage";

class Nav extends Component {
  state = { topics: [], err: null };

  componentDidMount() {
    api
      .getAllTopics()
      .then((topics) => {
        this.setState({ topics });
      })
      .catch((err) => {
        this.setState(err);
      });
  }

  render() {
    const { topics, err } = this.state;
    if (err) {
      return (
        <ErrorPage
          msg="Seems like our server is a bit sleepy... wakey wakey!! Please try again soon"
          status="500"
          img="https://media1.giphy.com/media/xT5LMAeAK2hy1jjRzW/source.gif"
        />
      );
    }
    return (
      <StyledNav>
        <Link to="/" className="homeButton">
          Home {"🏠"}
        </Link>
        <br />
        <br />
        {topics.map((topic) => {
          return (
            <Link
              to={`/topics/${topic.slug}/articles`}
              key={topic.slug}
              className="navButton"
            >
              {topic.slug[0].toUpperCase() + topic.slug.slice(1)}
            </Link>
          );
        })}
      </StyledNav>
    );
  }
}

export default Nav;
