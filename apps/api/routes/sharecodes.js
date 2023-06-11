const express = require('express');
const router = express.Router({mergeParams: true});
const dbManager = require('../dbManager');
const {isUserAuthorized} = require("./userAuth");

// Length of the codes that are shared
var codeLength = 5;

function generateCode(length) {
    let result = [];
    for(let i = 0; i < length; i++) {
        // Random number from 65 to 91 (these are the ASCII codes for A to Z)
        result.push(Math.round(Math.random() * 26) + 65);
    }
    return String.fromCharCode(...result);
}

router.post('/', isUserAuthorized, async (req, res) => {
    console.log(req.body.courseids);
    if (!(req.body.courseids)) return res.status(400).send('Insufficient data given');
    // Check if the courese we are adding are actually owned by the user
    let ownedCourses = await dbManager.Course.getByUserID(req.params.userid);
    let ownedIDs = ownedCourses.map(a => a.id);
    if(!req.body.courseids.every((courseid) => ownedIDs.includes(courseid))) {
        return res.status(400).send('You do not own all of these courses');
    }
    
    let newCode = generateCode(codeLength);
    dbManager.ShareCode.create(newCode, req.body.courseids)
        .then(() => res.status(200).send(newCode))
        .catch((err) => res.status(400).send(err));
});

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