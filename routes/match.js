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

module.exports = {

    prematching: function(thisStudent)                     // The function that makes all the preworking 
    {                                                      // to match exjobs to the current student.

        let current = {};
        current.student = thisStudent;

        Promise.all([                                       // Creating an array of promises. 
            db.get_xjob_promise(exjobs),                                // Fetching all exjobs.
            db.get_class_catagories_promise(classes),                   // Fetching all classes.
            db.get_student_qual_promise(current.student),               // Fetching the qualificatons of the student.
            db.get_demanded_promise(),                                  // Fetching all demanded qualifications for all exjob.
        ]).then((lists) => {                                // Starts working with the promises when all
                                                            // of them is resolved or rejected.
            exjobs = lists[0],
            classes = lists[1],

            current.QUAL = lists[2],
            students = current,

            exjobs.forEach(exjob => {                                   // Looping through all exjobs and
                exjob.demanded = [];                                    // sets their demandingqualifications.
                lists[3].forEach(demand => {
                    if(exjob.ID === demand.EID)
                    {
                        exjob.demanded[exjob.demanded.length] = demand.QID;
                    }
                })
            }),

            /*classes.forEach(klass => {
                klass.qualification = db.get_qualifications_catagories_promise(klass.class);
            }),*/

            //console.log(classes),
            console.log(line);
        }).catch((error) => {
            // handle error here,
            console.error("Student Prematching Promise Error");
        });
    },

    matcha: function()                                      // The function that is matching student to exjobs.
    {
        let temp = {}
        temp.student = students;
        temp.exjobs = [];
        exjobs.forEach(exjob => {                           // Checking if the there is any exjobs that demanding 
            if(students.QUAL.length > 0)                    // any of the student qualification.
            {
                exjob.weight = 0;
                students.QUAL.forEach(qual => { 
                    exjob.demanded.forEach(demd => {
                        if(qual.QID === demd)
                        {
                            exjob.weight = exjob.weight +1;
                            if(temp.exjobs[temp.exjobs.length - 1] != exjob)
                            {
                                temp.exjobs[temp.exjobs.length] = exjob;
                            }
                        }
                        else
                        {
                            let tempSQ = 'tempSQ';
                            let tempED = 'tempED';
                            classes.forEach(element => {
                                if(element.qual === demd)
                                    tempED = element.class;
                                if(element.qual === qual.QID)
                                    tempSQ = element.class;
                                //console.log(element.class)
                            })
                            if(tempED === tempSQ)
                            {
                                console.log('Student')
                                console.log(tempSQ);
                                console.log('Exjob')
                                console.log(tempED);
                                exjob.weight = exjob.weight + 0.4;
                            }
                        }
                    })
                })
            }
            else{ console.error('No qualifications');}
        })
        console.log(temp);

        return temp.exjobs;            // kanske avändbar
    }
}