const mysql = require('mysql2');
const { config } = require('../../database/config');
const { usernameSchema } = require('../../schemas/usernameSchema');
const { titleSchema } = require('../../schemas/titleSchema');

// establish connection to database
const connection = mysql.createConnection(config);

// addLists function
exports.addList = function addList (req, res) {
    const { errorUsername } = usernameSchema.validate(req.body);
    const { errorTitle } = titleSchema.validate(req.body);

    if(errorUsername || errorTitle) {
        if(errorUsername) return res.status(400).send(errorUsername);

        if(errorTitle) return res.status(400).send(errorTitle);
    }

    const { username, title } = req.body;

    connection.query(`INSERT INTO todoLists(username, title) VALUES (?, ?)`, [username, title], (error, result) => {
        if(error) {
            console.log(error);
        } else {
            res.status(201).send('Todo List successfully added');
        }
    })
};