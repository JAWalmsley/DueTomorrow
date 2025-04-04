"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserDB_1 = require("../databaseManagers/UserDB");
var express = require('express');
var router = express.Router({ mergeParams: true });
var bcrypt = require('bcrypt');
router.post('/', function (req, res) {
    var _a = req.body, username = _a.username, password = _a.password;
    if (!username || !password) {
        res.status(400).send('Insufficient data');
        return;
    }
    var userSearch = UserDB_1.userDBInstance.getByUsername(username);
    var passwordCompare = userSearch
        .then(function (user) {
        if (user == undefined) {
            throw Error('User not exist');
        }
        return bcrypt.compare(password, user.password);
    })
        .catch(function (err) { return console.log(err); });
    Promise.all([userSearch, passwordCompare]).then(function (_a) {
        var user = _a[0], passwordCorrect = _a[1];
        if (passwordCorrect) {
            req.session.loggedin = true;
            req.session.userid = user.id;
            req.session.username = user.username;
            res.status(200).send(user.id);
        }
        else {
            res.sendStatus(401);
        }
    });
});
module.exports = router;
