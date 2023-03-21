const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const { regUser } = require('../../schemas/regUser');
const { config } = require('../../database/config');

// establish connection to database
const connection = mysql.createConnection(config);

// register function
exports.register = function register (req, res) {
    const { error, value } = regUser.validate(req.body);

    if(error) {
        return res.status(400).send(error.details);
    }

    const { username, password, confirmedPassword } = req.body;
    const sql = `SELECT * FROM users WHERE username = ?`;

    connection.query(sql, [username], async (error, result) => {
        if(error) return res.status(500).send(error);

        if(result.length > 0) {
            res.status(409).send('Username is taken');
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            connection.query(`INSERT INTO users(username, hashed_password) VALUES(?, ?)`, [username, hashedPassword], (error, result) =>{
                if(error) return res.status(500).send(error);
                res.status(201).send('User added')
            })
        };
    });
};