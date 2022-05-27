const dbManager = require('./dbManager')('BTE');
const bcrypt = require('bcrypt');

exports.login = function (req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        res.sendStatus(400);
    }
    let userSearch = dbManager.getUsers(username);
    let passwordCompare = userSearch
        .then(function (result) {
            if (result[0] == undefined) {
                return;
            }
            let user = result[0];
            return bcrypt.compare(password, user.password);
        })
        .catch((err) => console.log(err));
    Promise.all([userSearch, passwordCompare]).then(function ([
        users,
        passwordCorrect,
    ]) {
        if (passwordCorrect) {
            let user = users[0];
            req.session.loggedin = true;
            req.session.userid = user.userid;
            req.session.username = user.username;
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }
    });
};
