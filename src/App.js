import React, { useState } from "react";

import "./App.css";
import backgroundImage from "./assets/background.png";

import Header from "./Components/Header";

function App() {
  const [projects, setProject] = useState([
    "Desenvolvimento de app",
    "Fron-end web",
  ]);

  function handleAddProject() {
    setProject([...projects, `Novo projeto ${Date.now()}`]);
  }

  return (
    <>
      <Header title='Projectos' />
      <img width={400} src={backgroundImage} />
      <ul>
        {projects.map((project) => (
          <li key={project}>{project}</li>
        ))}
      </ul>
      <button type='button' onClick={() => handleAddProject()}>
        Adicionar projeto
      </button>
    </>
  );
}

export default App;
