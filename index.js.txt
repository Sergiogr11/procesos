// [START gae_flex_quickstart]

const fs = require("fs");
const express = require('express');
const app = express();

//http get post put delete
/*
get "/"
get "/Obtener Partidas"
post get "/agregarUsuario/:nick"
put "/actualizarPartida"
delete "/eliminarPartida"
...
*/

app.get('/', (req, res) => {
  res
    .status(200)
    .send("Hola")
    .end();
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_flex_quickstart]