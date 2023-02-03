const express = require('express')
const router = express.Router({mergeParams: true})
const uuid = require('uuid')

const dbManager = require('../dbManager');
const {isUserAuthorized} = require("./userAuth");

router.post('/', isUserAuthorized, (req, res) => {
    if (!(req.body.courseid && req.body.name && req.body.due && req.body.weight)) return res.status(400).send('Insufficient data given');
    let newid = uuid.v4();
    dbManager.Assignment.create(newid, req.params.userid, req.body.courseid, req.body.name, req.body.due, false, req.body.weight, 0)
        .then(() => res.status(200).send(newid))
        .catch((err) => res.status(400).send(err));
});

router.get('/', isUserAuthorized, (req, res) => {
    dbManager.Assignment.getByUserID(req.params.userid)
        .then((result) => res.status(200).send(result))
        .catch((err) => res.status(400).send(err))
});

router.put('/:assignmentid', isUserAuthorized, (req, res) => {
    if (!req.body) return res.status(400).send('No data given');
    let data = req.body;
    for (let propName in data) {
        if (data[propName] === undefined) {
            delete data[propName];
        }
    }
    dbManager.Assignment.update(req.params.assignmentid, data)
        .then(() => res.status(200).send('Successfully updated'))
        .catch((err) => res.status(400).send(err));
});

router.delete('/:assignmentid', isUserAuthorized, (req, res) => {
    dbManager.Assignment.delete(req.params.assignmentid)
        .then(() => res.status(200).send('Successfully deleted'))
        .catch((err) => res.status(400).send(err));
});

module.exports = router;