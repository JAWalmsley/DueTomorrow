import { userData, userDBInstance } from "../databaseManagers/UserDB";

const express = require('express');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');

const { isUserAuthorized } = require("./userAuth");

const router = express.Router({ mergeParams: true })

router.post('/', (req, res) => {
    if (!(req.body.username && req.body.password)) return res.status(400).send('No data given');
    let newid = uuid.v4();
    userDBInstance.getByUsername(req.body.username)
        .then((usr) => {
            if (usr) {
                throw 'Already exists';
            } else {
                return bcrypt.hash(req.body.password, 10);
            }
        })
        .then((hash) => {
            let newUser: userData = {
                id: newid,
                password: hash,
                username: req.body.username
            }
            return userDBInstance.create(newUser);
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
    userDBInstance.getByUserID(req.params.userid)
        .then((usr) => {
            if (!usr) {
                throw 'Does not exist'
            }
            // Extract only id and username, no password
            let info = {
                id: usr.id,
                username: usr.username
            }
            res.status(200).send(info);
        })
        .catch((err) => res.status(400).send(err))
});

router.put('/:userid/password', isUserAuthorized, (req, res) => {
    userDBInstance.setPassword(req.params.userid, req.body)
    .then(() => res.status(200).send())
    .catch((err) => res.status(400).send(err));
});

router.delete('/:userid', isUserAuthorized, (req, res) => {
    res.status(404).send("Can't delete users (yet)")
});

export default router;