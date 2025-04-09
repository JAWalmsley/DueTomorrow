const express = require('express');
const router = express.Router({ mergeParams: true });

const { isUserAuthorized } = require('./userAuth');

router.post('/', (req, res) => {
    if(!req.session.loggedin) return res.status(403).send('Not logged in');
    req.session.destroy((err) => {
        if (err) {
            res.status(400).send('Unable to log out');
        } else {
            res.status(200).send('Logged out');
        }
    });
});

export default router
