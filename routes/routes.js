let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');

<<<<<<< HEAD
let db = require('../DBfunctions');
=======
let mymodule = require('../DBfunctions');
router.use(bodyParser.urlencoded({ extended: true }));
>>>>>>> c5c1cca3802668967fbd0346628bf32b60b1685a

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
router.get('/reg', (req, res) => {
    res.render('pages/reg');
    // console.log("cookie", req.cookies);    
});
<<<<<<< HEAD
//router.post('/register', (req, res) => {
//    var username = req.body.username,
//        password = req.body.password;
//    con.query('INSERT INTO users (ID, Password, Role) VALUES (?, ?, ?)', [username, password, 'student1'], function (err, result) {
//        if (err) throw err
//        res.redirect('/login');
//    });
//});
router.get('/login', function (req, res) {
    db.get_users(function(err, results){
    if (hasCookie(req.cookies)) {
        res.render('pages/StudentProfile', {results:results});
    }
    else {
        res.render('pages/temp');
    }
    console.log("Query completed");
    console.log("cookie: ", req.cookies);
})
=======

router.post('/register', (req, res) => {
    var username = req.body.username,
        password = req.body.password,
        role = req.body.role;
    con.query('INSERT INTO users (ID, Password, Role) VALUES (?, ?, ?)', [username, password, role], function (err, result) {
        if (err) throw err
        res.redirect('/login');
    });
});
router.get('/login', function (req, res) {
    if (req.session.user) {
        con.query(`SELECT * FROM users WHERE users.ID = ?`, req.session.user, function (err, result) {
            if (err) throw err;
            res.redirect('/profile');
            console.log(req.session.user);
        });
    }
    else
        res.render('pages/index')
    console.log(req.session.user);
>>>>>>> c5c1cca3802668967fbd0346628bf32b60b1685a
});
router.post('/login', function (req, res) {
    var username = req.body.username,
        password = req.body.password;

<<<<<<< HEAD
    db.getlogin(username, password, function (err, result) {
=======
    var sql = `SELECT * FROM users WHERE users.ID = ? AND users.Password = ? `
    con.query(sql, [username, password], function (err, result) {
        console.log(result);
>>>>>>> c5c1cca3802668967fbd0346628bf32b60b1685a
        if (err) throw err;
        if (result.length != 0) {
            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 365 * 100;
            }
<<<<<<< HEAD

            res.cookie('test', Math.random(), options);
=======
            else {
                req.session.cookie.expires = null;
            }
            console.log("remember", req.body.remember);
            console.log(req.session.user);
            req.session.user = username;
>>>>>>> c5c1cca3802668967fbd0346628bf32b60b1685a
            res.redirect('/profile');
        }
        else {
            res.redirect('/login');
        }

    })
    // if ( req.body.remember ) {
    //     var hour = 3600000;
    //     req.session.cookie.maxAge = 14 * 24 * hour; //2 weeks
    //   } 
    //   else {
    //     req.session.cookie.expires = false;
    //   }
    //   req.session.userid = user._id;
    // res.cookie(result[0].ID, Math.random(), options);           
});

router.get('/profile', (req, res) => {
<<<<<<< HEAD
    db.get_users(null, null, function (err, results) {
        if (err) throw err
        else if (hasCookie(req.cookies)) {
=======
    if (req.session.user) {
        con.query(`SELECT * FROM users WHERE users.ID = ?`, req.session.user, function (err, result) {
            if (err) throw err;
>>>>>>> c5c1cca3802668967fbd0346628bf32b60b1685a
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

router.post('/reg', function(req, res){
    var uname = req.body.Uname,
    password = req.body.Pword,
    role = req.body.role,
    name = req.body.name,
    pnr = req.body.pnum,
    gender = req.body.gender,
    tel = req.body.tel,
    adress = req.body.adress;

    res.redirect("/login");

    db.insert_user(uname, password, role, function(err, result){
        if(err) throw err;
        else{
            
        }
    })
    db.insert_student(pnr, uname, name, gender, adress, tel, function(err, result){
        if(err) throw err
        else
            
            console.log("sup?")
    })
   
})
module.exports = router;