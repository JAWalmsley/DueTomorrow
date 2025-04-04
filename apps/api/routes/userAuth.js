exports.isUserAuthorized = function (req, res, next) {
    if (!req.params.userid)
        return res.status(400).send('No userID');
    if (!req.session.loggedin)
        return res.status(403).send('Not logged in');
    if (!(req.session.userid === req.params.userid))
        return res.status(403).send('Wrong userID');
    next();
};
