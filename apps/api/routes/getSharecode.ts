import { assignmentData, assignmentDBInstance } from "../databaseManagers/AssignmentDB";
import { courseData, courseDBInstance } from "../databaseManagers/CourseDB";
import { sharecodeData, sharecodeDBInstance } from "../databaseManagers/SharecodeDB";

const express = require('express');
const router = express.Router({mergeParams: true});

router.get('/:code', async (req, res) => {
    let code: sharecodeData = await sharecodeDBInstance.getByCode(req.params.code);
    if(code == null || code.courseids.length === 0) {
        return res.status(400).send('Code does not exist');
    }
    let courseReturnList = [];
    for(let courseid of code.courseids) {
        let c = await courseDBInstance.getByID(courseid);
        let a = await assignmentDBInstance.getByCourseID(courseid);
        courseReturnList.push({...c, assignments: a});
    }
    res.status(200).send({courses: courseReturnList});
});

export default router