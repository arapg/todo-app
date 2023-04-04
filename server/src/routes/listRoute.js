const express = require('express');
const { addList } = require('../controllers/listController/addList');
const { deleteList } = require('../controllers/listController/deleteList');
const { editList } = require('../controllers/listController/editList');
const { getLists } = require('../controllers/listController/getLists');
const listRoute = express.Router();

listRoute.get('/:username', getLists);
listRoute.post('/add', addList);
listRoute.patch('/edit', editList);
listRoute.delete('/delete/:id', deleteList);

exports.listRoute = listRoute;