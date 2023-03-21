const express = require('express');
const Joi = require('joi');
const mysql = require('mysql2');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config({path:'../.env'});
const { checkCookie } = require('./middlewares/checkCookie');
const { authenticationRoute } = require('./routes/authenticationRoute');
const { config } = require('./database/config');

const server = express();
const connection = mysql.createConnection(config)


server.use(express.json());
server.use(cookieParser());
server.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

connection.connect();

server.use('/auth', authenticationRoute);


// get todo lists
server.get('/list', (req, res) => {
    
    connection.query('SELECT * FROM todoLists', (error, result) => {
        if(error) {
            console.error(error);
        } else {
            res.status(200).json(result);
        }
    });
});

// add todo lists
server.post('/list/add', (req, res) => {
    const { username, title } = req.body;

    connection.query(`INSERT INTO todoLists(username, title) VALUES (?, ?)`, [username, title], (error, result) => {
        if(error) {
            console.log(error);
        } else {
            res.status(201).send('Todo List successfully added');
        }
    })

});

// edit todo list title
server.patch('/list/edit/:id', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    connection.query(
        `UPDATE todoLists SET title = '${title}' WHERE id = ${id}`, (error, result) => {
        if(error) {
            console.log(error);
        } else {
            res.status(200).send('Todo list was successfully changed');
        }
    })
});

// delete todo list
server.delete('/list/delete/:id', (req, res) => {
    const { id } = req.params;
    
    connection.query(`DELETE FROM todoLists WHERE id=${id}`, (error, result) => {
        if(error) {
            console.log(error);
        } else {
            res.status(200).send('Todo list deleted');
        }
    })
})

// get todos
server.get('/todo', (req, res) => {
    
    connection.query('SELECT title, completed FROM todos', (error, result) => {
        if(error) {
            console.error(error);
        } else {
            res.status(200).send(result);
        }
    });
});

// add todos
server.post('/todo/add', (req, res) => {
    const { listID, title, completed } = req.body;

    connection.query(`INSERT INTO todos(listID, title, completed) VALUES (${listID}, '${title}', ${completed})`, (error, result) => {
        if(error) {
            console.log(error);
        } else {
            res.status(201).send('Todo successfully added');
        }
    })

});

// edit todo title
server.patch('/todo/edit/:id', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    connection.query(
        `UPDATE todos SET title = '${title}' WHERE id = ${id}`, (error, result) => {
        if(error) {
            console.log(error);
        } else {
            res.status(200).send('Todo was successfully changed');
        }
    })
})

// delete todo
server.delete('/todo/delete/:id', (req, res) => {
    const { id } = req.params;
    
    connection.query(`DELETE FROM todos WHERE id=${id}`, (error, result) => {
        if(error) {
            console.log(error);
        } else {
            res.status(200).send('Todo deleted');
        }
    })
})

// mark as completed
server.patch('/todo/complete/:id', (req, res) => {
    const { id } = req.params;
    
    connection.query(`UPDATE todos SET completed = 1 WHERE id = ${id}`, (error, result) => {
        if(error) {
            console.log(error);
        } else {
            res.status(201).send('Todo was marked as completed');
        }
    })
})

server.listen(5050)