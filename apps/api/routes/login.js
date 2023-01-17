const express = require('express')
const router = express.Router({mergeParams: true})

const dbManager = require('../dbManager')
const bcrypt = require('bcrypt');

router.post('/', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).send('Insufficient data');
        return;
    }
    let userSearch = dbManager.User.getByUsername(username);
    let passwordCompare = userSearch
        .then(function (user) {
            if (user == undefined) {
                throw Error('User not exist');
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
            req.session.userid = user.id;
            req.session.username = user.username;
            res.status(200).send(user.id);
        } else {
            res.sendStatus(401);
        }
    });
});

module.exports = router;