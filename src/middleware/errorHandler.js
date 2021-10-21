const fs = require("fs");

function isPokemonExist(req, res, next) {
  const method = req.method;
  const pokemon = `${req.params.id}.json`;
  const dir = req.headers.username;

  const pokemons = fs.readdirSync(`./users/${dir}`);

  if (method == "PUT" && pokemons.includes(pokemon)) {
    return res.status(403).json({ error: "Pokemon already caught!" });
  } else if (method == "DELETE" && !pokemons.includes(pokemon)) {
    return res.status(403).json({ error: "Pokemon is not caught!" });
  }

  next();
}

function serverError(error, req, res, next) {
  res.status(500);
  res.send("Oops, something went wrong.");
  res.end();
}

module.exports = {
  isPokemonExist,
  serverError,
};
