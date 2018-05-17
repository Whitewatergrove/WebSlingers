let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
let db = require('../DBfunctions');

let searchTest = require('./search');
let matchingStudent = require('./match');
let matchingCompany = require('./companyMatch');

let bcrypt = require('bcrypt');
let mysql = require('mysql');

var sort_test;

var con = mysql.createConnection({
    host: "83.255.197.121",
    user: "joakim",
    password: "joakim97",
    port: "3306",
    database: "webslingers"
});

router.get('/', (req, res) => {
    if (req.session.user) {
        db.getuname(req.session.user, function (err, result) {
            if (err) throw err;
            res.redirect('/profile');
        });
    }
    else
        res.render('index')
});
router.post('/register', (req, res) => {
    var username = req.body.username,
        password = req.body.password,
        role = req.body.role,
        pnum = req.body.pnum;

    console.log(role);

    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) throw err;

        db.insert_user(username, hash, role, function (err, result) {
            console.log('db.insert_user')
            if (err) {
                console.log("fel: " + err);
                req.flash('danger', 'User already exists. Please choose another username and try again.')
                res.redirect('/');
            }
            else if (role === "student" && !err) {
                console.log('db.insert_student')
                db.insert_student(username, pnum, function (err, result) {
                    if (err) throw err;
                    req.flash('success', 'You have successfully registered your account.');
                    res.redirect('/');
                })
            }
            else if (role === "company" && !err) {
                console.log('db.insert_company')
                db.insert_company(username, pnum, function (err, result) {
                    if (err) throw err;
                    req.flash('success', 'You have successfully registered your account.');
                    res.redirect('/');
                })
            }
        })
    })
});

router.get('/login', function (req, res) {
    if (req.session.user) {
        db.getuname(req.session.user, function (err, result) {
            if (err) throw err;
            res.redirect('/profile');
        });
    }
    else
        res.render('index')
});
router.post('/login', function (req, res) {
    var username = req.body.username,
        password = req.body.password;
    var sql = "SELECT * FROM users WHERE ID = ?";
    con.query(sql, username, function (err, results) {
        if (err) throw err;
        if (results.length == 0) {
            req.flash('danger', 'Invalid username or password');
            res.redirect('/');
        }
        else {
            bcrypt.compare(password, results[0].Password, function (err, match) {
                if (match) {
                    console.log(req.body.remember);
                    if (req.body.remember) {
                        req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 365 * 100;
                    }
                    else {
                        req.session.cookie.expires = null;
                    }
                    req.session.user = username;
                    req.session.role = results[0].Role;
                    req.flash('success', 'You have successfully logged in');
                    res.redirect('/profile');
                    matchingStudent.prematching(req.session.user);
                }
                else {
                    console.log('wtf');
                    req.flash('danger', 'Invalid username or password');
                    res.redirect('/');
                }
            });
        }
    });
});
router.get('/profile', (req, res) => {
    if (req.session.user && req.session.role == 'student') {
        db.get_student_user_and_nr(req.session.user, function (err, result) {
            if (err) throw err;
            req.session.pnr = result[0].pnr;
            res.render('StudentProfile', {
                results: result
            });
            console.log(req.session.user);
            console.log(req.session.role);
        });
    }
    else if (req.session.user && req.session.role == 'company') {
        db.get_company_user_and_nr(req.session.user, function (err, result) {
            if (err) throw err;
            req.session.orgnr = result[0].Orgnr;
            res.render('companyProfile', {
                results: result
            });
            console.log(req.session.user);
            console.log(req.session.role);
        });
    }
    else
        res.redirect('/')
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

router.post('/change_student_profile', function (req, res) {
    
    var uname = req.body.username,
        name = req.body.name,
        pnr = req.body.pnum,
        gender = req.body.gender,
        tel = req.body.tel,
        adress = req.body.address;

    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) throw err;
        db.update_user(req.session.user, hash, function (err, result) {
            if (err) {
                req.flash('danger', 'An error has occured while updating');
                res.redirect('/profile');
            }
            else if (!err) {
                db.update_studentprofile(req.session.pnr, req.session.user, name, gender, adress, tel, function (err, result) {
                    if (err) {
                        req.flash('danger', 'An error has occured while updating');
                        res.redirect('/profile');
                    }
                    else {
                        req.flash('success', 'You have succcessfully updated your profile');
                        res.redirect('/profile');
                    }
                })
            }
        })
    })
});

router.post('/change_company_profile', function (req, res) {
    var uname = req.body.username,
        password = req.body.password,
        name = req.body.name,
        pnr = req.body.pnum,
        gender = req.body.gender,
        tel = req.body.tel,
        adress = req.body.address;
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) throw err;
        db.update_company(req.session.user, hash, function (err, result) {
            if (err) {
                req.flash('danger', 'An error has occured while updating');
                res.redirect('/profile');
            }
            else if (!err) {
                db.update_companyprofile(req.session.orgnr, req.session.user, name, adress, tel, function (err, result) {
                    if (err) {
                        req.flash('danger', 'An error has occured while updating');
                        res.redirect('/profile');
                    }
                    else {
                        req.flash('success', 'You have succcessfully updated your profile');
                        res.redirect('/profile');
                    }
                })
            }
        })
    })
});

router.post('/hejhopmanstest', function (req, res) {
    //matchingStudent.prematching(req.session.user);
    matchingStudent.matcha();
});

router.get('/search', function (req, res) {
    searchTest.testmatch();
});

router.get('/dbtester', function (req, res) {
    db.get_students(function(err, result){
        if(err) throw err;
        req.session.res = result;
        console.log("dbtest: "+req.session.res[0].UID);
        res.render('StudentProfile', {
            eh: result
        })
        
    })
    
});

router.get('/profileStudentProfile',function(req, res){
    res.render("profileStudentProfile");
})

module.exports = router;

