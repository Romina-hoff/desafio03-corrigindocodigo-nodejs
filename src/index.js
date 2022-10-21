const express = require("express");

const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuidv4(),
    title,
    url,
    techs,
    likes: 0
  };
  
  repositories.push(repository)
  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body
   const repositoryIndex = repositories.findIndex(repository => repository.id === id);
 
  if (repositoryIndex === -1) {
    return response.status(404).json({ error: "Repository not found" });
  }
   repositories[repositoryIndex].id = id
   repositories[repositoryIndex].title = title
   repositories[repositoryIndex].url  = url
   repositories[repositoryIndex].techs = techs

  return response.json({id, title, url, techs, likes: 0});
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex === -1) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex === -1) {
    return response.status(404).json({ error: "Repository not found" });
  }
  
  const likes = repositories[repositoryIndex].likes +1 ;

  repositories[repositoryIndex].likes = likes

  return response.json({likes});
});

module.exports = app;
