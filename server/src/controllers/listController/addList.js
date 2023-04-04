const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { config } = require('../../database/config');
const { usernameSchema } = require('../../schemas/usernameSchema');
const { titleSchema } = require('../../schemas/titleSchema');

const secret = process.env.SECRET;

// establish connection to database
const connection = mysql.createConnection(config);

// addLists function
exports.addList = function addList (req, res) {
    const authToken = req.cookies.authToken;
    const decoded = jwt.decode(authToken, secret);

    const { username } = decoded;
    const { title } = req.body;

    // endpoint validation
    const { errorUsername } = usernameSchema.validate(username);
    const { errorTitle } = titleSchema.validate(title);

    if(errorUsername || errorTitle) {
        if(errorUsername) return res.status(400).send(errorUsername);

        if(errorTitle) return res.status(400).send(errorTitle);
    };


    

    connection.query(`INSERT INTO todoLists(username, title) VALUES (?, ?)`, [username, title], (error, result) => {
        if(error) {
            console.log(error);
        } else {
            res.status(201).send('Todo List successfully added');
        }
    })
};