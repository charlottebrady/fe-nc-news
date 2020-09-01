import React from "react";

const NewComment = () => {
  return (
    <form>
      <label>
        comment: <input type="text" required="true"></input>
      </label>
      <button>post</button>
    </form>
  );
};

export default NewComment;
