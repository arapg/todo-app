const mysql = require('mysql2');
const { config } = require('../../database/config');
const { usernameSchema } = require('../../schemas/usernameSchema');
const { friendSchema } = require('../../schemas/friendSchema');

// establish connection to database
const connection = mysql.createConnection(config);

// get friend's lists
exports.getFriendLists = function getFriendLists (req, res) {
    const { errorUsername } = usernameSchema.validate(req.params);
    const { errorFriend } = friendSchema.validate(req.params);

    if(errorUsername || errorFriend) {
        if(errorUsername) return res.status(400).send(errorUsername);

        if(errorFriend) return res.status(400).send(errorFriend);
    }

    const { username, friend } = req.params;

    // check if users are friends
    connection.query(`SELECT * FROM friends WHERE (user1 = ? AND user2 = ?) OR (user1 = ? AND user2 = ?)`, [username, friend, friend, username], (error, result) => {
        if(error) return res.status(500).send(error);

        // if users are friends, show friend's lists
        if(result.length > 0) {
            connection.query('SELECT * FROM todoLists WHERE username = ?', [friend], (error, result) => {
                if(error) {
                    console.error(error);
                } else {
                    res.status(200).json(result);
                }
            });

        // if users aren't friends, tell user they're unauthorised
        } else {
            res.status(401).send('Unathorised: You are not friends with this user');
        }
    });
};