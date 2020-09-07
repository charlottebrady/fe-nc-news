import React, { Component } from "react";
import * as api from "../utils/api";

class SortComments extends Component {
  handleClick = (sort_by) => {
    const { sortComments, article_id } = this.props;
    api.getArticleComments(article_id, sort_by).then((sortedComments) => {
      sortComments(sortedComments);
    });
  };

  render() {
    return (
      <section>
        <label htmlFor="sort_buttons">sort by...</label>
        <div id="sort_buttons">
          <button
            onClick={() => {
              this.handleClick("created_at");
            }}
            sort_by="created_at"
          >
            most recent
          </button>{" "}
          <button
            onClick={() => {
              this.handleClick("votes");
            }}
          >
            popular
          </button>
        </div>
      </section>
    );
  }
}

export default SortComments;
