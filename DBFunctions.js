'use strict';
let express = require('express');
let mysql = require('mysql');
let app = express();
let bodyParser = require('body-parser')

document.onreadystatechange = () => {

    if(readystate === "complete")
    {
        var con = mysql.createConnection({
            host: "83.255.197.121",
            user: "joakim",
            password: "jockele",
            port: "3306",
            database: "webslingers"
        });

        function getuname(){
            con.connect(function (err) {
                if (err) {
                    console.log('error while connectiong to database' + err);
                }
            console.log("Connected!");

            con.query('SELECT * FROM users', function(err, results) {
                if (err) throw err
                let temp = '';
                for(var i in results) {
                    temp += ('<tr><td>' + results[i].ID + '</td><td>' + results[i].Password + '</td><td>' + results[i].Role + '</td></tr>');
                }
                return results;
                })
            })
        };
    };
};