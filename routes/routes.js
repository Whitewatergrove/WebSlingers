let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
let db = require('../DBfunctions');
let matchingStudent = require('./match');
let matchingCompany = require('./companyMatch');

let bcrypt = require('bcrypt');

let sort_test;

router.get('/', (req, res) => {
    if (req.session.user) {
        db.getuname(req.session.user, function (err, result) {
            if (err) throw err;
            res.redirect('/profile');
        });
    }
    else
        res.render('index');
});
router.post('/register', (req, res) => {
    var username = req.body.username,
        password = req.body.password,
        role = req.body.role,
        pnum = req.body.pnum;

    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) throw err;

        db.insert_user(username, hash, role, function (err, result) {
            if (err) {
                req.flash('danger', 'User already exists. Please choose another username and try again.')
                res.redirect('/');
            }
            else if (role === "student" && !err) {
                db.insert_student(username, pnum, function (err, result) {
                    if (err) throw err;
                    req.flash('success', 'You have successfully registered your account.');
                    res.redirect('/');
                })
            }
            else if (role === "company" && !err) {
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
    db.get_user_info(username, function (err, results) {
        if (err) throw err;
        if (results.length == 0) {
            req.flash('danger', 'Invalid username or password');
            res.redirect('/');
        }
        else {
            bcrypt.compare(password, results[0].Password, function (err, match) {
                if (match) {
                    if (req.body.remember)
                        req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 365 * 100;
                    else
                        req.session.cookie.expires = null;
                    req.session.user = username;
                    req.session.role = results[0].Role;
                    req.flash('success', 'You have successfully logged in');
                    res.redirect('/profile');
                }
                else {
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
            req.session.student = result;
        });
        db.get_student_qualifications(req.session.user, function (err, results) {
            if (err) throw err;
            req.session.get_student_qual = results
        });
        db.get_workexp(req.session.user, function (err, results) {
            if (err) throw err;
            req.session.get_workexp = results;
        })
        db.get_education(req.session.user, function (err, results) {
            if (err) throw err;
            req.session.get_education = results
        })
        db.get_qualifications(function (err, results) {
            if (err)
                console.log("err: " + err)
            req.session.qual_list = results;
            res.render('StudentProfile', {
                results: results,
                student_user_and_nr: req.session.student,
                get_student_qual: req.session.get_student_qual,
                get_workexp: req.session.get_workexp,
                get_education: req.session.get_education
            });
        })
        matchingStudent.prematching(req.session.user);
    }
    else if (req.session.user && req.session.role == 'company') {
        db.get_company_user_and_nr(req.session.user, function (err, result) {
            if (err) throw err
            else {
                req.session.orgnr = result[0].Orgnr;
                req.session.company = result;
            }
        });
        db.get_qualifications(function (err, results) {
            if (err)
                console.log("err: " + err)
            req.session.qual_list = results;
        });
        db.get_exjobs(req.session.user, function (err, results) {
            if (err) throw err
            else {
                req.session.exid = results;
            }
        });
        db.get_demanded_qual(req.body.job_id, function (err, results) {
            if (err)
                console.log("err: " + err)
            req.session.quals = results;
            res.render('companyProfile', {
                get_exjobs: req.session.exid,
                get_company_user_and_nr: req.session.company,
                qual_list: req.session.qual_list,
                quals: req.session.quals
            })
        });
        matchingCompany.companyPrematching(req.session.user);
    }
    else {
        req.flash('danger', 'Logga in innan du går vidare')
        res.redirect('/')
    }
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

router.get('/studentMatch', function (req, res) {
    if (req.session.user && req.session.role == 'student') {
        db.get_student_user_and_nr(req.session.user, function (err, result) {
            if (err) throw err;
            req.session.pnr = result[0].pnr;
            req.session.student = result;
        });
        db.get_student_qualifications(req.session.user, function (err, results) {
            if (err) throw err;
            req.session.get_student_qual = results
        });
        db.get_qualifications(function (err, results) {
            if (err)
                console.log("err: " + err)
            req.session.qual_list = results;
            res.render('studentMatch', {
                results: results,
                student_user_and_nr: req.session.student,
                get_student_qual: req.session.get_student_qual,
                matchning: matchingStudent.matcha()
            });
        })
    }
    else
        res.redirect('/')
});

router.post('/add_job', function (req, res) {
    db.insert_exjobs(req.session.orgnr, req.body.title, req.body.info, req.body.date, req.body.teaser, function (err, results) {
        if (err) {
            req.flash('danger', 'Ett fel har uppstått');
            res.redirect('/profile');
        }
        else {
            req.flash('success', 'Du har lagt till ett nytt jobb');
            res.redirect('/profile');
        }
    })
});

router.post('/update_job', function (req, res) {
    db.update_exjob(req.body.name, req.body.info, req.body.date, req.body.teaser, req.body.job_id, function (err, result) {
        if (err) {
            req.flash('danger', 'An error has occured while updating your profile');
            res.redirect('/profile');
        }
        else {
            req.flash('success', 'You have successfully updated a job');
            res.redirect('/profile');
        }
    })
});

router.post('/delete_job', function (req, res) {
    db.delete_exjob(req.body.job_id, function (err, results) {
        if (err) {
            req.flash('danger', 'An error has occured');
            res.redirect('/profile');
        }
        else {
            req.flash('success', 'You have successfully removed a job')
            res.redirect('/profile');
        }
    })
});

router.post('/exjobMatch', function (req, res) {
    if (req.session.user && req.session.role == 'company') {
        db.get_company_user_and_nr(req.session.user, function (err, result) {
            if (err) throw err
            else {
                req.session.orgnr = result[0].Orgnr;
                req.session.company = result;
            }
        });
        db.get_qualifications(function (err, results) {
            if (err)
                console.log("err: " + err)
            req.session.qual_list = results;
        });
        db.get_exjobs(req.session.user, function (err, results) {
            if (err) throw err
            else
                req.session.exid = results;
        });
        db.get_demanded_qual(req.body.job_id, function (err, results) {
            if (err) {
                console.log("err: " + err)
            }
            req.session.quals = results;
            req.session.jobid = req.body.job_id;
            res.render('exjobMatch', {
                get_exjobs: req.session.exid,
                get_company_user_and_nr: req.session.company,
                qual_list: req.session.qual_list,
                quals: req.session.quals,
                matchning: matchingCompany.companyMatcha(req.body.job_id)
            })
        });
    }
    else
        res.redirect('/')
});

router.post('/change_skill_student', function (req, res) {
    db.insert_studentqual(req.session.pnr, req.body.student_qual, function (err, results) {
        if (err) {
            req.flash('danger', 'The qualification already exists on this user');
            res.redirect('/profile');
        }
        else {
            req.flash('success', 'You have successfully added a qualification');
            res.redirect('/profile');
        }
    })
});

router.post('/update_skill_xjob', function (req, res) {
    db.insert_xjob_qual(req.body.job_id, req.body.xjob_qual, function (err, results) {
        if (err) {
            req.flash('danger', 'The qualification already exists on this user');
            res.redirect('/profile');
        }
        else {
            req.flash('success', 'You have successfully added a qualification');
            res.redirect('/profile');
        }
    })
});

router.post('/add_workexp', function (req, res) {
    db.insert_workexp(req.session.user, req.body.title, req.body.date, req.body.info, function (err, results) {
        if (err) {
            req.flash('danger', 'Ett fel har uppstått');
            res.redirect('/profile')
        }
        else {
            req.flash('success', 'Du har lagt till ett nytt jobb')
            res.redirect('/profile');
        }
    })
});

router.post('/update_workexp', function (req, res) {
    db.update_workexp(req.body.name, req.body.date, req.body.info, req.body.work_id, function (err, results) {
        if (err) {
            req.flash('danger', 'Ett fel har uppstått');
            res.redirect('/profile')
        }
        else {
            req.flash('success', 'Du har ändrat ett arbete');
            res.redirect('/profile');
        }
    })
});

router.post('/delete_workexp', function (req, res) {
    db.delete_workexp(req.body.work_id, function (err, results) {
        if (err) {
            req.flash('danger', 'Ett fel har uppstått');
            res.redirect('/profile')
        }
        else {
            req.flash('success', 'Du har tagit bort ett arbete');
            res.redirect('/profile');
        }
    })
});

router.post('/add_education', function (req, res) {
    db.insert_education(req.session.user, req.body.title, req.body.date, req.body.info, function (err, results) {
        if (err) {
            req.flash('danger', 'Ett fel har uppstått');
            res.redirect('/profile')
        }
        else {
            req.flash('success', 'Du har lagt till en ny utbildning')
            res.redirect('/profile');
        }
    })
});

router.post('/delete_education', function (req, res) {
    db.delete_education(req.body.education_id, function (err, results) {
        if (err) {
            req.flash('danger', 'Ett fel har uppstått');
            res.redirect('/profile')
        }
        else {
            req.flash('success', 'Du har tagit bort en utbildning');
            res.redirect('/profile');
        }
    })
});

router.get('/exjobMatch', function (req, res) {
    if (req.session.user && req.session.role == 'company') {
        
            res.render('exjobMatch', {
                get_exjobs: req.session.exid,
                get_company_user_and_nr: req.session.company,
                qual_list: req.session.qual_list,
                quals: req.session.quals,
                matchning: matchingCompany.companyMatcha(req.session.jobid)
            })
      
    }
    else
        res.redirect('/')
});


router.post('/update_education', function (req, res) {
    db.update_education(req.body.name, req.body.date, req.body.info, req.body.education_id, function (err, results) {
        if (err) {
            req.flash('danger', 'Ett fel har uppstått');
            res.redirect('/profile')
        }
        else {
            req.flash('success', 'You have ändrat en utbildning');
            res.redirect('/profile');
        }
    })
});
router.post('/test', function (req, res) {
    console.log('testest', req.body.hiddenUID);
    if (req.session.user && req.session.role == 'company') {
        db.get_student_user_and_nr(req.body.hiddenUID, function (err, result) {
            if (err) throw err;
            req.session.temp = result
        });
        db.get_student_qualifications(req.body.hiddenUID, function (err, results) {
            if (err) throw err;
            req.session.temp2 = results
        });
        db.get_workexp(req.body.hiddenUID, function (err, results) {
            if (err) throw err;
            req.session.temp3 = results            
        })
        db.get_education(req.body.hiddenUID, function(err, results){
            if (err) throw err;
            res.render('test', {
                student_user_and_nr: req.session.temp,
                get_student_qual: req.session.temp2,
                get_workexp: req.session.temp3,
                get_education: results
            });
        })
    }
    else{
        res.redirect('/');
    }
})
module.exports = router;