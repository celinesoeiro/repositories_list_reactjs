import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repos, setRepos] = useState([]);
  const [n, setN] = useState(0);

  /** EFFECTS */
  useEffect(()=>{
    api.get('/repositories').then(resp => {
      setRepos(resp.data);
    });
  },[]);

  /** FUNCTIONS */
  async function handleAddRepository() {
    let count = n + 1;
    setN(count);

    const response = await api.post('/repositories',{
      "title": `ML to predict if a costumer will or not stay in the bank ${count}`,
      "url": "https://github.com/celinesoeiro/costumer_stays_in_bank",
      "techs": ["Python"]
    });

    const newRepo = response.data;

    setRepos([...repos, newRepo]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
    
    let arr = [];

    if (response.status === 204){
      arr = repos.filter(r => r.id !== id);
    } else {
      console.log(response.status)
    }

    setRepos(arr);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map(r => (
          <li key={r.id}>
            {r.title}
            <button onClick={() => handleRemoveRepository(r.id)}>
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
