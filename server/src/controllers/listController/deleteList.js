const mysql = require('mysql2');
const { config } = require('../../database/config');
const { idSchema } = require('../../schemas/idSchema');

// establish connection to database
const connection = mysql.createConnection(config);

// delete list
exports.deleteList = function deleteList (req, res) {
    const { errorID } = idSchema.validate(req.params);
    if(errorID) return res.status(400).send(errorID);

    const { id } = req.params;
    
    connection.query(`DELETE FROM todoLists WHERE id = ?`, [id], (error, result) => {
        if(error) {
            console.log(error);
        } else {
            res.status(200).send('Todo list deleted');
        }
    })
}