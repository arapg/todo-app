const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
require('dotenv').config();
const { config } = require('../../database/config');
const { usernameSchema } = require('../../schemas/usernameSchema');
const { friendSchema } = require('../../schemas/friendSchema');

const secret = process.env.SECRET;

// establish connection to database
const connection = mysql.createConnection(config);

// delete list
exports.deleteFriend = function deleteFriend (req, res) {
    const authToken = req.cookies.authToken;
    const decoded = jwt.decode(authToken, secret);

    const { username } = decoded;
    
    // endpoint validation
    const { errorUsername } = usernameSchema.validate(username);
    const { errorFriend } = friendSchema.validate(req.body);

    if(errorUsername || errorFriend) {
        if(errorUsername) return res.status(400).send(errorUsername);

        if(errorFriend) return res.status(400).send(errorFriend);
    }

    const { friend } = req.body;
    
    
    connection.query(`DELETE FROM friends WHERE (user1 = ? AND user2 = ?) OR (user1 = ? AND user2 = ?)`, [username, friend.user, friend.user, username], (error, result) => {
        if(error) {
            console.log(error);
        } else {
            res.status(200).send('Friend removed');
        }
    })
}