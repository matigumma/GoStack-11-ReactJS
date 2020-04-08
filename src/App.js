import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api
      .get("repositories")
      .then(storedRepositories => setRepositories(storedRepositories.data))
      .catch(err => console.log(err));
  }, []);

  async function handleAddRepository() {
    try {
      const data = {
        title: `Novo project criado at: ${Date.now()}`,
        url: "...",
        techs: []
      };
      const newOne = await api.post("repositories", data);
      setRepositories([...repositories, newOne.data]);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      /* const Index = await repositories.findIndex(repo => repo.id === id);
      await api.delete(`repositories/${id}`);
      await repositories.splice(Index, 1);
      setRepositories([...repositories]); */
      setRepositories(repositories.filter(repo => repo.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories &&
          repositories.map(proj => (
            <li key={proj.id}>
              {proj.title}

              <button onClick={() => handleRemoveRepository(proj.id)}>
                Remover
              </button>
            </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
