const dbManager = require("./dbManager")
const uuid = require("uuid");
const bcrypt = require("bcryptjs");

exports.register = function(req, res, callback) {
    const {username, password} = req.body;
    let userExists = false;
    dbManager.makeReq("SELECT * FROM logins WHERE username = ?", [username], function (result) {
        if(result.length > 0){
            userExists = true;
        }
        if(userExists) {
            console.log("already exists")
            callback(409)
        }
        bcrypt.hash(password, 10).then(async (hash) => {
            await dbManager.makeReq("INSERT INTO logins (userid, username, password) VALUES (?)", [[uuid.v4(), username, hash]], function(result) {
                console.log("created user")
                callback(200)
            })
        })
    })
}