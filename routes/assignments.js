const express = require('express')
const router = express.Router({mergeParams: true})
const uuid = require('uuid')

const dbManager = require('../dbManager');
const {isUserAuthorized} = require("./userAuth");

router.post('/', isUserAuthorized, (req, res) => {
    let newid = uuid.v4();
    dbManager.Assignment.create(newid, req.params.userid, req.body.courseid, req.body.name, req.body.due, false, req.body.weight, 0)
        .then(() => res.status(200).send(newid))
        .catch((err) => res.status(400).send(err));
});

router.get('/:assignmentid', (req, res) => {
    res.send("you got assignment " + req.params.assig + " for user " + req.params.user);
});

router.put('/:assignmentid', (req, res) => {
    res.send("you updated assignment " + req.params.id);
});

router.delete('/:assignmentid', (req, res) => {
    res.send("you deleted assignment " + req.params.id);
});

module.exports = router;