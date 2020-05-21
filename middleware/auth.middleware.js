const db = require('../db');
module.exports = {
    requireAuth: (req, res, next) => {
        // exist userid cookie
        if (!req.signedCookies.userId) {
            res.redirect('/auth/login');
        }

        const user = db.get('users').find({id: req.signedCookies.userId}).value();
        // exist user in users database
        if (!user) {
            res.redirect('/auth/login');
            return;
        }

        res.locals.user = user;

        next();
    }
}