// const { response } = require('express');
const express = require('express');
const app = express();
const port = 3000;
const ToDo = require('./model/todo');
const exampleData = require('./model/example_data');
const API = require('./server/api');
const nunjucks = require('nunjucks');

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.use('/static', express.static('public'));
app.set('view engine', 'njk');

let todos = new ToDo();

exampleData.forEach((item) => {
  todos.createItem(item);
});

let api = new API(app, todos);

app.get('/', (request, response) => {
  response
    .append('Cache-Control', 'no-store, max-age=0')
    .render('index.njk', {todos: todos.getAll()});
});

app.get('/create', (request, response) => {
  response
    .render('create.njk');
});

app.get('/:id/edit', (request, response) => {
  let todo = todos.getItem(request.params.id);
  response
    .render('edit.njk', {todo: todo});
});

app.get('/:id/delete', (request, response) => {
  let todo = todos.getItem(request.params.id);
  response
    .render('delete.njk', {todo: todo});
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});