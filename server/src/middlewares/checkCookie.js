const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

exports.checkCookie = function checkCookie (req, res, next) {
    const authToken = req.cookies.authToken;

    if(!authToken) return res.status(403).send('You do not have a cookie');

    const loggedIn = jwt.verify(authToken, secret);

    if(!loggedIn) return res.status(404).send('You are not authorised');

    req.loggedIn = loggedIn;
    next();
}