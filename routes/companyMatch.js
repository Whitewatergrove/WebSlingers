'use strict';
let express = require('express');
let mysql = require('mysql');
let app = express();
let bodyParser = require('body-parser')
let db = require('../DBFunctions');


let students;
let exjob;
let classes;
let line = '---------------------------------------------';

module.exports = {

    companyPrematching: function(thisExjob)                     // The function that makes all the preworking 
    {                                                           // to match students to the current exjob.

        let current = {};
        let tempqual;
        current.exjob = thisExjob;

        Promise.all([                                           // Creating an array of promises. 
            db.get_xjob_demanded_promise(exthisExjobjob.ID),
            db.get_students_promise(),
            db.get_studentqualifications_promise(),
            db.get_class_catagories_promise(),
            db.get_qualifications_catagories_promise(),
        ]).then((lists) => {                                    // Starts working with the promises when all
                                                                // of them is resolved or rejected.
            current.demanded = lists[0],
            students = lists[1],
            classes = lists[3],
            exjob = current,

            students.forEach(student => {                       // Looping through all exjobs and
                students.QUAL = [];                             // sets their demandingqualifications.
                lists[2].forEach(qual => {
                    if(student.ID === qual.SID)
                    {
                        students.QUAL[students.QUAL.length] = qual.QID;
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
            console.error("Company Prematching Promise Error");
        });
    },

    companyMatcha: function()                                   // The function that is matching exjob to students.
    {
        let temp = {}
        console.log("exjob");
        temp.exjob = exjob;
        temp.students = [];
        console.log(exjob); 
        console.log(exjob.demanded.length);
        students.forEach(student => {
            console.log("student");
            if(exjob.demanded.length > 0)
            {
                exjob.demanded.forEach(demd => {                // Checking if the there is any exjobs that demanding 
                    console.log("Demands");                     // any of the student qualification.
                    console.log(demd);
                    console.log(exjob.demanded)
                    student.QUAL.forEach(qual => {
                        if(temp.students[temp.students.length - 1] != student)
                                temp.students[temp.students.length] = student;
                        console.log("qual");
                        console.log(qual.QID);
                        if(qual.QID === demd)
                            student.weight = student.weight +1;
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
                                student.weight = student.weight + 0.4;
                        }
                    })
                })
            }
            else{ console.error('No qualifications');}
        })
        console.log(line);
        console.log(line);
        console.log(temp);
        console.log(line);
        console.log(line);

        temp.exjobs.sort(function(a, b){
            return b.weight - a.weight;
        });
        temp.exjobs = temp.exjobs.filter(exjob => exjob.weight > 0);
        console.log(temp.exjobs);

        return temp.students;
    }
}