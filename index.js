require('dotenv').config();
console.log(process.env.SESSION_SECRET);
const port = 3000;
const express = require('express');
const app = express();
var cookieParser = require('cookie-parser') // access cookie

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public')); // access static files
app.use(cookieParser('123123qsdsdasd')); // signed cookies

// MIDDLEWARE
const authMiddleware = require('./middleware/auth.middleware');

// ROUTES
const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route');

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index', {
        name: 'AA'
    });
});

app.use('/users', authMiddleware.requireAuth, userRoutes); // user is producted
app.use('/auth', authRoutes); 

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});