const { getUser } = require('../models/users');

async function restrictoLoggedinUserOnly(req, res, next) {
    const sessionId = req.cookies?.uuid;
    if (!sessionId) {
        return res.status(401).redirect("/login");
    }

    const user = getUser(sessionId);
    if (!user) {
        return res.status(401).redirect("/login");
    }

    req.user = user;
    next();
    
}

module.exports = {
    restrictoLoggedinUserOnly
};