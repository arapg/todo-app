const mysql = require('mysql2');
const { config } = require('../../database/config');
const { idSchema } = require('../../schemas/idSchema');
const { titleSchema } = require('../../schemas/titleSchema');

// establish connection to database
const connection = mysql.createConnection(config);

// add todos
exports.addTodo = function addTodo (req, res) {
    const { errorID } = idSchema.validate(req.body);
    const { errorTitle } = titleSchema.validate(req.body);

    if(errorID || errorTitle) {
        if(errorID) return res.status(400).send(errorID);

        if(errorTitle) return res.status(400).send(errorTitle);
    };

    const { id, title } = req.body;
    const completed = 0;

    connection.query(`INSERT INTO todos(listID, title, completed) VALUES (?, ?, ?)`, [id, title, completed], (error, result) => {
        if(error) {
            console.log(error);
        } else {
            res.status(201).send('Todo successfully added');
        }
    });
};