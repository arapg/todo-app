const mysql = require('mysql2');
const { config } = require('../../database/config');
const { usernameSchema } = require('../../schemas/usernameSchema');
const { friendSchema } = require('../../schemas/friendSchema');

// establish connection to database
const connection = mysql.createConnection(config);

// delete list
exports.deleteFriend = function deleteFriend (req, res) {
    const { errorUsername } = usernameSchema.validate(req.params);
    const { errorFriend } = friendSchema.validate(req.body);

    if(errorUsername || errorFriend) {
        if(errorUsername) return res.status(400).send(errorUsername);

        if(errorFriend) return res.status(400).send(errorFriend);
    }

    const { username } = req.params;
    const { friend } = req.body;
    
    connection.query(`DELETE FROM friends WHERE (user1 = ? AND user2 = ?) OR (user1 = ? AND user2 = ?)`, [username, friend, friend, username], (error, result) => {
        if(error) {
            console.log(error);
        } else {
            res.status(200).send('Friend removed');
        }
    })
}