import { courseData, courseDBInstance } from "../databaseManagers/CourseDB";

const express = require('express')
const router = express.Router({mergeParams: true})
const uuid = require('uuid')

const {isUserAuthorized} = require("./userAuth");

router.post('/', isUserAuthorized, (req, res) => {
    if (!(req.body.name && req.body.colour && req.body.credits)) return res.status(400).send('Insufficient data given');
    let newid = uuid.v4();
    let newCourse: courseData = {
        colour: req.body.colour,
        credits: req.body.credits,
        id: newid,
        name: req.body.name,
        userid: req.params.userid
    }
    courseDBInstance.create(newCourse)
        .then(() => res.status(200).send(newid))
        .catch((err) => res.status(400).send(err));
});

router.get('/', isUserAuthorized, (req, res) => {
    courseDBInstance.getByUserID(req.params.userid)
        .then((result) => res.status(200).send(result))
        .catch((err) => res.status(400).send(err))
});

router.put('/:courseid', isUserAuthorized, (req, res) => {
    return res.status(404).send("Can't update a course (yet).")
});

router.delete('/:courseid', isUserAuthorized, (req, res) => {
    courseDBInstance.deleteByID(req.params.courseid)
        .then(() => res.status(200).send('Successfully deleted'))
        .catch((err) => res.status(400).send(err));
});

module.exports = router;