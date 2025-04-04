"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AssignmentDB_1 = require("../databaseManagers/AssignmentDB");
var express = require('express');
var router = express.Router({ mergeParams: true });
var uuid = require('uuid');
var isUserAuthorized = require("./userAuth").isUserAuthorized;
router.post('/', isUserAuthorized, function (req, res) {
    if (!(req.body.courseid && req.body.name && req.body.due && req.body.weight))
        return res.status(400).send('Insufficient data given');
    var newid = uuid.v4();
    var newAssignment = {
        courseid: req.body.courseid,
        done: false,
        due: req.body.due,
        grade: null,
        id: newid,
        name: req.body.name,
        userid: req.params.userid,
        weight: req.body.weight
    };
    AssignmentDB_1.assignmentDBInstance.create(newAssignment)
        .then(function () { return res.status(200).send(newid); })
        .catch(function (err) { return res.status(400).send(err); });
});
router.get('/', isUserAuthorized, function (req, res) {
    AssignmentDB_1.assignmentDBInstance.getByUserID(req.params.userid)
        .then(function (result) { return res.status(200).send(result); })
        .catch(function (err) { return res.status(400).send(err); });
});
router.put('/:assignmentid', isUserAuthorized, function (req, res) {
    return res.status(410).send('Use specific endpoint (e.g) /assignmentid/done');
});
router.put('/:assignmentid/done', isUserAuthorized, function (req, res) {
    if (!req.body)
        return res.status(400).send('No data given');
    var data = req.body;
    AssignmentDB_1.assignmentDBInstance.setDoneStatus(req.params.assignmentid, data)
        .then(function () { return res.status(200).send('Successfully updated'); })
        .catch(function (err) { return res.status(400).send(err); });
});
router.put('/:assignmentid/grade', isUserAuthorized, function (req, res) {
    if (!req.body)
        return res.status(400).send('No data given');
    var data = req.body;
    AssignmentDB_1.assignmentDBInstance.setGrade(req.params.assignmentid, data)
        .then(function () { return res.status(200).send('Successfully updated'); })
        .catch(function (err) { return res.status(400).send(err); });
});
router.put('/:assignmentid/weight', isUserAuthorized, function (req, res) {
    if (!req.body)
        return res.status(400).send('No data given');
    var data = req.body;
    AssignmentDB_1.assignmentDBInstance.setWeight(req.params.assignmentid, data)
        .then(function () { return res.status(200).send('Successfully updated'); })
        .catch(function (err) { return res.status(400).send(err); });
});
router.delete('/:assignmentid', isUserAuthorized, function (req, res) {
    AssignmentDB_1.assignmentDBInstance.deleteByID(req.params.assignmentid)
        .then(function () { return res.status(200).send('Successfully deleted'); })
        .catch(function (err) { return res.status(400).send(err); });
});
module.exports = router;
