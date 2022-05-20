const dbManager = require("./dbManager")("BTE")
const uuid = require("uuid");
const bcrypt = require("bcryptjs");

exports.register = function (req, res, callback) {
    const {username, password} = req.body;
    let userExists = false;
    dbManager.getUsers(username).then(function (result) {
        if (result.length > 0) {
            console.log("already exists")
            res.sendStatus(401);
            throw 'Already exists';
        }
        return bcrypt.hash(password, 10);
    }).catch((err) => {
        console.log(err);
    }).then(function (hash) {
        return dbManager.createUser(uuid.v4(), username, hash)
    }).then(function (result) {
        return dbManager.getUsers(username)
    }).then(function (result) {
        let user = result[0];
        req.session.loggedin = true;
        req.session.userid = user.userid;
        req.session.username = user.username;
        res.sendStatus(200);
    })
}