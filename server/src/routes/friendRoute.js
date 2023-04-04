const express = require('express');
const { addFriend } = require('../controllers/friendController/addFriend');
const { deleteFriend } = require('../controllers/friendController/deleteFriend');
const { getFriendLists } = require('../controllers/friendController/getFriendLists');
const { getFriends } = require('../controllers/friendController/getFriends');
const friendRoute = express.Router();

friendRoute.get('/', getFriends);
friendRoute.post('/add/', addFriend);
friendRoute.delete('/delete/', deleteFriend);
friendRoute.get('/:friend', getFriendLists);


exports.friendRoute = friendRoute;