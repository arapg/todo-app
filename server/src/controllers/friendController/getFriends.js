const mysql = require('mysql2');
const { config } = require('../../database/config');
const { usernameSchema } = require('../../schemas/usernameSchema');

// establish connection to database
const connection = mysql.createConnection(config);

// get list of friends
exports.getFriends = function getFriends (req, res) {
    const { errorUsername } = usernameSchema.validate(req.params);
    if(errorUsername) return res.status(400).send(errorUsername);

    const { username } = req.params;

    connection.query(`SELECT * FROM friends WHERE user1 = ? OR user2 = ?`, [username, username], (error, result) => {
        if(error) {
            console.log(error);
        } else {
            res.status(200).json(result);
        }
    });
};