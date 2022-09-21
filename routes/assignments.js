const express = require('express')
const router = express.Router({mergeParams: true})

router.post('/', (req, res) => {
    res.send("you created an assignment for user " + req.params.user);
});

router.get('/:assig', (req, res) => {
    res.send("you got assignment " + req.params.assig + " for user " + req.params.user);
});

router.put('/:assig', (req, res) => {
    res.send("you updated assignment " + req.params.id);
});

router.delete('/:assig', (req, res) => {
    res.send("you deleted assignment " + req.params.id);
});

module.exports = router;