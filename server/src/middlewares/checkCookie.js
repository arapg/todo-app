const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

exports.checkCookie = function checkCookie (req, res, next) {
    const authToken = req.cookies.authToken;

    if(!authToken) return res.status(401).send('You are not authorized');

    const loggedIn = jwt.verify(authToken, secret);

    if(!loggedIn) return res.status(401).send('You are not authorized');

    req.loggedIn = loggedIn;
    next();
}