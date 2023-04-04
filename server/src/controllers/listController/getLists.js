const mysql = require('mysql2');
const { config } = require('../../database/config');
const { usernameSchema } = require('../../schemas/usernameSchema');

// establish connection to database
const connection = mysql.createConnection(config);

// getLists function
exports.getLists = function getLists (req, res) {
    const { errorUsername } = usernameSchema.validate(req.params);
    if(errorUsername) return res.status(400).send(errorUsername);

    const { username } = req.params;
    
    connection.query('SELECT * FROM todoLists WHERE username = ?', [username], (error, result) => {
        if(error) {
            console.error(error);
        } else {
            res.status(200).json(result);
        }
    });
};