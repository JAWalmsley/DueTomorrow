const express = require('express')
const router = express.Router({mergeParams: true})

router.post('/', (req, res) => {
    res.send("you created a user");
});

router.get('/:user', (req, res) => {
    res.send("you got user " + req.params.user);
});

router.put('/:user', (req, res) => {
    res.send("you updated user " + req.params.user);
});

router.delete('/:user', (req, res) => {
    res.send("you deleted user " + req.params.user);
});

module.exports = router;