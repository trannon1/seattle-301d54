'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const pg = require('pg');

const PORT = process.env.PORT || 3001;
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));


// route
app.get('/', (request, response) => {
  response.status(200).send('Proof of life');
})

app.get('/add', (request, response) => {
  let firstName = request.query.first;
  let lastName = request.query.last;
  
  let sql = 'INSERT INTO people (first_name, last_name) VALUES ($1, $2);';
  let safeValues = [firstName, lastName];

  client.query(sql, safeValues)


  // check the database
  let sql = 'SELECT * FROM people WHERE name=$1;';
  let safeValues = ['steven'];

  client.query(sql, safeValues)
    .then(results => {
      
    })
})

app.get('*', (request, response) => {
  response.status(404).send('Page Not Found');
})


client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`listening on ${PORT}`));
})
  .catch((err) => console.error(err));