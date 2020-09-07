import React, { Component } from "react";
import * as api from "../utils/api";
import Loader from "./Loader";
import ErrorPage from "./ErrorPage";
import SortArticles from "./SortArticles";

class Articles extends Component {
  state = { articles: [], isLoading: true, err: null };

  componentDidMount() {
    this.getArticles()
      .then((articles) => {
        this.setState({ articles, isLoading: false, err: null });
      })
      .catch((err) => {
        this.setState({ err });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.topic !== this.props.topic ||
      prevProps.sort_by !== this.props.sort_by
    ) {
      this.getArticles()
        .then((articles) => {
          this.setState({ articles, err: null });
        })
        .catch((err) => {
          this.setState({ err });
        });
    }
  }

  getArticles = () => {
    const { sort_by, topic } = this.props;
    return api.getArticles(sort_by, topic, null);
  };

  render() {
    const { articles, isLoading, err } = this.state;
    const { topic, sort_by } = this.props;
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
            img={
              response.status === 404
                ? "https://i.kym-cdn.com/entries/icons/original/000/015/976/homer-simpson-bush-gif.gif"
                : "https://i.gifer.com/8Hw5.gif"
            }
          />
        );
      }
    }
    if (isLoading) return <Loader />;
    return (
      <main>
        <header>
          <h2>{topic[0].toUpperCase() + topic.slice(1)} articles:</h2>
        </header>
        <SortArticles topic={topic} articles={articles} sort_by={sort_by} />
      </main>
    );
  }
}

export default Articles;
