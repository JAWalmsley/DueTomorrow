const express = require('express');
const router = express.Router({mergeParams: true});
const dbManager = require('../dbManager');

router.get('/:code', async (req, res) => {
    let codeCourselist = await dbManager.ShareCode.getByCode(req.params.code);
    if(codeCourselist.length === 0) {
        return res.status(400).send('Code does not exist');
    }
    let codeCourseIDs = codeCourselist.map(a => a.courseid);
    let courseReturnList = [];
    for(courseid of codeCourseIDs) {
        let c = await dbManager.Course.getByID(courseid);
        c = c[0];
        let assignments = [];
        let a = await dbManager.Assignment.getByCourseID(courseid);
        assignments.push(...a.map(a => ({name: a.name, due: a.due, weight: a.weight})));
        courseReturnList.push({name: c.name, colour: c.colour, credits: c.credits, assignments: assignments});
    }
    res.status(200).send({courses: courseReturnList});
});

module.exports = router;