const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
require('dotenv').config({path:'../../../.env'});
const { loginUser } = require('../../schemas/loginUser');
const { config } = require('../../database/config');


// import secret from .env
const secret = process.env.SECRET;

// establish connection to database
const connection = mysql.createConnection(config);

// login function
exports.login = function login (req, res) {
    const { error, value } = loginUser.validate(req.body);

    if(error) return res.status(400).send(error.details);

    const { username, password } = req.body;
    
    connection.query(
        `SELECT hashed_password FROM users WHERE username = ?`,
        [username],
        async (error, result) => {
            if(result.length > 0) {
                const hashedPassword = result[0].hashed_password;
                const validPassword = await bcrypt.compare(password, hashedPassword);
                
                if(validPassword) {
                    const authToken = jwt.sign({username: username}, secret, {expiresIn: 120});

                    res.cookie('authToken', authToken, {
                        maxAge: 360000,
                        httpOnly: true
                    });

                    res.status(200).send('Login successful!');
                } else {
                    res.status(400).send('Incorrect username or password');
                }
            } else {
                res.status(400).send('Incorrect username or password');
            }
        }
    )
};