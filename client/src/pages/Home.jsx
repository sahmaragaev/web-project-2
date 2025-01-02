import React from "react";

function Home() {
  return (
    <div>
      <h1>Welcome to the Recipe Manager App</h1>
      <p>This app allows you to create, view, edit, and delete recipes.</p>

      <h2>Featured Recipe</h2>
      <div style={{ border: "1px solid #ccc", padding: "1em" }}>
        <h3>Chocolate Cake</h3>
        <p>Delicious, rich chocolate cake to satisfy your sweet tooth.</p>
      </div>

      <h2>My Web & Mobile 1 Projects</h2>
      <ul>
        <li>
          <a
            href="https://github.com/sahmaragaev/"
            target="_blank"
            rel="noreferrer"
          >
            Project 1
          </a>
        </li>
        <li>
          <a
            href="https://github.com/sahmaragaev/"
            target="_blank"
            rel="noreferrer"
          >
            Project 2
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Home;
