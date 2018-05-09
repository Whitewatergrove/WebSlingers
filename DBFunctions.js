'use strict';
let express = require('express');
let mysql = require('mysql');
let app = express();
let bodyParser = require('body-parser')


var con = mysql.createConnection({
    host: "83.255.197.121",
    user: "joakim",
    password: "joakim97",
    port: "3306",
    database: "webslingers"
});

module.exports = {

    //***********************************************************************************/
    //selects

    getlogin: function (username, pass, callback) {
        var sql = "SELECT * FROM users WHERE ID = ? AND password = ? GROUP BY ID;";
        con.query(sql, [username, pass], function (err, results) {
            console.log(results);
            if (err) {
                console.log('error in query');
            }
            else {
                console.log('query functional');
            }
            callback(null, results);
        })
    },

    get_users: function (username, pass, callback) {
        var sql = "SELECT * FROM users";
        con.query(sql, function (err, results) {
            if (err) {
                console.log('error in query');
            }
            else {
                console.log('query functional');
            }
            callback(null, results);
        })
    },

    get_students: function (username, pass, callback) {
        var sql = "SELECT * FROM students";
        con.query(sql, function (err, results) {
            if (err) {
                console.log('error in query');
            }
            else {
                console.log('query functional');
            }
            callback(null, results);
        })
    },

    getuname: function (username, callback) {

        var sql = "SELECT * FROM users WHERE ID = ? GROUP BY ID;";
        con.query(sql, username, function (err, results) {
            if (err) {
                console.log('error in query');
            }
            else {
                console.log('query functional');
            }
            callback(null, results);
        })
    },

    get_student_user_and_nr: function (username, callback) {
        var sql = "select UID, pnr from students where UID = ?;";
        con.query(sql, username, function (err, results) {
            if (err) {
                console.log('error in query');
            }
            else {
                console.log('query functional');
            }
            callback(null, results);
        })
    },

    get_company_user_and_nr: function (username, callback) {
        var sql = "select Orgnr, UID from companies where UID = ?;";
        con.query(sql, username, function (err, results) {
            if (err) {
                console.log('error in query');
            }
            else {
                console.log('query functional');
            }
            callback(null, results);
        })
    },

    getpassword: function (username, callback) {
        var sql = "SELECT password FROM users WHERE ID = ? GROUP BY ID;";
        con.query(sql, username, function (err, results) {
            if (err) {
                console.log('error in query');
            }
            else {
                console.log('query functional');
            }
            callback(null, results);
        })
    },

    getstudentinfo: function (username, callback) {
        var sql = "SELECT Name FROM students WHERE UID = ? GROUP BY Name;";
        con.query(sql, username, function (err, results) {
            if (err) {
                console.log("query error" + err);
            }
            else {
                console.log("query ok");
            }
            callback(null, results);
        })
    },

    getstudentqual: function (username, callback) {
        var sql = "SELECT QID FROM studentqualifications WHERE SID = (SELECT pnr FROM students, studentqualifications, qualifications, catagories WHERE UID = ? GROUP BY pnr);";
        con.query(sql, username, function (err, results) {
            if (err) {
                console.log("query error");
            }
            else {
                console.log("query ok");
            }
            callback(null, results);
        })
    },

    getqualcategories: function (username, callback) {
        var sql = "SELECT class FROM catagories WHERE qualifications IN (SELECT QID FROM studentqualifications WHERE SID = (SELECT pnr FROM students, studentqualifications, qualifications, catagories WHERE UID = ? GROUP BY pnr));";
        con.query(sql, username, function (err, results) {
            if (err) {
                console.log("query error");
            }
            else {
                console.log("query ok");
            }
            callback(null, results);
        })
    },

    getcompanyid: function (username, callback) {
        var sql = "SELECT orgnr FROM companies WHERE UID = ?;"
        con.query(sql, username, function (err, results) {
            if (err) {
                console.log("query error");
            }
            else {
                console.log("query ok");
            }
            callback(null, results);
        })
    },

    get_xjob_company: function (username, callback) {
        var sql = "SELECT ID,Name FROM exjobs WHERE ExOID = (SELECT orgnr FROM companies WHERE UID = ?);";
        con.query(sql, username, function (err, results) {
            if (err) {
                console.log("query error");
            }
            else {
                console.log("query ok");
            }
            callback(null, results);
        })
    },

    getxjobs: function (username, callback) {
        var sql = "SELECT QID FROM demanded WHERE EID = (SELECT ID FROM exjobs WHERE ExOID = (SELECT orgnr FROM companies WHERE UID = ?));"
        con.query(sql, username, function (err, results) {
            if (err) {
                console.log("query error");
            }
            else {
                console.log("query ok");
            }
            callback(null, results);
        })
    },

    get_users: function (req, res, callback) {
        con.query('SELECT * FROM users', function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        })

    },
    get_messages: function (req, res, callback) {
        con.query('SELECT * FROM messages', function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        })

    },

    /*************************************************************************************************************************************
        PROMISE             */


    get_qualifications_catagories_promise: function (catagoriesqual) {
        return new promise((resolve, reject) => {
            let sql = "SELECT qualifications FROM catagories where class = ?; "
            con.query(sql, demanded, function (err, results) {
                if (err) {
                    err.log('get_exjobs_promise error in query');
                    let msg = "Promise error";
                    reject(new Error(msg));
                }
                else {
                    console.log('get_exjobs_promise query functional');
                    catagoriesqual = result;
                    resolve(catagoriesqual);
                }
            })
        })
    },

    get_class_catagories_promise: function (catagoriesclass) {
        return new promise((resolve, reject) => {
            let sql = "SELECT class FROM catagories GROUP BY class;"
            con.query(sql, demanded, function (err, results) {
                if (err) {
                    err.log('get_exjobs_promise error in query');
                    let msg = "Promise error";
                    reject(new Error(msg));
                }
                else {
                    console.log('get_exjobs_promise query functional');

                    resolve(catagoriesclass);
                }
            })
        })
    },
    get_xjob_demanded_promise: function (demanded) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT QID FROM demanded WHERE EID = ?;"
            con.query(sql, demanded, function (err, results) {
                if (err) {
                    err.log('get_exjobs_promise error in query');
                    let msg = "Promise error";
                    reject(new Error(msg));
                }
                else {
                    console.log('get_exjobs_promise query functional');

                    resolve(demanded);
                }
            })
        })
    },

    get_xjob_promise: function (exjobs) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT ID, 'Name', ExOID FROM exjobs;"
            con.query(sql, function (err, results) {
                if (err) {
                    err.log('get_exjobs_promise error in query');
                    let msg = "Promise error";
                    reject(new Error(msg));
                }
                else {
                    console.log('get_exjobs_promise query functional');
                    exjobs = result;
                    resolve(exjobs);
                }
            })
        })
    },


    get_students_promise: function (student) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM students";
            con.query(sql, function (err, results) {
                if (err) {
                    console.log('get_students_promise error in query');
                    let msg = "Promise error";
                    reject(new Error(msg));
                }
                else {
                    console.log('get_students_promise query functional');
                    student = results;
                    resolve(student);
                }
            })

        })

    },

    get_student_qual_promise: function (username) {
        return new Promise((resolve, reject) => {
            var sql = "SELECT QID FROM studentqualifications WHERE SID = (SELECT pnr FROM students, studentqualifications, qualifications, catagories WHERE UID = ? GROUP BY pnr);";
            con.query(sql, username, function (err, results) {
                if (err) {
                    console.log("get_student_qual_promise query error");
                    con.onerror = function () {
                        let msg = "Promise error";
                        reject(new Error(msg));
                    }
                }
                else {
                    console.log("get_student_qual_promise query functional");
                    resolve(results);
                }
            })
        })
    },
    get_qual_categories_promise: function (username) {
        return new Promise((resolve, reject) => {
            var sql = "SELECT class FROM catagories WHERE qualifications IN (SELECT QID FROM studentqualifications WHERE SID = (SELECT pnr FROM students, studentqualifications, qualifications, catagories WHERE UID = ? GROUP BY pnr)) GROUP BY class;";
            con.query(sql, username, function (err, results) {
                if (err) {
                    console.log("get_qual_categories_promise query error");
                    let msg = "Promise error";
                    reject(new Error(msg));
                }
                else {
                    console.log("get_qual_categories_promise query ok");
                    resolve(results);
                }
            })
        })
    },


    //********************************************************************************/
    //inserts

    insert_categories: function(qualifications, klass, callback){
        var sql " INSERT INTO catagories (qualifications, class) VALUES (?, ?);";
        con.query(sql, [qualifications, klass], function (err,res){
            callback(err,res);      
            if (err) {
                console.log("insert user query not working: " + err);
            } else {
                console.log("insert user query ok");
            }
        })
    },


    insert_exjobs: function (ExOID, Name, Info,callback) {
        var sql = "INSERT INTO exjobs (ExOID, Name, Info) VALUES (?, ?, ,?);";
        con.query(sql, [ExOID, Name, Info], function (err, res) {
           callback(err,res);
            if (err) {
                console.log("insert user query not working: " + err);
            } else {
                console.log("insert user query ok");
            }
        })
    },


    insert_user: function (username, password, role, callback) {
        var sql = "INSERT INTO users (ID, Password, Role) VALUES (?, ? ,?);";
        con.query(sql, [username, password, role], function (err, res) {
            callback(err, res);
            if (err) {
                console.log("insert user query not working: " + err);
            }
            else {
                console.log("insert user query ok");
            }
        })
    },
    insert_student: function (uname, pnr, callback) {
        var sql = "INSERT INTO students (pnr, UID, Name, Gender, Adress, Tel, Status) VALUES (?, ?, 'Name', 'Gender', 'Address', 'Phonenumber', '0');";
        con.query(sql, [pnr, uname], function (err, res) {
            callback(err, res);
            if (err) {
                console.log("insert student query not working: " + err);
            }
            else {
                console.log("insert student query ok");
            }
        })
    },
    insert_company: function (uname, orgnr, callback) {
        var sql = "INSERT INTO companies (Orgnr, UID, Name, Adress, Tel) VALUES (?, ?, 'Name', 'Address', 'Phonenumber');";
        con.query(sql, [orgnr, uname], function (err, res) {
            callback(err, res);
            if (err) {
                console.log("insert company query error");
            }
            else {
                console.log("insert company query ok");
            }
        })
    },
    //**************************************************************************************************/
    //updates
    update_studentprofile: function (pnr, uname, name, gender, adress, tel, callback) {
        var sql = "UPDATE students SET UID = ?, Name = ?, Gender = ?, Adress = ?, Tel = ? WHERE pnr = ?;";
        con.query(sql, [uname, name, gender, adress, tel, pnr], function (err, res) {
            callback(err, res);
            if (err) {
                console.log("update student query error " + err);
            }
            else {
                console.log("update student query ok");
            }
        })
    },

    update_user: function (username, password, callback) {
        var sql = "UPDATE users SET Password = ? WHERE ID = ?;";
        con.query(sql, [password, username], function (err, res) {
            callback(err, res);
            if (err) {
                console.log("update user query error" + err);
            }
            else {
                console.log("update user query ok");
            }
        })
    },

    update_companyprofile: function (orgnr, uname, name, adress, tel, callback) {
        var sql = "UPDATE companies SET Name = ?, Adress = ?, Tel = ? WHERE Orgnr = ?;";
        con.query(sql, [name, adress, tel, orgnr], function (err, res) {
            callback(err, res);
            if (err) {
                console.log("update company query error " + err);
            }
            else {
                console.log("update company query ok");
            }
        })
    },
    update_company: function (username, password, callback) {
        var sql = "UPDATE users SET Password = ? WHERE ID = ?;";
        con.query(sql, [password, username], function (err, res) {
            callback(err, res);
            if (err) {
                console.log("update user query error" + err);
            }
            else {
                console.log("update user query ok");
            }
        })
    },


    //**************************************************************************************************/
    //Deletes
    delete_exjob: function (orgnr, callback) {
        var sql = "DELETE FROM exjobs WHERE ID = (Select * from (select ID FROM exjobs  WHERE ExOID =  (SELECT orgnr FROM companies WHERE UID = ? ) ) as alias1);";
        con.query(sql, [orgnr], function (err, res) {
            if (err) {
                console.log("delete user query error" + err);
            } else {
                console.log("delete user query ok");
            }
        })
    },

    delete_user: function(ID,callback){
        var sql = "DELETE FROM users WHERE ID  = ?; ";
        con.query(sql,[ID], function (err,res){
            if (err) {
                console.log("delete user query error" + err);
            } else {
                console.log("delete user query ok");
            } 
        })
    },






};
