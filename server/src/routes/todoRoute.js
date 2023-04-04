const express = require('express');
const { addTodo } = require('../controllers/todoController/addTodo');
const { completeTodo } = require('../controllers/todoController/completeTodo');
const { deleteTodo } = require('../controllers/todoController/deleteTodo');
const { editTodo } = require('../controllers/todoController/editTodo');
const { getTodos } = require('../controllers/todoController/getTodos');
const { uncompleteTodo } = require('../controllers/todoController/uncompleteTodo');
const todoRoute = express.Router();

todoRoute.get('/:id', getTodos);
todoRoute.post('/add', addTodo);
todoRoute.patch('/edit', editTodo);
todoRoute.delete('/delete/:id', deleteTodo);
todoRoute.patch('/complete/:id', completeTodo);
todoRoute.patch('/uncomplete/:id', uncompleteTodo);

exports.todoRoute = todoRoute;