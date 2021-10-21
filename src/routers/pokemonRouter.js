const fs = require("fs");
const express = require("express");
const Pokedex = require("pokedex-promise-v2");
const router = express.Router();
const pokedex = new Pokedex();
const isUser = require("../middleware/userHandler");
const { isPokemonExist } = require("../middleware/errorHandler");
const { pokemonFormatter, createPokemonFile, readFiles } = require("../directive");

// user middleware error handler
router.use(isUser);

// get request for a pokemon by ID or by Name
router.get("/get/:id", (request, response) => {
  pokedex
    .getPokemonByName(request.params.id)
    .then((res) => {
      // taking the data and keeping only the relevant data in the sending format
      const pokemon = pokemonFormatter(res);

      //   sending the resFormat as a JOSN
      response.send(pokemon);
      response.end();
      return;
    })
    .catch((err) => {
      response.status(404).json({ error: err.message + " Pokemon not found" });
      response.end();
      return;
    });
});

// get request for query (searching by name)
router.get("/query", (request, response) => {
  pokedex
    .getPokemonByName(request.query.name)
    .then((res) => {
      // taking the data and keeping only the relevant data in the sending format
      const pokemon = pokemonFormatter(res);

      //   sending the resFormat as a JOSN
      response.send(pokemon);
      response.end();
      return;
    })
    .catch((err) => {
      response.status(404).json({ error: err.message + " Pokemon not found" });
      response.end();
      return;
    });
});

// put request for catching a pokemon
router.put("/catch/:id", isPokemonExist, (request, response) => {
  pokedex
    .getPokemonByName(request.params.id)
    .then((res) => {
      const dir = `./users/${request.headers.username}`;
      const id = res.id;
      const pokemon = pokemonFormatter(res);

      createPokemonFile(pokemon, dir, id);

      response.send("Pokemon was caught successfully");
      response.end();
      return;
    })
    .catch((err) => {
      response.status(404).json({ error: err.message + " Pokemon not found" });
      response.end();
      return;
    });
});

// delete request for releasing a pokemon
router.delete("/release/:id", isPokemonExist, (request, response) => {
  try {
    const file = `./users/${request.headers.username}/${request.params.id}.json`;
    fs.rmSync(file);
    response.send("Pokemon was released");
    response.end();
  } catch (err) {
    throw err;
  }
});

// get request to see all the caught pokemons
router.get("/", (request, response) => {
  try {
    const user = request.headers.username;
    const pokemons = readFiles(`./users/${user}`);
    response.send(pokemons);
    response.end();
  } catch (err) {
    throw err;
  }
});

module.exports = router;
