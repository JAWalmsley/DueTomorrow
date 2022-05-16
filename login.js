const dbManager = require("./dbManager")
const bcrypt = require("bcryptjs");

exports.login = function (req, res) {
    console.log(req.body)
    const {username, password} = req.body;
    if (!username || !password) {
        res.sendStatus(400)
    }
    dbManager.getUser(username)
        .then(function (result) {
            if (result[0] == undefined) {
                res.sendStatus(401);
                return;
            }
            let user = result[0];
            return bcrypt.compare(password, user.password)
        }).then(function(result) {
            console.log(result ? 200 : 401)
            res.sendStatus(result ? 200 : 401)
    });
}
