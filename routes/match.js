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
            db.get_class_catagories_promise(),                          // Fetching all classes.
            db.get_student_qual_promise(current.student),               // Fetching the qualificatons of the student.
            db.get_demanded_promise(),                                  // Fetching all demanded qualifications for all exjob.
            db.get_qualifications_catagories_promise(),
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

            classes.forEach(klass => {
                klass.qual = [];
                lists[4].forEach(qual => {
                    if(klass.class === qual.class)
                    {
                        klass.qual[klass.qual.length] = qual.qualifications;
                    }
                })
            }),

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
                        if(temp.exjobs[temp.exjobs.length - 1] != exjob)
                                temp.exjobs[temp.exjobs.length] = exjob;

                        if(qual.QID === demd)
                            exjob.weight = exjob.weight +1;
                        else
                        {
                            let tempSQ = 'tempSQ';
                            let tempED = 'tempED';
                            classes.forEach(obj => {
                                obj.qual.forEach(element =>{
                                    if(element === demd)
                                    tempED = obj.class;
                                    if(element === qual.QID)
                                    tempSQ = obj.class;
                                })
                            })
                            if(tempED === tempSQ)
                                exjob.weight = exjob.weight + 0.4;
                        }
                    })
                })
            }
            else
                console.error('No qualifications');
        })

        temp.exjobs.sort(function(a, b){
                return b.weight - a.weight;
        });
        temp.exjobs = temp.exjobs.filter(exjob => exjob.weight > 0);
        console.log(temp.exjobs);

        return temp.exjobs;
    }
}