const dbManager = require("./dbManager")
const bcrypt = require("bcryptjs");

exports.login = function(req, res, callback){
    console.log(req.body)
    const {username, password} = req.body;
    if (!username || !password) {
        callback(res.status(400))
    }
    dbManager.makeReq("SELECT * FROM logins WHERE username = ?", [username], function(result) {
        let user = result[0];
        bcrypt.compare(password, user.password).then(function (result) {
            callback(result ? 200 :400)
        })
    })
}
