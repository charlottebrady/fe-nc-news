import React from "react";
import "./App.css";
import Title from "./components/Title";
import { Router } from "@reach/router";
import HomePage from "./components/HomePage";
import Articles from "./components/Articles";
import SingleArticle from "./components/SingleArticle";
import "./layout.css";
import NewComment from "./components/NewComment";

function App() {
  return (
    <div className="App AppLayout">
      <Title />
      <Router className="Main">
        <HomePage path="/" />
        <Articles path="/topics/:topic/articles" />
        <SingleArticle path="/articles/:article_id" />
        <Articles path="topics/:topic/articles/:sort_by" />
        <NewComment path="/articles/:article_id/new_comment" />
      </Router>
    </div>
  );
}

export default App;
