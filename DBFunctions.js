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
        var sql = "SELECT * FROM users WHERE ID = ? AND password = ? GROUP BY ID;";
        con.query(sql, [username, pass], function(err, results) {
            if (err){
            console.log('error in query');
            }
            else{
            console.log('query functional');
            }
            callback(null, results);
        })
    },

    get_users: function(username, pass,callback){
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

    getuname: function(username,callback){
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
    
    getxjobs: function(username, callback){
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
        var sql = "SELECT QID FROM demanded WHERE EID = (SELECT ID FROM exjobs WHERE ExOID = (SELECT orgnr FROM companies WHERE UID = ?));;"
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
    insert_student: function(pnr, uname, name, gender, adress, tel, status){
        var sql = "INSERT INTO students (pnr, UID, Name, Gender, Adress, Tel) VALUES (?, ?, ?, ?, ?, ?);";
        con.query(sql, [pnr, uname, gender, adress, tel, status], function(err, res){
            if(err){
                console.log("insert student query not working: " + err);
            }
            else{
                console.log("insert student query ok");
            }
        })
    },
    insert_company: function(orgnr, name, adress, mail, tel){
        var sql = "INSERT INTO companies (Orgnr, Name, Adress, Email, Tel) VALUES (?, ?, ?, ?, ?);";
        con.query(sql, [orgnr, name, adress, mail, tel], function(err, res){
            if(err){
                console.log("query error");
            }
            else{
                console.log("query ok");
            }
        })
    },
};


