'use strict';

const express = require('express');
const app = express();
const PORT = 3000;

// sets my public folder to be my root
app.use(express.static('./public'));

// this is a body parser that lets us read the content in the request.body
app.use(express.urlencoded());

// routes
app.post('/contact', collectInfo);

function collectInfo(request, response){
  console.log(request.body);
  response.send(request.body);
}

app.use('*', (request, response) => {
  response.status(404).send('page not found');
})

app.listen(PORT, () => console.log(`listing on ${PORT}`));