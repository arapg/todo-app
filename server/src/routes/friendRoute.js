const express = require('express');
const { addFriend } = require('../controllers/friendController/addFriend');
const { deleteFriend } = require('../controllers/friendController/deleteFriend');
const { getFriendLists } = require('../controllers/friendController/getFriendLists');
const { getFriends } = require('../controllers/friendController/getFriends');
const friendRoute = express.Router();

friendRoute.get('/:username', getFriends);
friendRoute.post('/add/:username', addFriend);
friendRoute.delete('/delete/:username', deleteFriend);
friendRoute.get('/:username/:friend', getFriendLists);


exports.friendRoute = friendRoute;