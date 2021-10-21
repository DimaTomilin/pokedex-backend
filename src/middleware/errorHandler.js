const fs = require("fs");

function isPokemonExist(req, res, next) {
  const pokemon = `${req.params.id}.json`;
  const dir = req.headers.username;

  const pokemons = fs.readdirSync(`./users/${dir}`);

  if (pokemons.includes(pokemon)) {
    return res.status(403).json({ error: "Pokemon already caught!" });
  }

  next();
}

module.exports = isPokemonExist;
