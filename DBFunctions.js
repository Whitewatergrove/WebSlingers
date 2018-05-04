'use strict';
let express = require('express');
let mysql = require('mysql');
let app = express();
let bodyParser = require('body-parser')


var con = mysql.createConnection({
    host: "83.255.197.121",
    user: "joakim",
    password: "jockele",
    port: "3306",
    database: "webslingers"
});

module.exports = {

    //***********************************************************************************/
    //selects

    getlogin: function(username, pass,callback){
        var sql = "SELECT * FROM users full join students WHERE ID = ? AND password = ? AND UID = ? GROUP BY ID;";
        con.query(sql, [username, pass, username], function(err, results) {
            console.log(results);
            if (err){
            console.log('error in query');
            }
            else{
            console.log('query functional');
            }
            callback(null, results);
        })
    },

    get_users: function(username, pass, callback){
        var sql = "SELECT * FROM users";
        con.query(sql, function(err, results) {
            if (err){
            console.log('error in query');
            }
            else{
            console.log('query functional');
            }
            callback(null, results);
        })
    },

    get_students: function(username, pass,callback){
        var sql = "SELECT * FROM students";
        con.query(sql, function(err, results) {
            if (err){
            console.log('error in query');
            }
            else{
            console.log('query functional');
            }
            callback(null, results);
        })
    },

    getuname: function(username, callback){

        var sql = "SELECT * FROM users WHERE ID = ? GROUP BY ID;";
        con.query(sql, username, function(err, results) {
            if (err){
            console.log('error in query');
            }
            else{
            console.log('query functional');
            }
            callback(null, results);
        })
    },

    get_student_user_and_nr: function(username, callback){
        var sql = "select UID, pnr from students where UID = ?;";
        con.query(sql, username, function(err, results) {
            if (err){
            console.log('error in query');
            }
            else{
            console.log('query functional');
            }
            callback(null, results);
        })
    },

    get_company_user_and_nr: function(username, callback){
        var sql = "select Orgnr, UID from companies where UID = ?;";
        con.query(sql, username, function(err, results) {
            if (err){
            console.log('error in query');
            }
            else{
            console.log('query functional');
            }
            callback(null, results);
        })
    },

    getpassword: function(username,callback){
        var sql = "SELECT password FROM users WHERE ID = ? GROUP BY ID;";
        con.query(sql, username, function(err, results) {
            if (err){
            console.log('error in query');
            }
            else{
            console.log('query functional');
            }
            callback(null, results);
        })
    },

    getstudentinfo: function(username, callback){
        var sql = "SELECT Name FROM students WHERE UID = ? GROUP BY Name;";
        con.query( sql, username, function(err, results) {
            if(err){
                console.log("query error" + err);
            }
            else{
                console.log("query ok");
            }
            callback(null, results);
        }) 
    },

    getstudentqual: function(username, callback){
        var sql = "SELECT QID FROM studentqualifications WHERE SID = (SELECT pnr FROM students, studentqualifications, qualifications, catagories WHERE UID = ? GROUP BY pnr);";
        con.query(sql, username, function(err, results){
            if(err){
                console.log("query error");
            }
            else{
                console.log("query ok");
            }
            callback(null, results);
        })
    },

    getqualcategories: function(username, callback){
        var sql = "SELECT class FROM catagories WHERE qualifications IN (SELECT QID FROM studentqualifications WHERE SID = (SELECT pnr FROM students, studentqualifications, qualifications, catagories WHERE UID = ? GROUP BY pnr));";
        con.query(sql, username, function(err, results){
            if(err){
                console.log("query error");
            }
            else{
                console.log("query ok");
            }
            callback(null, results);
        })
    },

    getcompanyid: function(username, callback){
        var sql = "SELECT orgnr FROM companies WHERE UID = ?;"
        con.query(sql, username, function(err, results){
            if(err){
                console.log("query error");
            }
            else{
                console.log("query ok");
            }
            callback(null, results);
        })
    }, 
    
    get_xjob_company: function(username, callback){
        var sql = "SELECT ID,Name FROM exjobs WHERE ExOID = (SELECT orgnr FROM companies WHERE UID = ?);";
        con.query(sql, username, function(err, results){
            if(err){
                console.log("query error");
            }
            else{
                console.log("query ok");
            }
            callback(null, results);
        })
    }, 

    getxjobs: function(username, callback){
        var sql = "SELECT QID FROM demanded WHERE EID = (SELECT ID FROM exjobs WHERE ExOID = (SELECT orgnr FROM companies WHERE UID = ?));"
        con.query(sql, username, function(err, results){
            if(err){
                console.log("query error");
            }
            else{
                console.log("query ok");
            }
            callback(null, results);
        })
    },

    get_users: function(req, res, callback) {   
        con.query('SELECT * FROM users', function(err, results) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, results);
            }
        })
    },

