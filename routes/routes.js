let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');

let db = require('../DBfunctions');

let mysql = require('mysql');

let con = mysql.createConnection({
    host: "83.255.197.121",
    user: "joakim",
    password: "jockele",
    port: "3306",
    database: "webslingers"
});
function hasCookie(obj) {
    for (let i in obj) {
        return true;
    }
    return false;
}
// router.get("/*", function (req, res, next) {
//     console.log(isNotEmpty(req.cookies));
//     console.log(req.cookies)
//     if (isNotEmpty(req.cookies)) { // or req.cookies['cookiename'] if you want a specific one
//         res.render('pages/CompanyProfile')
//     }
//     else {
//         res.render('pages/index')
//     }
//     //You can optionally put next() here, depending on your code
// });

//använd * för att tvinga alla urls till den här 
router.get('/', (req, res) => {
    res.render('pages/index');
    console.log("cookie", req.cookies);
});
router.get('/register', (req, res) => {
    res.render('pages/register');
    // console.log("cookie", req.cookies);    
});
//router.post('/register', (req, res) => {
//    var username = req.body.username,
//        password = req.body.password;
//    con.query('INSERT INTO users (ID, Password, Role) VALUES (?, ?, ?)', [username, password, 'student1'], function (err, result) {
//        if (err) throw err
//        res.redirect('/login');
//    });
//});
router.get('/login', function (req, res) {
    db.get_users(null, null, function (err, results) {
        if (err) throw err
        else if (hasCookie(req.cookies)) {
            res.render('pages/StudentProfile', {
                results: results
            });
        }
        else
            res.render('pages/temp');
        console.log("Query completed");
        console.log("cookie: ", req.cookies);

    });
});
router.post('/login', function (req, res) {
    var username = req.body.username,
        password = req.body.password;

    db.getlogin(username, password, function (err, result) {
        if (err) throw err;
        if (result.length != 0) {

            let options = {
                maxAge: 1000 * 60 * 1,
                httpOnly: true,
                signed: false
            }

            res.cookie('test', Math.random(), options);
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
    db.get_users(null, null, function (err, results) {
        if (err) throw err
        else if (hasCookie(req.cookies)) {
            res.render('pages/StudentProfile', {
                results: results
            });
        }
        else
            res.render('pages/temp');
        console.log("Query completed");
        console.log("cookie: ", req.cookies);

    });
});

router.get('/logout', function (req, res) {
    for (var properties in req.cookies) {
        if (!req.cookies.hasOwnProperty(properties)) {
            continue;
        }
        res.cookie(properties, '', { expires: new Date(0) });
        console.log("cookie: ", req.cookies);
    }
    res.redirect('/');
    // console.log("cookie: ", req.cookies)
});
module.exports = router;