'use strict';
let express = require('express');
let mysql = require('mysql');
let app = express();
let bodyParser = require('body-parser')
let db = require('./DBFunctions');


db.get_students(function(err, result){
    if(err) throw err;
    else{
        
    }
})