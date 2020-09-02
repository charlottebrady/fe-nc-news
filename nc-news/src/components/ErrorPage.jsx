import React from "react";

const ErrorPage = ({ msg, status, img }) => {
  return (
    <section>
      <header>
        <h2>Whoops!</h2>
      </header>
      <main>
        <p>
          {msg}
          <br />
          <img src={img} alt={`error ${status}`} />
          <br />
          status code: {status}
        </p>
      </main>
    </section>
  );
};

export default ErrorPage;
