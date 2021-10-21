const express = require("express");
const Pokedex = require("pokedex-promise-v2");
const router = express.Router();
const pokedex = new Pokedex();

// get request for a pokemon by ID or by Name
router.get("/get/:id", (request, response) => {
  pokedex
    .getPokemonByName(request.params.id)
    .then((res) => {
      let typesArr = [];
      let abilitiesArr = [];

      //   putting the types names in an array for the return format
      for (const value of res.types) {
        typesArr.push(value["type"]["name"]);
      }

      //   putting the abilities names in an array for the return format
      for (const value of res.abilities) {
        abilitiesArr.push(value["ability"]["name"]);
      }

      //   the format that the pokemon data is returned in
      const resFormat = {
        name: res.name,
        height: res.height,
        weight: res.weight,
        types: typesArr,
        front_pic: res.sprites.front_default,
        back_pic: res.sprites.back_default,
        abilities: abilitiesArr,
      };

      //   sending the resFormat as a JOSN
      response.send(resFormat);
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
router.get("/query", (request, response) => {
  pokedex
    .getPokemonByName(request.query.name)
    .then((res) => {
      let typesArr = [];
      let abilitiesArr = [];

      //   putting the types names in an array for the return format
      for (const value of res.types) {
        typesArr.push(value["type"]["name"]);
      }

      //   putting the abilities names in an array for the return format
      for (const value of res.abilities) {
        abilitiesArr.push(value["ability"]["name"]);
      }

      //   the format that the pokemon data is returned in
      const resFormat = {
        name: res.name,
        height: res.height,
        weight: res.weight,
        types: typesArr,
        front_pic: res.sprites.front_default,
        back_pic: res.sprites.back_default,
        abilities: abilitiesArr,
      };

      //   sending the resFormat as a JOSN
      response.send(resFormat);
      response.end();
      return;
    })
    .catch((err) => {
      response.send("got an error: " + err);
      response.end();
      return;
    });
});

module.exports = router;
