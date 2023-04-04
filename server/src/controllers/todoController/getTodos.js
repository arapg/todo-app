const mysql = require('mysql2');
const { config } = require('../../database/config');
const { idSchema } = require('../../schemas/idSchema');

// establish connection to database
const connection = mysql.createConnection(config);

// get todos
exports.getTodos = function getTodos (req, res) {
    const { errorID } = idSchema.validate(req.params);
    if(errorID) return res.status(400).send(errorID);
    
    const { id } = req.params;
    
    connection.query('SELECT * FROM todos WHERE listID = ?', [id], (error, result) => {
        if(error) {
            console.error(error);
        } else {
            res.status(200).json(result);
        }
    });
};