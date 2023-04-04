const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
require('dotenv').config();
const { config } = require('../../database/config');
const { usernameSchema } = require('../../schemas/usernameSchema');

const secret = process.env.SECRET;

// establish connection to database
const connection = mysql.createConnection(config);

// getLists function
exports.getLists = function getLists (req, res) {
    const authToken = req.cookies.authToken;
    const decoded = jwt.decode(authToken, secret);

    const { username } = decoded;

    // endpoint validation
    const { errorUsername } = usernameSchema.validate(username);
    if(errorUsername) return res.status(400).send(errorUsername);
    
    connection.query('SELECT * FROM todoLists WHERE username = ?', [username], (error, result) => {
        if(error) {
            console.error(error);
        } else {
            res.status(200).json(result);
        }
    });
};