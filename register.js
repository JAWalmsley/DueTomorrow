const dbManager = require('./dbManager')
const uuid = require('uuid');
const bcrypt = require('bcryptjs');

exports.register = function (req, res, callback) {
    const { username, password } = req.body;
    let userExists = false;
    dbManager
        .User.getByUsername(username)
        .then(function (result) {
            if (result != undefined) {
                console.log('already exists');
                res.sendStatus(401);
                return;
            }
            return bcrypt.hash(password, 10);
        })
        .catch((err) => {
            console.log(err);
        })
        .then(function (hash) {
            return dbManager.User.create(uuid.v4(), username, hash);
        })
        .then(function (result) {
            return dbManager.User.getByUsername(username);
        })
        .then(function (user) {
            req.session.loggedin = true;
            req.session.userid = user.id;
            req.session.username = user.username;
            res.sendStatus(200);
        });
};
