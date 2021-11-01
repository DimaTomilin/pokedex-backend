const express = require("express");
const POKEDEX = require("pokedex-promise-v2");
const path = require("path")
const { serverError } = require("./src/middleware/errorHandler");
const pokedex = new POKEDEX();
const server = express();
const port = 8080;
const pokemonRouter = require("./src/routers/pokemonRouter");
const userRouter = require("./src/routers/userRouter");
const cors = require('cors');



server.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
server.use('/', express.static(path.resolve('./dist'))); // serve main path as static dir
server.get('/', function(req, res) { // serve main path as static file
  res.sendFile(path.resolve('./dist/index.html'))
});

server.use("/user", userRouter);
server.use("/pokemon", pokemonRouter);

server.use(serverError);


// starting the server
server.listen(process.env.PORT || port, () => {
  console.log(`listening on port: ${port}`);
});
