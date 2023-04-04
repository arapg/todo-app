const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
require('dotenv').config();
const { config } = require('../../database/config');
const { usernameSchema } = require('../../schemas/usernameSchema');
const { friendSchema } = require('../../schemas/friendSchema');

const secret = process.env.SECRET;

// establish connection to database
const connection = mysql.createConnection(config);

// add friend
exports.addFriend = function addFriend (req, res) {
    const authToken = req.cookies.authToken;
    const decoded = jwt.decode(authToken, secret);

    const { username } = decoded;

    console.log(username);

    const { errorUsername } = usernameSchema.validate(username);
    const { errorFriend } = friendSchema.validate(req.body);

    if(errorUsername || errorFriend) {
        if(errorUsername) return res.status(400).send(errorUsername);

        if(errorFriend) return res.status(400).send(errorFriend);
    }

    const { friend } = req.body;

    connection.query(`SELECT * FROM users WHERE username = ?`, [friend], (error, result) => {
        if(error) return res.status(404).send(error);

        if(result.length > 0) {
            connection.query(`SELECT * FROM friends WHERE (user1 = ? AND user2 = ?) OR (user1 = ? AND user2 = ?)`, [username, friend, friend, username], (error, result) => {
                if(error) {
                    console.log(error);
                    return res.status(500).send('Internal server error');
                }
                // if(error) return res.status(500).send(error);

                if(result.length > 0) {
                    res.status(409).send('You are already friends with this user');
                } else {
                    connection.query(`INSERT INTO friends(user1, user2) VALUES (?, ?)`, [username, friend], (error, result) => {
                        if(error) return res.status(500).send(error);
                        res.status(201).send('Friend added');
                    })
                }
            });
        } else {
            res.status(404).send('User not found');
        }
    });

    
};