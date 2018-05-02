let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');

let mymodule = require('../DBfunctions');
router.use(bodyParser.urlencoded({ extended: true }));

let mysql = require('mysql');

let con = mysql.createConnection({
    host: "83.255.197.121",
    user: "joakim",
    password: "jockele",
    port: "3306",
    database: "webslingers"
});
router.get('/', (req, res) => {
    res.render('pages/index');
    console.log("cookie", req.cookies);
});
router.get('/register', (req, res) => {
    res.render('pages/register');
    // console.log("cookie", req.cookies);    
});
router.post('/register', (req, res) => {
    var username = req.body.username,
        password = req.body.password;
    con.query('INSERT INTO users (ID, Password, Role) VALUES (?, ?, ?)', [username, password, 'student1'], function (err, result) {
        if (err) throw err
        res.redirect('/login');
    });
});
router.get('/login', function (req, res) {
<<<<<<< HEAD
    if (req.session.user) {
        con.query(`SELECT * FROM users WHERE users.ID = ?`, req.session.user, function (err, result) {
            if (err) throw err;
            res.redirect('/profile');
            console.log(req.session.user);
        });
    }
    else
        res.render('pages/temp')
    console.log(req.session.user);
=======
    mymodule.get_users(null, null, function (err, results) {
        if (err) throw err
        else if (hasCookie(req.cookies)) {
            res.render('pages/StudentProfile', {
                results: results
            });
        }
        else
            res.render('pages/modal');
        console.log("Query completed");
        console.log("cookie: ", req.cookies);
    });
>>>>>>> 59dcab57389d520a74f89cdae14e1f8c9953f334
});
router.post('/login', function (req, res) {
    var username = req.body.username,
        password = req.body.password;

    var sql = `SELECT * FROM users WHERE users.ID = ? AND users.Password = ? `
    con.query(sql, [username, password], function (err, result) {
        console.log(result);
        if (err) throw err;
        if (result.length != 0) {
            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 365 * 100;
            }
<<<<<<< HEAD
            else {
                req.session.cookie.expires = null;
            }
            console.log("remember", req.body.remember);
            console.log(req.session.user);
            req.session.user = username;
=======

            // if ( req.body.remember ) {
            //     var hour = 3600000;
            //     req.session.cookie.maxAge = 14 * 24 * hour; //2 weeks
            //   } 
            //   else {
            //     req.session.cookie.expires = false;
            //   }
            //   req.session.userid = user._id;
            // res.cookie(result[0].ID, Math.random(), options);
            res.cookie(result[0].ID, Math.random(), options);
>>>>>>> 59dcab57389d520a74f89cdae14e1f8c9953f334
            res.redirect('/profile');
        }
        else
            res.redirect('/login');
    });
});

router.get('/profile', (req, res) => {
    if (req.session.user) {
        con.query(`SELECT * FROM users WHERE users.ID = ?`, req.session.user, function (err, result) {
            if (err) throw err;
            res.render('pages/StudentProfile', {
                results: result
            });
            console.log(req.session.user);
        });
    }
    else
        res.redirect('/login')
});

router.get('/logout', (req, res) => {
    console.log(req.session.user);
    req.session.destroy();
    res.redirect('/');
});
module.exports = router;