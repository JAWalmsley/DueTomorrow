const express = require('express')
const router = express.Router({mergeParams: true})

router.post('/', (req, res) => {
    res.send("you created an course for user " + req.params.user);
});

router.get('/:cour', (req, res) => {
    res.send("you got course " + req.params.cour + " for user " + req.params.user);
});

router.put('/:cour', (req, res) => {
    res.send("you updated course " + req.params.user);
});

router.delete('/:cour', (req, res) => {
    res.send("you deleted course " + req.params.user);
});

module.exports = router;