/*************************************************************************************************************************************
    PROMISE             */

    get_students_promise: function(student){
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM students";
            con.query(sql, function(err, results) {
                if (err){
                    console.log('get_students_promise error in query');
                    let msg = "Promise error";
                    reject(new Error(msg));
                }
                else{
                    console.log('get_students_promise query functional');
                    student = results;
                    resolve(student);
                }
            })

        })
        
    },

    get_student_qual_promise: function(username){
        return new Promise((resolve, reject) => {
            var sql = "SELECT QID FROM studentqualifications WHERE SID = (SELECT pnr FROM students, studentqualifications, qualifications, catagories WHERE UID = ? GROUP BY pnr);";
            con.query(sql, username, function(err, results){
                if(err){
                    console.log("get_student_qual_promise query error");
                    con.onerror = function(){
                        let msg = "Promise error";
                        reject(new Error(msg));
                    }  
                }
                else{
                    console.log("get_student_qual_promise query functional");
                    resolve(results);
                }
            })
        })
    },
    get_qual_categories_promise: function(username){
        return new Promise((resolve, reject) => {
            var sql = "SELECT class FROM catagories WHERE qualifications IN (SELECT QID FROM studentqualifications WHERE SID = (SELECT pnr FROM students, studentqualifications, qualifications, catagories WHERE UID = ? GROUP BY pnr)) GROUP BY class;";
            con.query(sql, username, function(err, results){
                if(err){
                    console.log("get_qual_categories_promise query error");
                    let msg = "Promise error";
                    reject(new Error(msg));
                }
                else{
                    console.log("get_qual_categories_promise query ok");
                    resolve(results);
                }
            })
        })
    },


    //********************************************************************************/
    //inserts
    insert_user: function(username, password, role){
        var sql = "INSERT INTO users (ID, Password, Role) VALUES (?, ? ,?);";
        con.query(sql, [username, password, role], function(err, res){
            if(err){
                console.log("insert user query not working: "+err);
            }
            else{
                console.log("insert user query ok");
            }
        })
    },
    insert_student: function(uname, pnr){
        var sql = "INSERT INTO students (pnr, UID, Name, Gender, Adress, Tel, Status) VALUES (?, ?, 'Name', 'Gender', 'Address', 'Phonenumber', '0');";
        con.query(sql, [pnr, uname], function(err, res){
            if(err){
                console.log("insert student query not working: " + err);
            }
            else{
                console.log("insert student query ok");
            }
        })
    },
    insert_company: function(uname, orgnr){
        var sql = "INSERT INTO companies (Orgnr, UID, Name, Adress, Tel) VALUES (?, ?, 'Name', 'Address', 'Phonenumber');";
        con.query(sql, [orgnr, uname], function(err, res){
            if(err){
                console.log("insert company query error");
            }
            else{
                console.log("insert company query ok");
            }
        })
    },
    //**************************************************************************************************/
    //updates
    update_studentprofile: function(pnr, uname, name, gender, adress, tel){
        var sql = "UPDATE students SET pnr = ?, UID = ?, Name = ?, Gender = ?, Adress = ?, Tel = ? WHERE pnr = ?;";
        con.query(sql, [pnr, uname, name, gender, adress, tel, pnr], function(err, res){
            if(err){
                console.log("update student query error "+ err);
            }
            else{
                console.log("update student query ok");
            }
        })
    },

    update_user: function(username, password){
        var sql = "UPDATE users SET ID = ?, Password = ? WHERE ID = ?;";
        con.query(sql, [username, password, username], function(err, res){
            if(err){
                console.log("update user query error"+ err);
            }
            else{
                console.log("update user query ok");
            }
        })
    }
};