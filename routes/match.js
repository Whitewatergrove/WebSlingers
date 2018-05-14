'use strict';
let express = require('express');
let mysql = require('mysql');
let app = express();
let bodyParser = require('body-parser')
let db = require('../DBFunctions');


let students;
let exjobs;
let classes;
let line = '---------------------------------------------';
let matched = [];

function logga(x)
{
    console.log(x);
}
function loggaerror()
{
    console.log("error");
}

module.exports = {

    prematching: function(student)
    {

        let current = {};
        let tempqual;
        current.student = student;

        Promise.all([
            db.get_xjob_promise(exjobs),                            // Fetching all exjobs
            db.get_class_catagories_promise(classes),               // Fetching all classes
            db.get_student_qual_promise(current.student),           
        ]).then((lists) => {
            
            exjobs = lists[0],
            classes = lists[1],

            current.QUAL = lists[2],
            students = current,

            logga(current),
            logga(line),

            exjobs.forEach(exjob => {
                exjob.demanded = db.get_xjob_demanded_promise(exjob.ID);    // <------ något fel med den här!!!
            }),
            
            logga(exjobs),
            logga(line),

            /*classes.forEach(klass => {
                klass.qualification = db.get_qualifications_catagories_promise(klass.class);
            }),*/

            //logga(classes),
            logga(line),
            logga(lists[2]),
            logga(line);
        }).catch((error) => {
            // handle error here,
            console.error("HÄR");
        });
    },

    matcha: function()
    {
        let temp = {}
        console.log("student");
        temp.student = students;
        logga(students); 
        logga(students.QUAL.length);
        exjobs.forEach(exjob => {
            let check = 0;
            console.log("exjob");
            if(students.QUAL.length > 0)
            {
                students.QUAL.forEach(qual => { 
                    console.log("QUAL");
                    console.log(exjob)
                    exjob.demanded.forEach(demd => {
                        console.log("demd");
                        if(qual === demd)
                        {
                            temp.ex[temp.ex.length].exjob = exjob;
                        }
                    })
                })
            }
            else{ console.error('No qualifications');}
        })
        logga(line);
        logga(line);
        logga(temp);
        logga(line);
        logga(line);
    }
}