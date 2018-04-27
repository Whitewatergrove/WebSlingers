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
                console.lof("query error");
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
                console.lof("query error");
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
                console.lof("query error");
            }
            else{
                console.log("query ok");
            }
            callback(null, results);
        })
    }, 
    
    getxjobs: function(username, callback){
        var sql = "SELECT orgnr FROM companies WHERE UID = ?;";
        con.query(sql, username, function(err, results){
            if(err){
                console.lof("query error");
            }
            else{
                console.log("query ok");
            }
            callback(null, results);
        })
    }, 
};


