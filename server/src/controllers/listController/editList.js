const mysql = require('mysql2');
const { config } = require('../../database/config');
const { idSchema } = require('../../schemas/idSchema');
const { titleSchema } = require('../../schemas/titleSchema');

// establish connection to database
const connection = mysql.createConnection(config);

// editList function
exports.editList = function editList (req, res) {
    const { errorID } = idSchema.validate(req.body);
    const { errorTitle } = titleSchema.validate(req.body);

    if(errorID || errorTitle) {
        if(errorID) return res.status(400).send(errorID);

        if(errorTitle) return res.status(400).send(errorTitle);
    };

    const { id, title } = req.body;

    connection.query(
        `UPDATE todoLists SET title = ? WHERE id = ?`, [title, id], (error, result) => {
        if(error) {
            console.log(error);
        } else {
            res.status(200).send('Todo list was successfully changed');
        }
    })
};