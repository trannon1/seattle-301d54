'use strict';

const express = require('express');
const app = express();
require('ejs');

const PORT = 3001;

app.use(express.static('./public'));

// telling express that I am using ejs. Tells express to look in the 'views' folder as it's root
app.set('view engine', 'ejs');

// Array of groceries for /list route
let list = ['apples', 'celery', 'butter', 'milk', 'eggs'];

// Array of quantities for /details route
let quantities = [
  {name: 'apples', quantity: 4},
  {name: 'celery', quantity: 1},
  {name: 'butter', quantity: 1},
  {name: 'milk', quantity: 2},
  {name: 'eggs', quantity: 12}
]

// route
app.get('/', (request, response) => {
  response.render('index.ejs');
})

app.get('/list', displayList)

function displayList(request, response){
  response.render('list', {arrayOfFood: list});
}

app.get('/quantities', (request, response) => {
  response.render('quantities', {quantitiesArray: quantities});
})

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
})
