import React, { Component } from "react";
import * as api from "../utils/api";
import { Link } from "@reach/router";
import { StyledNav } from "../styled/lib";

class Nav extends Component {
  state = { topics: [] };

  componentDidMount() {
    this.getTopics().then((topics) => {
      this.setState({ topics });
    });
  }

  getTopics = () => {
    return api.getAllTopics();
  };

  render() {
    const { topics } = this.state;
    return (
      <StyledNav>
        <Link to="/" className="homeButton">
          Home
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
