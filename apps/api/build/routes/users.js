"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserDB_1 = require("../databaseManagers/UserDB");
var express = require('express');
var uuid = require('uuid');
var bcrypt = require('bcryptjs');
var isUserAuthorized = require("./userAuth").isUserAuthorized;
var router = express.Router({ mergeParams: true });
router.post('/', function (req, res) {
    if (!(req.body.username && req.body.password))
        return res.status(400).send('No data given');
    var newid = uuid.v4();
    UserDB_1.userDBInstance.getByUsername(req.body.username)
        .then(function (usr) {
        if (usr) {
            throw 'Already exists';
        }
        else {
            return bcrypt.hash(req.body.password, 10);
        }
    })
        .then(function (hash) {
        var newUser = {
            id: newid,
            password: hash,
            username: req.body.username
        };
        return UserDB_1.userDBInstance.create(newUser);
    })
        .then(function () {
        req.session.loggedin = true;
        req.session.userid = newid;
        res.status(200).send(newid);
    })
        .catch(function (err) {
        res.status(400).send(err);
    });
});
router.get('/:userid', isUserAuthorized, function (req, res) {
    UserDB_1.userDBInstance.getByUserID(req.params.userid)
        .then(function (usr) {
        if (!usr) {
            throw 'Does not exist';
        }
        // Extract only id and username, no password
        var info = {
            id: usr.id,
            username: usr.username
        };
        res.status(200).send(info);
    })
        .catch(function (err) { return res.status(400).send(err); });
});
router.put('/:userid/password', isUserAuthorized, function (req, res) {
    UserDB_1.userDBInstance.setPassword(req.params.userid, req.body)
        .then(function () { return res.status(200).send(); })
        .catch(function (err) { return res.status(400).send(err); });
});
router.delete('/:userid', isUserAuthorized, function (req, res) {
    res.status(404).send("Can't delete users (yet)");
});
exports.default = router;
