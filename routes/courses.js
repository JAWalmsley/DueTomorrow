const express = require('express')
const router = express.Router({mergeParams: true})
const uuid = require('uuid')

const dbManager = require('../dbManager');
const {isUserAuthorized} = require("./userAuth");

router.post('/', isUserAuthorized, (req, res) => {
    if (!(req.body.name && req.body.colour && req.body.credits)) return res.status(400).send('Insufficient data given');
    let newid = uuid.v4();
    dbManager.Course.create(newid, req.params.userid, req.body.name, req.body.colour, req.body.credits)
        .then(() => res.status(200).send(newid))
        .catch((err) => res.status(400).send(err));
});

router.get('/', isUserAuthorized, (req, res) => {
    dbManager.Course.getByUserID(req.params.userid)
        .then((result) => res.status(200).send(result))
        .catch((err) => res.status(400).send(err))
});

router.put('/:courseid', isUserAuthorized, (req, res) => {
    if (!req.body) return res.status(400).send('No data given');
    let data = {};
    if (req.body.name) data.name = req.body.name;
    if (req.body.colour) data.colour = req.body.colour;
    if (req.body.credits) data.credits = req.body.credits;
    dbManager.Course.update(req.params.courseid, data)
        .then(() => res.status(200).send('Successfully updated'))
        .catch((err) => res.status(400).send(err));
});

router.delete('/:courseid', isUserAuthorized, (req, res) => {
    dbManager.Course.delete(req.params.courseid)
        .then(() => res.status(200).send('Successfully deleted'))
        .catch((err) => res.status(400).send(err));
});

module.exports = router;