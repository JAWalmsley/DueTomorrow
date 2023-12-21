const express = require('express');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');

const dbManager = require('../dbManager');
const { isUserAuthorized } = require("./userAuth");

const router = express.Router({ mergeParams: true })

router.post('/', (req, res) => {
    if (!(req.body.username && req.body.password)) return res.status(400).send('No data given');
    let newid = uuid.v4();
    dbManager.User.getByUsername(req.body.username)
        .then((usr) => {
            if (usr) {
                throw 'Already exists';
            } else {
                return bcrypt.hash(req.body.password, 10);
            }
        })
        .then((hash) => {
            return dbManager.User.create(newid, req.body.username, hash)
        })
        .then(() => {
            req.session.loggedin = true;
            req.session.userid = newid;
            res.status(200).send(newid);
        })
        .catch((err) => {
            res.status(400).send(err);
        })
}
)
    ;

router.get('/:userid', isUserAuthorized, (req, res) => {
    dbManager.User.getByUserID(req.params.userid)
        .then((usr) => {
            if (!usr) {
                throw 'Does not exist'
            }
            // Extract only id and username, no password
            usr = (({ id, username }) => ({ id, username }))(usr)
            res.status(200).send(usr);
        })
        .catch((err) => res.status(400).send(err))
});

router.put('/:userid', isUserAuthorized, (req, res) => {
    if (!req.body) return res.status(400).send('No data given');
    let waiting;
    let data = {};
    if (req.body.username) {
        data.username = req.body.username;
        waiting = Promise.resolve('')
    }
    if (req.body.password) {
        waiting = bcrypt.hash(req.body.password, 10)
    }
    waiting
        .then((pw) => {
            if (pw) data.password = pw;
        })
        .then(() => dbManager.User.getByUsername(data.username))
        .then((usr) => {
            if (usr) {
                throw 'Already exists';
            }
            return dbManager.User.update(req.params.userid, data);
        })
        .then(() => {
            res.status(200).send('Successfully updated')
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

router.delete('/:user', isUserAuthorized, (req, res) => {
    res.send("you deleted user " + req.params.user);
});

module.exports = router;