const fs = require("fs");

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

// creating the json file with the pokemon format
function createPokemonFile(pokemon, userDir, id) {
  fs.writeFileSync(`${userDir}/${id}.json`, JSON.stringify(pokemon));
}

// reading all the files in the user dir and returning an array with the name sof the pokemons
function readFiles(dirname) {
  const data = [];
  let filesArr = fs.readdirSync(dirname);
  for (const file of filesArr) {
    let name = JSON.parse(fs.readFileSync(`${dirname}/${file}`)).name;
    data.push(name);
  }
  return data;
}

module.exports = {
  pokemonFormatter,
  createPokemonFile,
  readFiles,
};
