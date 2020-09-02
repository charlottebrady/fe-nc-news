import React from "react";
import "./App.css";
import Title from "./components/Title";
import { Router } from "@reach/router";
import HomePage from "./components/HomePage";
import Articles from "./components/Articles";
import SingleArticle from "./components/SingleArticle";
import "./layout.css";
import ErrorPage from "./components/ErrorPage";

class App extends React.Component {
  state = { username: "jessjelly" };

  render() {
    return (
      <div className="App AppLayout">
        <Title />
        <Router className="Main">
          <HomePage path="/" />
          <Articles path="/topics/:topic/articles" />
          <SingleArticle
            path="/articles/:article_id"
            username={this.state.username}
          />
          <Articles path="topics/:topic/articles/:sort_by" />
          <ErrorPage
            default
            msg={
              "Hmmm something doesn't look quite right... that path couldn't be found!"
            }
            status={404}
            img="https://i.gifer.com/6zIA.gif"
          />
        </Router>
      </div>
    );
  }
}

export default App;
