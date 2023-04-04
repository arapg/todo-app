const mysql = require('mysql2');
const { config } = require('../../database/config');
const { idSchema } = require('../../schemas/idSchema');

// establish connection to database
const connection = mysql.createConnection(config);

// mark todo as complete
exports.completeTodo = function completeTodo (req, res) {
    const { errorID } = idSchema.validate(req.params);
    if(errorID) return res.status(400).send(errorID);

    const { id } = req.params;
    
    connection.query(`UPDATE todos SET completed = 1 WHERE id = ?`, [id], (error, result) => {
        if(error) {
            console.log(error);
        } else {
            res.status(201).send('Todo was marked as completed');
        }
    });
};