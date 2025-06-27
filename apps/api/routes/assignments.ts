import { assignmentDBInstance, assignmentData } from "../databaseManagers/AssignmentDB";
import { courseDBInstance } from "../databaseManagers/CourseDB";

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
    courseDBInstance.userCanEditCourse(req.params.userid, req.body.courseid)
        .then((editable) => {
            if (editable === false) {
                throw new Error('You do not have permission to edit this course');
            }
            else {
                return assignmentDBInstance.create(newAssignment);
            }
        })
        .then(() => res.status(200).send(newid))
        .catch((err) => res.status(400).send(err));
});

router.get('/', isUserAuthorized, (req, res) => {
    assignmentDBInstance.getByUserID(req.params.userid)
        .then((result) => res.status(200).send(result))
        .catch((err) => {
            res.status(400).send(err)
        })
});

router.put('/:assignmentid', isUserAuthorized, (req, res) => {
    if (!req.body) return res.status(400).send('No data given');
    Promise.resolve()
        .then(() => {
            if (req.body.done != null) {
                return assignmentDBInstance.setDoneStatus(req.params.userid, req.params.assignmentid, req.body.done)
            }
        })
        .then(() => {
            if (req.body.grade != null) {
                return assignmentDBInstance.setGrade(req.params.userid, req.params.assignmentid, req.body.grade);
            }
        })
        .then(() => assignmentDBInstance.userCanEditAssignment(req.params.userid, req.params.assignmentid))
        .then((editable) => {
            if (editable && req.body.weight != null) {
                return assignmentDBInstance.setWeight(req.params.assignmentid, req.body.weight);
            }
            else {
                throw new Error('You do not have permission to edit this assignment');
            }
        })
        .then(() => res.status(200).send('Successfully updated'))
        .catch((err) => res.status(400).send(err));
});

router.delete('/:assignmentid', isUserAuthorized, (req, res) => {
    assignmentDBInstance.userCanEditAssignment(req.params.userid, req.params.assignmentid)
        .then((editable) => {
            if (editable) {
                return assignmentDBInstance.deleteByID(req.params.assignmentid);
            }
            else {
                throw new Error('You do not have permission to delete this assignment');
            }
        })
        .then(() => res.status(200).send('Successfully deleted'))
        .catch((err) => res.status(400).send(err));
});

export default router