const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');

const mymodule = require('../DBfunctions')
router.use(bodyParser.urlencoded({ extended: true }));

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "83.255.197.121",
    user: "joakim",
    password: "jockele",
    port: "3306",
    database: "webslingers"
});
//använd * för att tvinga alla urls till den här 
router.get('/', (req, res) => {
    res.render('pages/index');
});

router.get('/register', (req, res) => {
    res.render('pages/register');
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
    res.render('pages/modalLogin');
});
router.post('/login', function (req, res) {
    var username = req.body.username,
        password = req.body.password;

    var sql = `SELECT * FROM users WHERE users.ID = ? AND users.Password = ? `
    con.query(sql, [username, password], function (err, result) {
        console.log(result);
        if (err) throw err;
        if (result.length != 0) {
            res.redirect('/dashboard');
        }
        else
            res.redirect('/login');
    });
});

router.get('/logout', (req, res) => {
    res.send('You are on the logout page');
});

router.get('/profile', (req, res) => {
    mymodule.get_users(null, null, function (err, results) {
        if (err) throw err
        else {
            res.render('pages/StudentProfile', {
                results: results
            });
            console.log("Query completed");
        }
    });
});

router.get('/user', (req, res) => {
    res.send('You are on the user page');
});

module.exports = router;