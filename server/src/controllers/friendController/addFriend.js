const mysql = require('mysql2');
const { config } = require('../../database/config');
const { usernameSchema } = require('../../schemas/usernameSchema');
const { friendSchema } = require('../../schemas/friendSchema');

// establish connection to database
const connection = mysql.createConnection(config);

// add friend
exports.addFriend = function addFriend (req, res) {
    const { errorUsername } = usernameSchema.validate(req.params);
    const { errorFriend } = friendSchema.validate(req.body);

    if(errorUsername || errorFriend) {
        if(errorUsername) return res.status(400).send(errorUsername);

        if(errorFriend) return res.status(400).send(errorFriend);
    }

    const { username } = req.params;
    const { friend } = req.body;

    connection.query(`SELECT * FROM users WHERE username = ?`, [friend], (error, result) => {
        if(error) return res.status(500).send(error);

        if(result.length > 0) {
            connection.query(`SELECT * FROM friends WHERE (user1 = ? AND user2 = ?) OR (user1 = ? AND user2 = ?)`, [username, friend, friend, username], (error, result) => {
                if(error) return res.status(500).send(error);

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