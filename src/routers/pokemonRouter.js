const fs = require("fs");
const express = require("express");
const Pokedex = require("pokedex-promise-v2");
const router = express.Router();
const pokedex = new Pokedex();
const isUser = require("../middleware/userHandler");
const isPokemonExist = require("../middleware/errorHandler");
let currentPokemonId; // used to identify the current pokemon id to save time on the catch request

// get request for a pokemon by ID or by Name
router.get("/get/:id", isUser, (request, response) => {
  pokedex
    .getPokemonByName(request.params.id)
    .then((res) => {
      // taking the data and keeping only the relevant data in the sending format
      const pokemon = pokemonFormatter(res);

      //   saving the ID in the variable
      //   currentPokemonId = res.id;

      //   sending the resFormat as a JOSN
      response.send(pokemon);
      response.end();
      return;
    })
    .catch((err) => {
      response.send("got an error: " + err);
      response.end();
      return;
    });
});

// get request for query (searching by name)
router.get("/query", isUser, (request, response) => {
  pokedex
    .getPokemonByName(request.query.name)
    .then((res) => {
      // taking the data and keeping only the relevant data in the sending format
      const pokemon = pokemonFormatter(res);

      //   saving the ID in the variable
      //   currentPokemonId = res.id;

      //   sending the resFormat as a JOSN
      response.send(pokemon);
      response.end();
      return;
    })
    .catch((err) => {
      response.send("got an error: " + err);
      response.end();
      return;
    });
});

router.put("/catch/:id", isUser, isPokemonExist, (request, response) => {
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
      response.send("got an error: " + err);
      response.end();
      return;
    });
});

// getting a JSON of a pokemon and taking out only the relevant data and putting it inside the sending format
function pokemonFormatter(pokemonJson) {
  let typesArr = [];
  let abilitiesArr = [];

  //   putting the types names in an array for the return format
  for (const value of pokemonJson.types) {
    typesArr.push(value["type"]["name"]);
  }

  //   putting the abilities names in an array for the return format
  for (const value of pokemonJson.abilities) {
    abilitiesArr.push(value["ability"]["name"]);
  }

  //   the format that the pokemon data is returned in
  const pokemonFormat = {
    id: pokemonJson.id,
    name: pokemonJson.name,
    height: pokemonJson.height,
    weight: pokemonJson.weight,
    types: typesArr,
    front_pic: pokemonJson.sprites.front_default,
    back_pic: pokemonJson.sprites.back_default,
    abilities: abilitiesArr,
  };

  return pokemonFormat;
}

function createPokemonFile(pokemon, userDir, id) {
  fs.writeFileSync(`${userDir}/${id}.json`, JSON.stringify(pokemon));
}

module.exports = router;
