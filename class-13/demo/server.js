'use strict';

const express = require('express');
const app = express();
require('ejs');
const pg = require('pg');
require('dotenv').config();
const methodOverride = require('method-override');

const PORT = process.env.PORT || 3001;

app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use(methodOverride('_method'));



const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => {
  console.error(err);
});

// routes
app.get('/', getTasks);
app.get('/tasks/:task_id', getOneTask);
app.get('/add', showForm);
app.post('/add', addTask);
app.put('/update/:task_id', updateTask);

function getTasks(request, response){
  // get tasks out of database:
  let sql = 'SELECT * FROM tasks;';
  client.query(sql)
    .then(results => {
      response.render('pages/index', {arrayOfTasks: results.rows});
    })
  // go to my database, get all my tasks in database and display them on my index.ejs page
  
}

function getOneTask(request, response){
  let id = request.params.task_id;
  let sql = 'SELECT * FROM tasks WHERE id = $1;';
  let safeValues = [id];

  client.query(sql, safeValues)
    .then(results => {
      let chosenTask = results.rows[0];
      response.render('pages/details', { taskInfo: chosenTask });
    })
  // go to the database, get a specific task using the id of that task and show the details of that task on the detail.ejs page
}

function showForm(request, response){
  // display a form to add a task
  response.render('pages/addTask.ejs');
}

function addTask(request, response){
  // when a form is submitted, add the task to the database and then redirect back to the homepage

  // { title: 'eat dinner',
  // description: 'eat all the tacos',
  // category: 'food',
  // contact: 'Isaac',
  // status: 'not done' }

  let {title, description, category, contact, status} = request.body;

  let sql = 'INSERT INTO tasks (title, description, category, contact, status) VALUES ($1, $2, $3, $4, $5);';
  let safeValues = [title, description, category, contact, status];

  client.query(sql, safeValues);

  response.redirect('/');
}

function updateTask(request, response){
  let {title, description, contact, status} = request.body;

  let sql = 'UPDATE tasks SET title=$1, description=$2, contact=$3, status=$4 WHERE id=$5;';

  let id = request.params.task_id;

  let safeValues = [title, description, contact, status, id];

  client.query(sql, safeValues);

  response.redirect(`/tasks/${id}`);
  // redirect to the detail page with the new information
}

client.connect(() => {
  app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
  })
})