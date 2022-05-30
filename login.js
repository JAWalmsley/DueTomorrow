const dbManager = require('./dbManager')
const bcrypt = require('bcrypt');

exports.login = function (req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        res.sendStatus(400);
    }
    let userSearch = dbManager.User.getByUsername(username);
    let passwordCompare = userSearch
        .then(function (user) {
            if (user == undefined) {
                return;
            }
            return bcrypt.compare(password, user.password);
        })
        .catch((err) => console.log(err));
    Promise.all([userSearch, passwordCompare]).then(function ([
        user,
        passwordCorrect,
    ]) {
        if (passwordCorrect) {
            req.session.loggedin = true;
            req.session.userid = user.userid;
            req.session.username = user.username;
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }
    });
};
