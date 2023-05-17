import React from "react";
import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">Bugxinator!</span>
        </h1>
      </header>
      <main className="public__main">
        <p>
          A simple, fast and scalable bug tracking system that helps you manage
          bugs easily and deliver great products on time.
        </p>
        <br />
        <p>Built by: Aldo Moro</p>
      </main>
      <footer>
        <Link to="/login">User Login</Link>
      </footer>
    </section>
  );
  return content;
};

export default Public;
