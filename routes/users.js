const express = require('express')
const uuid = require('uuid')
const bcrypt = require('bcryptjs');

const dbManager = require('../dbManager')

const router = express.Router({mergeParams: true})

router.post('/', (req, res) => {
        if (!(req.body.username && req.body.password)) {
            res.status(400).send('No data given');
            return;
        }
        let newid = uuid.v4();
        dbManager.User.getByUsername(req.body.username)
            .then((usr) => {
                if (usr) {
                    throw 'Already exists';
                } else {
                    dbManager.User.create(newid, req.body.username, bcrypt.hash(req.body.password, 10))
                }
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

router.get('/:userid', (req, res) => {
    if (!req.params.userid) {
        res.status(400).send('No userid given');
        return;
    }
    if (!(req.session.userid === req.params.userid)) {
        res.status(400).send('No permission');
        return;
    }
    dbManager.User.getByUserID(req.params.userid)
        .then((usr) => {
            if (!usr) {
                throw 'Does not exist'
            }
            // Extract only id and username, no password
            usr = (({id, username}) => ({id, username}))(usr)
            res.status(200).send(usr);
        })
        .catch((err) => res.status(400).send(err))
});

router.put('/:userid', (req, res) => {
    if (!req.params.userid) {
        res.status(400).send('No userid given');
        return;
    }
    if (!(req.session.userid === req.params.userid)) {
        res.status(400).send('No permission');
        return;
    }
    if (!req.body) {
        res.status(400).send('No data given');
        return;
    }
    let data = {};
    if (req.body.username) {
        data.username = req.body.username;
    }
    if (req.body.password) {
        data.password = bcrypt.hash(req.body.password, 10)
    }
    dbManager.User.getByUsername(data.username)
        .then((usr) => {
            if (usr) {
                throw 'Already exists';
            } else {
                dbManager.User.update(req.params.userid, data)
                    .then(() => {
                        res.status(200).send('Successfully updated')
                    })

            }
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

router.delete('/:user', (req, res) => {
    if (!req.params.userid) {
        res.status(400).send('No userid given');
        return;
    }
    if (!(req.session.userid === req.params.userid)) {
        res.status(400).send('No permission');
        return;
    }
    res.send("you deleted user " + req.params.user);
});

module.exports = router;