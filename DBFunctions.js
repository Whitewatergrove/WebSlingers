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

    getuname: function(username,callback){
        con.query("SELECT * FROM users WHERE ID ='"+username+"' GROUP BY ID;", function(err, results) {
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
        con.query("SELECT password FROM users WHERE ID ='"+username+"' GROUP BY ID;", function(err, results) {
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
        con.query("SELECT Name FROM students WHERE UID = '"+username+"' GROUP BY Name;" , function(err, results) {
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
        con.query("SELECT QID FROM studentqualifications WHERE SID = (SELECT pnr FROM students, studentqualifications, qualifications, catagories WHERE UID = '"+username+"' GROUP BY pnr);", function(err, results){
            if(err){
                console.lof("query error");
            }
            else{
                console.log("query ok");
            }
            callback(null, results);
        })
    },

    getqualcategories: function(username, callback){
        con.query("SELECT class FROM catagories WHERE qualifications IN (SELECT QID FROM studentqualifications WHERE SID = (SELECT pnr FROM students, studentqualifications, qualifications, catagories WHERE UID = '"+username+"' GROUP BY pnr));", function(err, results){
            if(err){
                console.lof("query error");
            }
            else{
                console.log("query ok");
            }
            callback(null, results);
        })
    },

    getcompanyid: function(username, callback){
        con.query("SELECT orgnr FROM companies WHERE UID = '"+username+"';", function(err, results){
            if(err){
                console.lof("query error");
            }
            else{
                console.log("query ok");
            }
            callback(null, results);
        })
    }
};


