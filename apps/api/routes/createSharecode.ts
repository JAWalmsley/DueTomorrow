import { courseData, courseDBInstance } from "../databaseManagers/CourseDB";
import { sharecodeData, sharecodeDBInstance } from "../databaseManagers/SharecodeDB";

const express = require('express');
const router = express.Router({mergeParams: true});
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
    let ownedCourses: courseData[] = await courseDBInstance.getByUserID(req.params.userid);
    let ownedIDs = ownedCourses.map(a => a.id);
    if(!req.body.courseids.every((courseid) => ownedIDs.includes(courseid))) {
        return res.status(400).send('You do not own all of these courses');
    }
    
    let newCode: sharecodeData = {
        code: generateCode(codeLength),
        courseids: req.body.courseids,
        editor: req.body.editor
    }
    sharecodeDBInstance.create(newCode)
        .then(() => res.status(200).send(newCode.code))
        .catch((err) => {
            console.log(err);
            res.status(400).send(err);
        });
});

export default router