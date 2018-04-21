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

    getuname: function(callback){
        con.connect(function (err) {    
            if (err) {
                console.log('error while connectiong to database' + err);
            }
            console.log("Connected!");
        
            con.query('SELECT * FROM users', function(err, results) {
                if (err){
                console.log('error in query');
                }
                else{
                console.log('query functional');
                }
                callback(null, results);
            })
        })
    }
};


