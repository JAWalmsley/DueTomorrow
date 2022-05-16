const dbManager = require("./dbManager")
const uuid = require("uuid");
const bcrypt = require("bcryptjs");

exports.register = function (req, res, callback) {
    const {username, password} = req.body;
    let userExists = false;
    dbManager.getUser(username).then(function (result) {
        if (result.length > 0) {
            console.log("already exists")
            res.sendStatus(401);
        }
        return bcrypt.hash(password, 10);
    }).then(function (hash) {
        return dbManager.createUser(username, hash)
    }).then(function (result) {
        console.log("created user")
        res.sendStatus(200);
    })
}