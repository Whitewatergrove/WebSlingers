let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
let db = require('../DBfunctions');

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
    console.log("cookie", req.cookies);
});
router.get('/reg', (req, res) => {
    res.render('pages/reg');  
});
router.post('/register', (req, res) => {
    var username = req.body.username,
        password = req.body.password,
        role = req.body.role,
        pnum = req.body.pnum;
    db.insert_user(username, password, role, function(err, result){
        if (err) throw err;
        if(role == 'student'){
            db.insert_student(username, pnum, function(err, result){
                if(err) throw err;
            })
        }
        if(role == 'company'){
            db.insert_company(username, pnum, function(err, result){
                if(err) throw err;
            })
        }
        res.redirect('/login');
    
    });
});
router.get('/login', function (req, res) {
    if (req.session.user) {
        db.getuname(re.session.user, function(err, result){
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
        console.log(result);
        if (err) throw err;
        if (result.length != 0) {
            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 365 * 100;
            }
            else {
                req.session.cookie.expires = null;
            }
            console.log("remember", req.body.remember);
            console.log(req.session.user);
            req.session.user = username;
            req.session.role = result[0].Role;
            res.redirect('/profile');
        }
        else {
            res.redirect('/login');
        }

    })         
});
router.get('/profile', (req, res) => {
    if (req.session.user && req.session.role == 'student') {
        db.getuname(req.session.user, function(err, result){
            if (err) throw err;
            res.render('pages/StudentProfile', {
                results: result
            });
            console.log(req.session.user);
            console.log(req.session.role);
        });
    }
    else if (req.session.user && req.session.role == 'company') {
        db.getuname(req.session.user, function(err, result){
            if (err) throw err;
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

router.get('/logout', (req, res) => {
    console.log(req.session.user);
    req.session.destroy();
    res.redirect('/');
});

// test reg
router.post('/StudentProfile', function(req, res){
    var uname = req.body.username,
    password = req.body.password,
    name = req.body.name,
    pnr = req.body.pnum,
    gender = req.body.gender,
    tel = req.body.tel,
    adress = req.body.address;

    db.insert_user(uname, password, function(err, result){
        if(err) throw err;
        else{
            
        }
    })
    db.insert_student(pnr, uname, name, gender, adress, tel, function(err, result){
        if(err) throw err
        else
            res.redirect("/login");
    })
   
})
module.exports = router;