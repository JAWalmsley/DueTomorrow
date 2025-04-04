import { assignmentDBInstance, assignmentData } from "../databaseManagers/AssignmentDB";

const express = require('express')
const router = express.Router({ mergeParams: true })
const uuid = require('uuid')

const { isUserAuthorized } = require("./userAuth");

router.post('/', isUserAuthorized, (req, res) => {
    if (!(req.body.courseid && req.body.name && req.body.due && req.body.weight)) return res.status(400).send('Insufficient data given');
    let newid = uuid.v4();
    let newAssignment: assignmentData = {
        courseid: req.body.courseid,
        done: false,
        due: req.body.due,
        grade: null,
        id: newid,
        name: req.body.name,
        userid: req.params.userid,
        weight: req.body.weight
    }
    assignmentDBInstance.create(newAssignment)
        .then(() => res.status(200).send(newid))
        .catch((err) => res.status(400).send(err));
});

router.get('/', isUserAuthorized, (req, res) => {
    assignmentDBInstance.getByUserID(req.params.userid)
        .then((result) => res.status(200).send(result))
        .catch((err) => res.status(400).send(err))
});

router.put('/:assignmentid', isUserAuthorized, (req, res) => {
    return res.status(410).send('Use specific endpoint (e.g) /assignmentid/done');
});

router.put('/:assignmentid/done', isUserAuthorized, (req, res) => {
    if (!req.body) return res.status(400).send('No data given');
    let data = req.body;
    assignmentDBInstance.setDoneStatus(req.params.assignmentid, data)
        .then(() => res.status(200).send('Successfully updated'))
        .catch((err) => res.status(400).send(err));
})

router.put('/:assignmentid/grade', isUserAuthorized, (req, res) => {
    if (!req.body) return res.status(400).send('No data given');
    let data = req.body;
    assignmentDBInstance.setGrade(req.params.assignmentid, data)
        .then(() => res.status(200).send('Successfully updated'))
        .catch((err) => res.status(400).send(err));
})

router.put('/:assignmentid/weight', isUserAuthorized, (req, res) => {
    if (!req.body) return res.status(400).send('No data given');
    let data = req.body;
    assignmentDBInstance.setWeight(req.params.assignmentid, data)
        .then(() => res.status(200).send('Successfully updated'))
        .catch((err) => res.status(400).send(err));
})

router.delete('/:assignmentid', isUserAuthorized, (req, res) => {
    assignmentDBInstance.deleteByID(req.params.assignmentid)
        .then(() => res.status(200).send('Successfully deleted'))
        .catch((err) => res.status(400).send(err));
});

module.exports = router;