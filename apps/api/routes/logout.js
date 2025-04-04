var express = require('express');
var router = express.Router({ mergeParams: true });
var isUserAuthorized = require('./userAuth').isUserAuthorized;
router.post('/', function (req, res) {
    if (!req.session.loggedin)
        return res.status(403).send('Not logged in');
    req.session.destroy(function (err) {
        if (err) {
            res.status(400).send('Unable to log out');
        }
        else {
            res.status(200).send('Logged out');
        }
    });
});
module.exports = router;
