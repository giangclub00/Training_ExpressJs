const db = require('../db');
const shortid = require('shortid');

module.exports = {
    index: (req, res) => {
        res.render('users/index', {
            users: db.get('users').value(),
        });
    },
    viewById: (req, res) => {
        const id = req.params.id;
        
        const user = db.get('users').find({ id: id }).value();
        res.render('users/view', {
            user: user
        });
    },
    search: (req, res) => {
        var name = req.query.name;
        var matchdUsers = db.get('users').value().filter(user => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1);
    
        res.render('users/index', {
            users: matchdUsers
        });
    },
    viewCreate: (req, res) => {
        console.log(req.cookies);
        res.render('users/create');
    },
    postCreate: (req, res) => {
        req.body.id = shortid.generate();
        db.get('users').push(req.body).write();
        res.redirect('/users');
    }
}