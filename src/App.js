import React, { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";

import api from "./services/api";
import "./App.css";

import Header from "./Components/Header";

function App() {
  const [projects, setProject] = useState([]);
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");

  useEffect(() => {
    api.get("/projects").then((response) => {
      setProject(response.data);
    });
  }, []);

  async function handleAddProject(e) {
    e.preventDefault();

    const data = {
      title,
      owner,
    };

    const response = await api.post("/projects", data);

    setProject([...projects, response.data]);
    setTitle("");
    setOwner("");
  }

  async function handleDeleteProject(id) {
    try {
      await api.delete(`/projects/${id}`);

      setProject(projects.filter((project) => project.id !== id));
    } catch (err) {
      alert("Erro ao deletar o projeto");
    }
  }

  return (
    <div className='project-container'>
      <Header title='Projetos' />

      <form onSubmit={handleAddProject}>
        <input
          placeholder='Título do projeto'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder='Proprietário'
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />

        <button type='submit' className='button'>
          Adicionar projeto
        </button>
      </form>

      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <strong>PROJETO: </strong>
            {project.title}
            <p>
              <strong>PROPRIETÁRIO: </strong>
              {project.owner}
            </p>
            <button
              type='button'
              onClick={() => handleDeleteProject(project.id)}
            >
              <FiTrash2 />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
