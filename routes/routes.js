let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
let db = require('../DBfunctions');
let match = require('../search');

//let mysql = require('mysql');
//
//let con = mysql.createConnection({
//    host: "83.255.197.121",
//    user: "joakim",
//    password: "jockele",
//    port: "3306",
//    database: "webslingers"
//});

router.get('/', (req, res) => {
    res.render('pages/index');
});
router.get('/reg', (req, res) => {
    res.render('pages/reg');
});
router.post('/register', (req, res) => {
    var username = req.body.username,
        password = req.body.password,
        role = req.body.role,
        pnum = req.body.pnum;
    console.log(role);
    db.insert_user(username, password, role, function(err, result){
        if (err) throw err;
    })

    if(role === "student"){
        db.insert_student(username, pnum, function(err, result){
        if(err) throw err;
        })
    }
    if(role === "company"){
        db.insert_company(username, pnum, function(err, result){
        if(err) throw err;
        })
    }  
    res.redirect('/login');  
});

router.get('/login', function (req, res) {
    if (req.session.user) {
        db.getuname(req.session.user, function(err, result){
            if (err) throw err;
            res.redirect('/profile');
        });
    }
    else
        res.render('pages/index')
});
router.post('/login', function (req, res) {
    var username = req.body.username,
        password = req.body.password;

    db.getlogin(username, password, function(err, result){
        console.log("getlogin: "+ result);
        if (err) throw err;
        if (result.length != 0) {
            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 365 * 100;
            }
            else {
                req.session.cookie.expires = null;
            }
            req.session.user = username;
            req.session.role = result[0].Role;
            console.log("req user: "+ req.session.user);
            res.redirect('/profile');
        }
        else {
            res.redirect('/login');
        }

    })
});
router.get('/profile', (req, res) => {
    if (req.session.user && req.session.role == 'student') {
        db.get_student_user_and_nr(req.session.user, function(err, result){
            if (err) throw err;
            req.session.pnr = result[0].pnr;
            res.render('pages/StudentProfile', {
                results: result
            });
            console.log(req.session.user);
            console.log(req.session.role);
        });
    }
    else if (req.session.user && req.session.role == 'company') {
        db.get_company_user_and_nr(req.session.user, function(err, result){
            if (err) throw err;
            req.session.orgnr = result[0].Orgnr;
            res.render('pages/companyProfile', {
                results: result
            });
            console.log(req.session.user);
            console.log(req.session.role);
        });
    }
    else
res.redirect('/login')
});

router.get('/StudentRegister', (req, res) => {
    if (req.session.user && req.session.role == 'student') {
        db.get_student_user_and_nr(req.session.user, function(err, result){
            if (err) throw err;
            res.render('pages/StudentRegister', {
                results: result
            });
            console.log(req.session.user);
            console.log(req.session.role);
        });
    }
    else
        res.redirect('/login')
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// test reg
router.post('/change_student_profile', function(req, res){
    var uname = req.body.username,
    password = req.body.password,
    name = req.body.name,
    pnr = req.body.pnum,
    gender = req.body.gender,
    tel = req.body.tel,
    adress = req.body.address;
    
    db.update_user(req.session.user, password, function(err, result){
        if(err) throw err;
    })
    db.update_studentprofile(req.session.pnr, req.session.user, name, gender, adress, tel, function(err, result){
        if(err) throw err    
    })
    res.redirect("/profile");
});

router.post('/change_company_profile', function(req, res){
    var uname = req.body.username,
    password = req.body.password,
    name = req.body.name,
    pnr = req.body.pnum,
    gender = req.body.gender,
    tel = req.body.tel,
    adress = req.body.address;

    db.update_company(req.session.user, password, function(err, result){
        if(err) throw err;
    })
    db.update_companyprofile(req.session.orgnr, req.session.user, name, adress, tel, function(err, result){
        if(err) throw err    
    })
    res.redirect("/profile");
});

router.get('/search',function(req, res){
    match.testmatch();
});

module.exports = router;
