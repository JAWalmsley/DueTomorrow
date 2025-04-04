"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CourseDB_1 = require("../databaseManagers/CourseDB");
var express = require('express');
var router = express.Router({ mergeParams: true });
var uuid = require('uuid');
var isUserAuthorized = require("./userAuth").isUserAuthorized;
router.post('/', isUserAuthorized, function (req, res) {
    if (!(req.body.name && req.body.colour && req.body.credits))
        return res.status(400).send('Insufficient data given');
    var newid = uuid.v4();
    var newCourse = {
        colour: req.body.colour,
        credits: req.body.credits,
        id: newid,
        name: req.body.name,
        userid: req.params.userid
    };
    CourseDB_1.courseDBInstance.create(newCourse)
        .then(function () { return res.status(200).send(newid); })
        .catch(function (err) { return res.status(400).send(err); });
});
router.get('/', isUserAuthorized, function (req, res) {
    CourseDB_1.courseDBInstance.getByUserID(req.params.userid)
        .then(function (result) { return res.status(200).send(result); })
        .catch(function (err) { return res.status(400).send(err); });
});
router.put('/:courseid', isUserAuthorized, function (req, res) {
    return res.status(404).send("Can't update a course (yet).");
});
router.delete('/:courseid', isUserAuthorized, function (req, res) {
    CourseDB_1.courseDBInstance.deleteByID(req.params.courseid)
        .then(function () { return res.status(200).send('Successfully deleted'); })
        .catch(function (err) { return res.status(400).send(err); });
});
module.exports = router;
